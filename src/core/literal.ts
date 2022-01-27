import {
    Michelson_Type_Record,
    TBls12_381_fr,
    TBls12_381_g1,
    TBls12_381_g2,
    TKey,
    TKey_hash,
    TOption,
    TRecord,
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
} from './type';
import type { Michelson_Type } from './type';
import Utils from '../misc/utils';
import { MichelsonJSON, MichelsonMicheline } from '../typings';
import { ILayout, IType } from '../typings/type';
import { Prim } from './enums/prim';
import { TBig_map } from '.';

export type Michelson_LiteralUnion = Michelson_Literal | Michelson_Literal_C1 | Michelson_Record | Michelson_Map;

export class Michelson_Literal {
    private prim: Prim;
    private value: number | string | boolean;
    type: IType;

    constructor(prim: Prim, type: Michelson_Type, value?: number | string | boolean) {
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
            case Prim.nat:
            case Prim.mutez:
            case Prim.bytes:
            case Prim.bls12_381_fr:
            case Prim.bls12_381_g1:
            case Prim.bls12_381_g2:
                return `${this.value}`;
            case Prim.chain_id:
                if (`${this.value}`.slice(0, 2) === '0x') {
                    return `${this.value}`;
                }
                return `"${this.value}"`;
            case Prim.address:
            case Prim.string:
            case Prim.key:
            case Prim.key_hash:
            case Prim.signature:
                return `"${this.value}"`;

            case Prim.timestamp:
                if (typeof this.value === 'string') {
                    return `"${this.value}"`;
                }
                return `${this.value}`;
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
            case Prim.nat:
            case Prim.mutez:
                return {
                    [Prim.int]: `${this.value}`,
                };
            case Prim.string:
            case Prim.address:
            case Prim.key:
            case Prim.key_hash:
            case Prim.signature:
                return {
                    [Prim.string]: this.value,
                };
            case Prim.bytes:
            case Prim.bls12_381_g1:
            case Prim.bls12_381_g2:
                return {
                    // Same behaviour as in "tezos-client"
                    [Prim.bytes]: Utils.compressHexString(`${this.value}`),
                };
            case Prim.bls12_381_fr:
                if (`${this.value}`.slice(0, 2) === '0x') {
                    return {
                        // Same behaviour as in "tezos-client"
                        [Prim.bytes]: Utils.compressHexString(`${this.value}`),
                    };
                }
                return {
                    [Prim.int]: `${this.value}`,
                };
            case Prim.chain_id:
                if (`${this.value}`.slice(0, 2) === '0x') {
                    return {
                        // Same behaviour as in "tezos-client"
                        [Prim.bytes]: Utils.compressHexString(`${this.value}`),
                    };
                }
                return {
                    [Prim.string]: this.value,
                };
            case Prim.timestamp:
                if (typeof this.value === 'string') {
                    return {
                        [Prim.string]: this.value,
                    };
                }
                return {
                    [Prim.int]: `${this.value}`,
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

    constructor(prim: Prim, type: Michelson_Type, elements: Michelson_LiteralUnion[]) {
        this.#prim = prim;
        this.type = type;
        this.#elements = elements;
    }

    toMicheline(): MichelsonMicheline {
        switch (this.#prim) {
            case Prim.Some:
            case Prim.Pair:
                return `(${this.#prim} ${this.#elements.map((v) => v.toMicheline()).join(' ')})`;
            case Prim.list:
            case Prim.set:
                return `{ ${this.#elements.map((v) => v.toMicheline()).join(' ; ')} }`;
        }

        throw new Error(`Cannot produce michelson for literal of type: ${this.#prim}`);
    }

    toJSON(): MichelsonJSON {
        switch (this.#prim) {
            case Prim.Some:
            case Prim.Pair:
                return {
                    prim: this.#prim,
                    args: this.#elements.map((v) => v.toJSON()),
                };
            case Prim.list:
            case Prim.set:
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

class Michelson_Record {
    #fields: Record<string, Michelson_LiteralUnion>;
    type: IType;
    // Default layout => https://tezos.gitlab.io/active/michelson.html#operations-on-pairs-and-right-combs
    #layout: ILayout;

    constructor(fields: Record<string, Michelson_LiteralUnion>, layout?: ILayout) {
        this.#fields = fields;
        this.#layout = layout || Michelson_Type_Record.composeRightCombLayout(Object.keys(fields));
        this.type = TRecord(
            Object.entries(fields).reduce((pv, [key, value]) => {
                return {
                    ...pv,
                    [key]: value.type.setAnnotation(key),
                };
            }, {}),
            this.#layout,
        );
    }

    /**
     * @description Generate the Micheline representation
     * @param fields Record fields
     * @param layout Record layout
     * @returns {MichelsonMicheline} Micheline representation
     */
    private _toMicheline(
        fields: globalThis.Record<string, Michelson_LiteralUnion>,
        layout: ILayout,
    ): MichelsonMicheline {
        const innerTypes = layout
            .map((layout) => {
                if (Array.isArray(layout)) {
                    return this._toMicheline(fields, layout as ILayout);
                }

                return fields[layout].toMicheline();
            }, '')
            .join(' ');
        return `(${Prim.Pair} ${innerTypes})`;
    }

    /**
     * @description Generate the Micheline representation
     * @returns {MichelsonMicheline} Micheline representation
     */
    public toMicheline(): MichelsonMicheline {
        return this._toMicheline(this.#fields, this.#layout);
    }

    /**
     * @description Generate the JSON representation
     * @param fields Record fields
     * @param layout Record layout
     * @returns {MichelsonMicheline} JSON representation
     */
    private _toJSON(fields: Record<string, Michelson_LiteralUnion>, layout: ILayout): MichelsonJSON {
        return {
            prim: Prim.Pair,
            args: layout.map((layout) => {
                if (Array.isArray(layout)) {
                    return this._toJSON(fields, layout as ILayout);
                }

                return fields[layout].toJSON();
            }, []),
        };
    }

    /**
     * @description Generate the JSON representation
     * @returns {MichelsonMicheline} JSON representation
     */
    public toJSON(): MichelsonJSON {
        return this._toJSON(this.#fields, this.#layout);
    }
}

export const Unit = () => new Michelson_Literal(Prim.Unit, TUnit());

export const Nat = (value: number) => new Michelson_Literal(Prim.nat, TNat(), value);
export const Int = (value: number) => new Michelson_Literal(Prim.int, TInt(), value);
export const Mutez = (value: number) => new Michelson_Literal(Prim.mutez, TMutez(), value);
export const Timestamp = (value: number | string) => new Michelson_Literal(Prim.timestamp, TTimestamp(), value);

export const String = (value: string) => new Michelson_Literal(Prim.string, TString(), value);
export const Address = (value: string) => new Michelson_Literal(Prim.address, TAddress(), value);
export const Bytes = (value: string) => new Michelson_Literal(Prim.bytes, TBytes(), value);
export const Chain_id = (value: string) => new Michelson_Literal(Prim.chain_id, TChain_id(), value);
export const Bls12_381_fr = (value: string | number) =>
    new Michelson_Literal(Prim.bls12_381_fr, TBls12_381_fr(), value);
export const Bls12_381_g1 = (value: string) => new Michelson_Literal(Prim.bls12_381_g1, TBls12_381_g1(), value);
export const Bls12_381_g2 = (value: string) => new Michelson_Literal(Prim.bls12_381_g2, TBls12_381_g2(), value);
export const Key = (value: string) => new Michelson_Literal(Prim.key, TKey(), value);
export const Key_hash = (value: string) => new Michelson_Literal(Prim.key_hash, TKey_hash(), value);
export const Signature = (value: string) => new Michelson_Literal(Prim.signature, TSignature(), value);

export const Bool = (value: boolean) => new Michelson_Literal(Prim.bool, TBool(), value);

export const List = (elements: Michelson_LiteralUnion[], innerType: IType) =>
    new Michelson_Literal_C1(Prim.list, TList(innerType), elements);

export const Set = (elements: Michelson_LiteralUnion[], innerType: IType) =>
    new Michelson_Literal_C1(Prim.set, TSet(innerType), elements);

export const None = (innerType: IType) => new Michelson_Literal(Prim.None, TOption(innerType));
export const Some = (element: Michelson_LiteralUnion) =>
    new Michelson_Literal_C1(Prim.Some, TOption(element.type), [element]);

export const Pair = (left: Michelson_LiteralUnion, right: Michelson_LiteralUnion) =>
    new Michelson_Literal_C1(Prim.Pair, TPair(left.type, right.type), [left, right]);
export const Record = (fields: Record<string, Michelson_LiteralUnion>, layout?: ILayout) =>
    new Michelson_Record(fields, layout);

export const Map = (elements: Michelson_LiteralUnion[][], keyType: IType, valueType: IType) =>
    new Michelson_Map(TMap(keyType, valueType), elements);
export const Big_map = (elements: Michelson_LiteralUnion[][], keyType: IType, valueType: IType) =>
    new Michelson_Map(TBig_map(keyType, valueType), elements);

const Literals = {
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
    //
    List,
    Set,
    None,
    Some,
    Pair,
    Record,
    Map,
    Big_map,
    // Lambda,
};

export default Literals;