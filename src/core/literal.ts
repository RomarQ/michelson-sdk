import type { Michelson_Type, IRecordVariant } from './type';
import type { MichelsonJSON, MichelsonMicheline, PairsOfKeys, IType, PrimValue } from '../typings';
import {
    TBig_map,
    TBls12_381_fr,
    TBls12_381_g1,
    TBls12_381_g2,
    TKey,
    TKey_hash,
    TOption,
    TSet,
    TSignature,
    TAddress,
    TBool,
    TBytes,
    TChain_id,
    TInt,
    TList,
    TMutez,
    TNat,
    TString,
    TTimestamp,
    TUnit,
    TPair,
    TMap,
    TOr,
    //
    buildRecordVariantType,
} from './type';
import { Prim } from './enums/prim';
import Utils, { composeRightCombLayout } from '../misc/utils';

export type Michelson_LiteralUnion = Michelson_Literal | Michelson_Literal_C1 | Michelson_Map;

export class Michelson_Literal {
    private prim: PrimValue;
    private value: number | string | boolean;
    type: IType;

    constructor(prim: PrimValue, type: IType, value?: number | string | boolean) {
        this.prim = prim;
        this.type = type;
        switch (prim) {
            case Prim.Unit:
            case Prim.None:
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
            case Prim.Unit:
            case Prim.int:
            case Prim.bytes:
                return `${this.value}`;
            case Prim.string:
                return `"${this.value}"`;
            case Prim.bool:
                return Utils.capitalizeBoolean(this.value as boolean);
        }

        throw new Error(`Cannot produce michelson for literal of type: ${this.prim}`);
    }

    toJSON(): Record<string, unknown> {
        switch (this.prim) {
            case Prim.None:
            case Prim.Unit:
                return {
                    prim: this.value,
                };
            case Prim.int:
                return {
                    [Prim.int]: `${this.value}`,
                };
            case Prim.string:
                return {
                    [Prim.string]: this.value,
                };
            case Prim.bytes:
                return {
                    // Same behaviour as in "tezos-client"
                    [Prim.bytes]: Utils.compressHexString(`${this.value}`),
                };
            case Prim.bool:
                return {
                    prim: Utils.capitalizeBoolean(this.value as boolean),
                };
        }

        throw new Error(`Cannot produce michelson JSON for literal of type: ${this.prim}`);
    }
}

export class Michelson_Literal_C1 {
    #prim: Prim;
    #elements: Michelson_LiteralUnion[];
    type: IType;

    constructor(prim: PrimValue, type: IType, elements: Michelson_LiteralUnion[]) {
        this.#prim = prim;
        this.type = type;
        this.#elements = elements;
    }

