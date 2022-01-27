import { MichelsonJSON, MichelsonMicheline, PairsOfKeys } from '../typings';
import { IType } from '../typings/type';
import { Prim } from './enums/prim';

export enum PrimType {
    // Singleton types
    unit = Prim.unit,
    nat = Prim.nat,
    int = Prim.int,
    mutez = Prim.mutez,
    timestamp = Prim.timestamp,
    string = Prim.string,
    address = Prim.address,
    bytes = Prim.bytes,
    chain_id = Prim.chain_id,
    bool = Prim.bool,
    bls12_381_fr = Prim.bls12_381_fr,
    bls12_381_g1 = Prim.bls12_381_g1,
    bls12_381_g2 = Prim.bls12_381_g2,
    key = Prim.key,
    key_hash = Prim.key_hash,
    signature = Prim.signature,
    // Container types
    list = Prim.list,
    set = Prim.set,
    option = Prim.option,
    pair = Prim.pair,
    map = Prim.map,
    big_map = Prim.big_map,
    lambda = Prim.lambda,
}

export class Michelson_Type implements IType {
    _isType = true as const;
    #annotation?: string;

    private innerTypes: IType[];

    constructor(private type: PrimType, ...innerTypes: IType[]) {
        this.innerTypes = innerTypes;
    }

    /**
     * @description Set field annotation
     * @link https://tezos.gitlab.io/active/michelson.html#field-and-constructor-annotations
     * @param {string} annotation field annotation
     */
    public setAnnotation(annotation: string) {
        this.#annotation = annotation;
        return this;
    }

    /**
     * @description Generate the Micheline representation of the type
     * @returns {MichelsonMicheline} Micheline representation
     */
    toMicheline(): MichelsonMicheline {
        const expr = this.#annotation ? `(${this.type} %${this.#annotation})` : `${this.type}`;
        switch (this.type) {
            case PrimType.unit:
            case PrimType.int:
            case PrimType.nat:
            case PrimType.mutez:
            case PrimType.timestamp:
            case PrimType.string:
            case PrimType.address:
            case PrimType.chain_id:
            case PrimType.bool:
            case PrimType.bytes:
            case PrimType.bls12_381_fr:
            case PrimType.bls12_381_g1:
            case PrimType.bls12_381_g2:
            case PrimType.key:
            case PrimType.key_hash:
            case PrimType.signature:
                return expr;
            case PrimType.list:
            case PrimType.set:
            case PrimType.pair:
            case PrimType.option:
            case PrimType.map:
            case PrimType.big_map:
            case PrimType.lambda:
                return `(${[expr, ...this.innerTypes.map((t) => t.toMicheline())].join(' ')})`;
        }
        throw new Error(`Cannot produce michelson for type: ${this.type}`);
    }

    /**
     * @description Generate the JSON representation of the type
     * @returns {MichelsonMicheline} JSON representation
     */
    toJSON(): MichelsonJSON {
        const obj = this.#annotation ? { annots: [`%${this.#annotation}`] } : {};
        switch (this.type) {
            case PrimType.unit:
            case PrimType.int:
            case PrimType.nat:
            case PrimType.mutez:
            case PrimType.timestamp:
            case PrimType.string:
            case PrimType.address:
            case PrimType.chain_id:
            case PrimType.bool:
            case PrimType.bytes:
            case PrimType.bls12_381_fr:
            case PrimType.bls12_381_g1:
            case PrimType.bls12_381_g2:
            case PrimType.key:
            case PrimType.key_hash:
            case PrimType.signature:
                return {
                    ...obj,
                    prim: this.type,
                };
            case PrimType.list:
            case PrimType.set:
            case PrimType.pair:
            case PrimType.option:
            case PrimType.map:
            case PrimType.big_map:
            case PrimType.lambda:
                return {
                    ...obj,
                    prim: this.type,
                    args: this.innerTypes.map((t) => t.toJSON()),
                };
        }

        throw new Error(`Cannot produce michelson JSON for type: ${this.type}`);
    }

    /**
     * @description Resolve type instance to a primitive
     * @return {MichelsonJSON} Michelson JSON format
     */
    [Symbol.toPrimitive](): MichelsonJSON {
        return this.toJSON();
    }
}

export class Michelson_Type_Record<T extends Record<string, IType>> implements IType {
    _isType = true as const;
    #annotation?: string;
    #fields: T;
    // Default layout => https://tezos.gitlab.io/active/michelson.html#operations-on-pairs-and-right-combs
    #layout: PairsOfKeys<keyof T>;

    constructor(fields: T, layout?: PairsOfKeys<keyof T>) {
        this.#fields = fields;
        this.#layout =
            layout || Michelson_Type_Record.composeRightCombLayout<keyof T>(Object.keys(fields) as (keyof T)[]);
    }

    static composeRightCombLayout = <K>(fields: K[]): PairsOfKeys<K> => {
        if (fields.length > 2) {
            return [fields[0], this.composeRightCombLayout<K>(fields.slice(1))];
        }
        return fields;
    };

