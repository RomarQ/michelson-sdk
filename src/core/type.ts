import { MichelsonJSON, MichelsonMicheline, PairsOfKeys } from '../typings';
import { IType, PrimType } from '../typings/type';
import { Prim } from './enums/prim';

export class Michelson_Type implements IType {
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
            case Prim.unit:
            case Prim.int:
            case Prim.nat:
            case Prim.mutez:
            case Prim.timestamp:
            case Prim.string:
            case Prim.address:
            case Prim.chain_id:
            case Prim.bool:
            case Prim.bytes:
            case Prim.bls12_381_fr:
            case Prim.bls12_381_g1:
            case Prim.bls12_381_g2:
            case Prim.key:
            case Prim.key_hash:
            case Prim.signature:
            case Prim.operation:
            case Prim.never:
                return expr;
            case Prim.list:
            case Prim.set:
            case Prim.pair:
            case Prim.or:
            case Prim.option:
            case Prim.map:
            case Prim.big_map:
            case Prim.lambda:
            case Prim.ticket:
            case Prim.contract:
            case Prim.sapling_state:
            case Prim.sapling_transaction:
                return `(${[expr, ...this.innerTypes.map((t) => t.toMicheline())].join(' ')})`;
        }
    }

    /**
     * @description Generate the JSON representation of the type
     * @returns {MichelsonMicheline} JSON representation
     */
    toJSON(): MichelsonJSON {
        const obj = this.#annotation ? { annots: [`%${this.#annotation}`] } : {};
        switch (this.type) {
            case Prim.unit:
            case Prim.int:
            case Prim.nat:
            case Prim.mutez:
            case Prim.timestamp:
            case Prim.string:
            case Prim.address:
            case Prim.chain_id:
            case Prim.bool:
            case Prim.bytes:
            case Prim.bls12_381_fr:
            case Prim.bls12_381_g1:
            case Prim.bls12_381_g2:
            case Prim.key:
            case Prim.key_hash:
            case Prim.signature:
            case Prim.operation:
            case Prim.never:
                return {
                    ...obj,
                    prim: this.type,
                };
            case Prim.list:
            case Prim.set:
            case Prim.pair:
            case Prim.or:
            case Prim.option:
            case Prim.map:
            case Prim.big_map:
            case Prim.lambda:
            case Prim.ticket:
            case Prim.contract:
            case Prim.sapling_state:
            case Prim.sapling_transaction:
                return {
                    ...obj,
                    prim: this.type,
                    args: this.innerTypes.map((t) => t.toJSON()),
                };
        }
    }

    /**
     * @description Resolve type instance to a primitive
     * @return {MichelsonJSON} Michelson JSON format
     */
    [Symbol.toPrimitive](): MichelsonJSON {
        return this.toJSON();
    }
}

export class Michelson_Type_With_Param implements IType {
    #annotation?: string;

    #params: number[];

    constructor(private type: PrimType, ...params: number[]) {
        this.#params = params;
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
        return `(${[this.type, ...this.#params.map(String)].join(' ')})`;
    }

    /**
     * @description Generate the JSON representation of the type
     * @returns {MichelsonMicheline} JSON representation
     */
    toJSON(): MichelsonJSON {
        const obj = this.#annotation ? { annots: [`%${this.#annotation}`] } : {};
        return {
            ...obj,
            prim: this.type,
            args: this.#params.map((p) => ({
                int: String(p),
            })),
        };
    }

    /**
     * @description Resolve type instance to a primitive
     * @return {MichelsonJSON} Michelson JSON format
     */
    [Symbol.toPrimitive](): MichelsonJSON {
        return this.toJSON();
    }
}

export class Michelson_Type_Record<T extends Record<string, IType> = Record<string, IType>> implements IType {
    _isType = true as const;
    #annotation?: string;
    #fields: T;
    // Default: right combs => https://tezos.gitlab.io/active/michelson.html#operations-on-pairs-and-right-combs
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
export const TNat = () => new Michelson_Type(Prim.nat);
export const TInt = () => new Michelson_Type(Prim.int);
export const TMutez = () => new Michelson_Type(Prim.mutez);
export const TString = () => new Michelson_Type(Prim.string);
export const TBool = () => new Michelson_Type(Prim.bool);
export const TAddress = () => new Michelson_Type(Prim.address);
export const TTimestamp = () => new Michelson_Type(Prim.timestamp);
export const TChain_id = () => new Michelson_Type(Prim.chain_id);
export const TBytes = () => new Michelson_Type(Prim.bytes);
export const TBls12_381_fr = () => new Michelson_Type(Prim.bls12_381_fr);
export const TBls12_381_g1 = () => new Michelson_Type(Prim.bls12_381_g1);
export const TBls12_381_g2 = () => new Michelson_Type(Prim.bls12_381_g2);
export const TKey = () => new Michelson_Type(Prim.key);
export const TKey_hash = () => new Michelson_Type(Prim.key_hash);
export const TSignature = () => new Michelson_Type(Prim.signature);
export const TUnit = () => new Michelson_Type(Prim.unit);
export const TOperation = () => new Michelson_Type(Prim.operation);
export const TNever = () => new Michelson_Type(Prim.never);
// Container types
export const TList = (innerType: IType) => new Michelson_Type(Prim.list, innerType);
export const TSet = (innerType: IType) => new Michelson_Type(Prim.set, innerType);
export const TOption = (innerType: IType) => new Michelson_Type(Prim.option, innerType);
export const TPair = (leftType: IType, rightType: IType) => new Michelson_Type(Prim.pair, leftType, rightType);
export const TOr = (leftType: IType, rightType: IType) => new Michelson_Type(Prim.or, leftType, rightType);
export const TMap = (keyType: IType, valueType: IType) => new Michelson_Type(Prim.map, keyType, valueType);
export const TBig_map = (keyType: IType, valueType: IType) => new Michelson_Type(Prim.big_map, keyType, valueType);
export const TLambda = (inType: IType, outType: IType) => new Michelson_Type(Prim.lambda, inType, outType);
export const TTicket = (innerType: IType) => new Michelson_Type(Prim.ticket, innerType);
export const TContract = (innerType: IType) => new Michelson_Type(Prim.contract, innerType);
export const TSapling_state = (memoSize: number) => new Michelson_Type_With_Param(Prim.sapling_state, memoSize);
export const TSapling_transaction = (memoSize: number) =>
    new Michelson_Type_With_Param(Prim.sapling_transaction, memoSize);
// Artificial Types
export const TRecord = (fields: Record<string, IType>, layout?: PairsOfKeys<string>) =>
    new Michelson_Type_Record(fields, layout);

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
    TOperation,
    TNever,
    // Container types
    TList,
    TSet,
    TOption,
    TPair,
    TOr,
    TMap,
    TBig_map,
    TLambda,
    TTicket,
    TContract,
    TSapling_state,
    TSapling_transaction,
    // Artificial Types
    TRecord,
};

export default Types;
