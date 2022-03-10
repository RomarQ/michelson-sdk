import type { IRecordVariant } from './type';
import type { MichelsonJSON, MichelsonMicheline, PairsOfKeys, PrimValue, IValue } from './typings';
import {
    TOr,
    //
    buildRecordVariantType,
} from './type';
import { Prim } from './enums/prim';
import Utils, { composeRightCombLayout, curlyBrackets, parenthesis } from './misc/utils';
import Converter from './converter';

export class Michelson_Literal implements IValue {
    private prim: PrimValue;
    private value: number | string | boolean | Prim;

    constructor(prim: PrimValue, value?: number | string | boolean) {
        this.prim = prim;
        switch (prim) {
            case Prim.Unit:
            case Prim.None:
            case Prim.False:
            case Prim.True:
                this.value = prim;
                break;
            default:
                if (typeof value === 'undefined') {
                    throw new Error('Expected a value!');
                }
                this.value = value;
        }
    }

    toMicheline(): MichelsonMicheline {
        switch (this.prim) {
            case Prim.None:
            case Prim.False:
            case Prim.True:
            case Prim.Unit:
            case Prim.int:
            case Prim.bytes:
                return `${this.value}`;
            case Prim.string:
                return `"${this.value}"`;
        }

        throw new Error(`Cannot produce michelson for literal of type: ${this.prim}`);
    }

    toJSON(): MichelsonJSON {
        switch (this.prim) {
            case Prim.None:
            case Prim.Unit:
            case Prim.False:
            case Prim.True:
                return {
                    prim: this.value as Prim,
                };
            case Prim.int:
                return {
                    [Prim.int]: `${this.value}`,
                };
            case Prim.string:
                return {
                    [Prim.string]: this.value as string,
                };
            case Prim.bytes:
                return {
                    // Same behaviour as in "tezos-client"
                    [Prim.bytes]: Utils.compressHexString(`${this.value}`),
                };
        }

        throw new Error(`Cannot produce michelson JSON for literal of type: ${this.prim}`);
    }
}

export class Michelson_Literal_C1 implements IValue {
    #prim: PrimValue;
    #elements: IValue[];

    constructor(prim: PrimValue, elements: IValue[]) {
        this.#prim = prim;
        this.#elements = elements;
    }

    toMicheline(wrap = true): MichelsonMicheline {
        switch (this.#prim) {
            case Prim.Some:
            case Prim.Pair:
            case Prim.Left:
            case Prim.Right:
                const prim = `${this.#prim} ${this.#elements.map((v) => v.toMicheline()).join(' ')}`;
                return wrap ? parenthesis(prim) : prim;
            case Prim.list:
                return curlyBrackets(this.#elements.map((v) => v.toMicheline(false)).join(' ; '));
        }

        throw new Error(`Cannot produce michelson for literal of type: ${this.#prim}`);
    }

    toJSON(): MichelsonJSON {
        switch (this.#prim) {
            case Prim.Some:
            case Prim.Pair:
            case Prim.Left:
            case Prim.Right:
                return {
                    prim: this.#prim,
                    args: this.#elements.map((v) => v.toJSON()),
                };
            case Prim.list:
                return this.#elements.map((v) => v.toJSON());
        }

        throw new Error(`Cannot produce michelson JSON for literal of type: ${this.#prim}`);
    }
}

export class Michelson_Map implements IValue {
    #elements: IValue[][];

    constructor(elements: IValue[][]) {
        this.#elements = elements;
    }

    private buildMichelineElt = (key: IValue, value: IValue) => {
        return `${Prim.Elt} ${key.toMicheline()} ${value.toMicheline()}`;
    };

    toMicheline(): MichelsonMicheline {
        return curlyBrackets(this.#elements.map(([key, value]) => this.buildMichelineElt(key, value)).join(' ; '));
    }

    toJSON(): MichelsonJSON {
        return this.#elements.map(([key, value]) => ({
            prim: Prim.Elt,
            args: [key.toJSON(), value.toJSON()],
        }));
    }
}

/**
 * @description Build record literal
 * @param fields record dictionary
 * @param layout record layout
 * @returns {Michelson_LiteralUnion}
 */
const buildRecord = (fields: Record<string, IValue>, layout?: PairsOfKeys<string>): IValue => {
    const buildBranch = (branch: string | PairsOfKeys<string>): IValue => {
        if (typeof branch === 'string') {
            return fields[branch];
        }
        const [left, right] = branch;
        return Pair(buildBranch(left), buildBranch(right));
    };
    return buildBranch(layout || composeRightCombLayout(Object.keys(fields)));
};