    /**
     * @description Set field annotation
     * @link https://tezos.gitlab.io/active/michelson.html#field-and-constructor-annotations
     * @param {string} annotation field annotation
     */
    public setAnnotation(annotation: string) {
        this.#annotation = annotation;
        return this;
    }

    /**
     * @description Generate the Micheline representation of the type
     * @param fields Record fields
     * @param layout Record layout
     * @returns {MichelsonMicheline} Micheline representation
     */
    private _toMicheline(fields: T, layout: PairsOfKeys<keyof T>): MichelsonMicheline {
        const annotation = this.#annotation ? ` %${this.#annotation}` : '';
        const innerTypes = layout
            .map((layout) => {
                if (Array.isArray(layout)) {
                    return this._toMicheline(fields, layout);
                }

                return fields[layout].toMicheline();
            }, '')
            .join(' ');
        return `(${Prim.pair}${annotation} ${innerTypes})`;
    }

    /**
     * @description Generate the Micheline representation of the type
     * @returns {MichelsonMicheline} Micheline representation
     */
    public toMicheline(): MichelsonMicheline {
        return this._toMicheline(this.#fields, this.#layout);
    }

    /**
     * @description Generate the JSON representation of the type
     * @param fields Record fields
     * @param layout Record layout
     * @returns {MichelsonMicheline} JSON representation
     */
    private _toJSON(fields: T, layout: PairsOfKeys<keyof T>): MichelsonJSON {
        return {
            prim: Prim.pair,
            ...(this.#annotation ? { annots: [`%${this.#annotation}`] } : {}),
            args: layout.map((layout) => {
                if (Array.isArray(layout)) {
                    return this._toJSON(fields, layout);
                }

                return fields[layout].toJSON();
            }, []),
        };
    }

    /**
     * @description Generate the JSON representation of the type
     * @returns {MichelsonMicheline} JSON representation
     */
    public toJSON(): MichelsonJSON {
        return this._toJSON(this.#fields, this.#layout);
    }

    /**
     * @description Resolve type instance to a primitive
     * @return {MichelsonJSON} Michelson JSON format
     */
    [Symbol.toPrimitive](): MichelsonJSON {
        return this.toJSON();
    }
}

// Singleton types
export const TUnit = () => new Michelson_Type(PrimType.unit);
export const TNat = () => new Michelson_Type(PrimType.nat);
export const TInt = (): IType => new Michelson_Type(PrimType.int);
export const TMutez = () => new Michelson_Type(PrimType.mutez);
export const TString = () => new Michelson_Type(PrimType.string);
export const TBool = () => new Michelson_Type(PrimType.bool);
export const TAddress = () => new Michelson_Type(PrimType.address);
export const TTimestamp = () => new Michelson_Type(PrimType.timestamp);
export const TChain_id = () => new Michelson_Type(PrimType.chain_id);
export const TBytes = () => new Michelson_Type(PrimType.bytes);
export const TBls12_381_fr = () => new Michelson_Type(PrimType.bls12_381_fr);
export const TBls12_381_g1 = () => new Michelson_Type(PrimType.bls12_381_g1);
export const TBls12_381_g2 = () => new Michelson_Type(PrimType.bls12_381_g2);
export const TKey = () => new Michelson_Type(PrimType.key);
export const TKey_hash = () => new Michelson_Type(PrimType.key_hash);
export const TSignature = () => new Michelson_Type(PrimType.signature);

// Container types
export const TList = (innerType: IType) => new Michelson_Type(PrimType.list, innerType);
export const TSet = (innerType: IType) => new Michelson_Type(PrimType.set, innerType);
export const TOption = (innerType: IType) => new Michelson_Type(PrimType.option, innerType);
export const TPair = (leftType: IType, rightType: IType) => new Michelson_Type(PrimType.pair, leftType, rightType);
export const TRecord = <T extends Record<string, IType>, K extends keyof T>(
    fields: T,
    layout?: PairsOfKeys<K>,
): IType => new Michelson_Type_Record(fields, layout);
export const TMap = (keyType: IType, valueType: IType) => new Michelson_Type(PrimType.map, keyType, valueType);
export const TBig_map = (keyType: IType, valueType: IType) => new Michelson_Type(PrimType.big_map, keyType, valueType);
export const TLambda = (inType: IType, outType: IType) => new Michelson_Type(PrimType.lambda, inType, outType);

const Types = {
    // Singleton types
    TUnit,
    TNat,
    TInt,
    TMutez,
    TString,
    TBool,
    TBytes,
    TAddress,
    TTimestamp,
    TChain_id,
    TBls12_381_fr,
    TBls12_381_g1,
    TBls12_381_g2,
    TKey,
    TKey_hash,
    TSignature,
    // Container types
    TList,
    TSet,
    TOption,
    TPair,
    TRecord,
    TMap,
    TBig_map,
    TLambda,
};

export default Types;