    toMicheline(): MichelsonMicheline {
        switch (this.#prim) {
            case Prim.Some:
            case Prim.Pair:
            case Prim.Left:
            case Prim.Right:
                return `(${this.#prim} ${this.#elements.map((v) => v.toMicheline()).join(' ')})`;
            case Prim.list:
                return `{ ${this.#elements.map((v) => v.toMicheline()).join(' ; ')} }`;
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

export class Michelson_Map {
    #elements: Michelson_LiteralUnion[][];
    type: IType;

    constructor(type: Michelson_Type, elements: Michelson_LiteralUnion[][]) {
        this.type = type;
        this.#elements = elements;
    }

    private buildMichelineElt = (key: Michelson_LiteralUnion, value: Michelson_LiteralUnion) => {
        return `${Prim.Elt} ${key.toMicheline()} ${value.toMicheline()}`;
    };

    toMicheline(): MichelsonMicheline {
        return `{ ${this.#elements.map(([key, value]) => this.buildMichelineElt(key, value)).join(' ; ')} }`;
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
const buildRecord = (
    fields: Record<string, Michelson_LiteralUnion>,
    layout?: PairsOfKeys<string>,
): Michelson_LiteralUnion => {
    const buildBranch = (branch: string | PairsOfKeys<string>): Michelson_LiteralUnion => {
        if (typeof branch === 'string') {
            // Set field annotation
            fields[branch].type.setAnnotation(branch);
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
const buildVariant = (target: string, value: Michelson_LiteralUnion, type: IRecordVariant): Michelson_LiteralUnion => {
    const [left, right] = type.layout;
    if (left === target) {
        return Left(value, type);
    }
    if (right === target) {
        return Right(value, type);
    }
    if (Array.isArray(left) && left.flat().includes(target)) {
        return Left(buildVariant(target, value, buildRecordVariantType(type.fields, left, TOr)), type);
    }
    if (Array.isArray(right) && right.flat().includes(target)) {
        return Right(buildVariant(target, value, buildRecordVariantType(type.fields, right, TOr)), type);
    }

    throw new Error(`Variant (${target}) is invalid.`);
};

// Singletons
export const Nat = (value: number) => new Michelson_Literal(Prim.int, TNat(), value);
export const Int = (value: number) => new Michelson_Literal(Prim.int, TInt(), value);
export const Mutez = (value: number) => new Michelson_Literal(Prim.int, TMutez(), value);
export const Timestamp = (value: number | string) =>
    new Michelson_Literal(typeof value === 'string' ? Prim.string : Prim.int, TTimestamp(), value);
export const String = (value: string) => new Michelson_Literal(Prim.string, TString(), value);
export const Address = (value: string) => new Michelson_Literal(Prim.string, TAddress(), value);
export const Bytes = (value: string) => new Michelson_Literal(Prim.bytes, TBytes(), value);
export const Chain_id = (value: string) => {
    return new Michelson_Literal(`${value}`.slice(0, 2) === '0x' ? Prim.bytes : Prim.string, TChain_id(), value);
};
export const Bls12_381_fr = (value: string | number) =>
    new Michelson_Literal(typeof value === 'string' ? Prim.bytes : Prim.int, TBls12_381_fr(), value);
export const Bls12_381_g1 = (value: string) => new Michelson_Literal(Prim.bytes, TBls12_381_g1(), value);
export const Bls12_381_g2 = (value: string) => new Michelson_Literal(Prim.bytes, TBls12_381_g2(), value);
export const Key = (value: string) => new Michelson_Literal(Prim.string, TKey(), value);
export const Key_hash = (value: string) => new Michelson_Literal(Prim.string, TKey_hash(), value);
export const Signature = (value: string) => new Michelson_Literal(Prim.string, TSignature(), value);
export const Bool = (value: boolean) => new Michelson_Literal(Prim.bool, TBool(), value);
export const Unit = () => new Michelson_Literal(Prim.Unit, TUnit());
// Containers
export const List = (elements: Michelson_LiteralUnion[], innerType: IType) =>
    new Michelson_Literal_C1(Prim.list, TList(innerType), elements);
export const Set = (elements: Michelson_LiteralUnion[], innerType: IType) =>
    new Michelson_Literal_C1(Prim.list, TSet(innerType), elements);
export const None = (innerType: IType) => new Michelson_Literal(Prim.None, TOption(innerType));
export const Some = (element: Michelson_LiteralUnion) =>
    new Michelson_Literal_C1(Prim.Some, TOption(element.type), [element]);
export const Pair = (left: Michelson_LiteralUnion, right: Michelson_LiteralUnion) =>
    new Michelson_Literal_C1(Prim.Pair, TPair(left.type, right.type), [left, right]);
export const Map = (elements: Michelson_LiteralUnion[][], keyType: IType, valueType: IType) =>
    new Michelson_Map(TMap(keyType, valueType), elements);
export const Big_map = (elements: Michelson_LiteralUnion[][], keyType: IType, valueType: IType) =>
    new Michelson_Map(TBig_map(keyType, valueType), elements);
export const Left = (value: Michelson_LiteralUnion, type: IType) => new Michelson_Literal_C1(Prim.Left, type, [value]);
export const Right = (value: Michelson_LiteralUnion, type: IType) =>
    new Michelson_Literal_C1(Prim.Right, type, [value]);
// Artificial containers
export const Record = (fields: Record<string, Michelson_LiteralUnion>, layout?: PairsOfKeys<string>) =>
    buildRecord(fields, layout);
export const Variant = (branch: string, value: Michelson_LiteralUnion, type: IRecordVariant) =>
    buildVariant(branch, value, type);

const Literals = {
    // Singletons
    Unit,
    Nat,
    Int,
    Mutez,
    String,
    Bool,
    Address,
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
    // Lambda,
    // Artificial containers
    Record,
    Variant,
};

export default Literals;