/**
 * @description Build variant literal
 * @param branch branch name
 * @param value branch value
 * @param type variant type
 * @returns {Michelson_LiteralUnion}
 */
const buildVariant = (target: string, value: IValue, type: IRecordVariant): IValue => {
    const [left, right] = type.layout;
    if (left === target) {
        return Left(value);
    }
    if (right === target) {
        return Right(value);
    }
    if (Array.isArray(left) && left.flat().includes(target)) {
        return Left(buildVariant(target, value, buildRecordVariantType(type.fields, left, TOr)));
    }
    if (Array.isArray(right) && right.flat().includes(target)) {
        return Right(buildVariant(target, value, buildRecordVariantType(type.fields, right, TOr)));
    }

    throw new Error(`Variant (${target}) is invalid.`);
};

const buildLambda = (michelson: MichelsonMicheline | MichelsonJSON): IValue => {
    if (typeof michelson === 'string') {
        return {
            toMicheline: () => michelson,
            toJSON: () => {
                throw new Error('Convertion from Micheline to JSON is not implemented.');
            },
        };
    }
    return {
        toMicheline: () => Converter.michelineOfJSON(michelson),
        toJSON: () => michelson,
    };
};

// Singletons
export const Nat = (value: number) => new Michelson_Literal(Prim.int, value);
export const Int = (value: number) => new Michelson_Literal(Prim.int, value);
export const Mutez = (value: number) => new Michelson_Literal(Prim.int, value);
export const Timestamp = (value: number | string) =>
    new Michelson_Literal(typeof value === 'string' ? Prim.string : Prim.int, value);
export const String = (value: string) => new Michelson_Literal(Prim.string, value);
export const Address = (address: string) => new Michelson_Literal(Prim.string, address);
export const Contract = (address: string, entry_point: string) =>
    new Michelson_Literal(Prim.string, `${address}%${entry_point}`);
export const Bytes = (value: string) => new Michelson_Literal(Prim.bytes, value);
export const Chain_id = (value: string) => {
    return new Michelson_Literal(`${value}`.slice(0, 2) === '0x' ? Prim.bytes : Prim.string, value);
};
export const Bls12_381_fr = (value: string | number) =>
    new Michelson_Literal(typeof value === 'string' ? Prim.bytes : Prim.int, value);
export const Bls12_381_g1 = (value: string) => new Michelson_Literal(Prim.bytes, value);
export const Bls12_381_g2 = (value: string) => new Michelson_Literal(Prim.bytes, value);
export const Key = (key: string) => new Michelson_Literal(Prim.string, key);
export const Key_hash = (key_hash: string) => new Michelson_Literal(Prim.string, key_hash);
export const Signature = (signature: string) => new Michelson_Literal(Prim.string, signature);
export const Bool = (bool: boolean) => new Michelson_Literal(bool ? Prim.True : Prim.False);
export const Unit = () => new Michelson_Literal(Prim.Unit);
// Containers
export const List = (elements: IValue[]) => new Michelson_Literal_C1(Prim.list, elements);
export const Set = List;
export const None = () => new Michelson_Literal(Prim.None);
export const Some = (element: IValue) => new Michelson_Literal_C1(Prim.Some, [element]);
export const Pair = (left: IValue, right: IValue) => new Michelson_Literal_C1(Prim.Pair, [left, right]);
export const Map = (elements: IValue[][] = []) => new Michelson_Map(elements);
export const Big_map = Map;
export const Lambda = (code: MichelsonMicheline | MichelsonJSON) => buildLambda(code);
export const Left = (value: IValue) => new Michelson_Literal_C1(Prim.Left, [value]);
export const Right = (value: IValue) => new Michelson_Literal_C1(Prim.Right, [value]);
// Artificial containers
export const Record = (fields: Record<string, IValue>, layout?: PairsOfKeys<string>) => buildRecord(fields, layout);
export const Variant = (branch: string, value: IValue, type: IRecordVariant) => buildVariant(branch, value, type);

const Literals = {
    // Singletons
    Unit,
    Nat,
    Int,
    Mutez,
    String,
    Bool,
    Address,
    Contract,
    Timestamp,
    Chain_id,
    Bytes,
    Bls12_381_fr,
    Bls12_381_g1,
    Bls12_381_g2,
    Key,
    Key_hash,
    Signature,
    // Containers
    List,
    Set,
    None,
    Some,
    Pair,
    Map,
    Big_map,
    Lambda,
    // Artificial containers
    Record,
    Variant,
};

export default Literals;
