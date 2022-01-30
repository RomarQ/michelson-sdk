import type { MichelsonJSON, MichelsonMicheline, PairsOfKeys, IType, PrimType } from '../typings';
import { composeRightCombLayout, parenthesis } from '../misc/utils';
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
        const annot = this.#annotation ? `%${this.#annotation}` : '';
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
                return annot ? parenthesis(`${this.type} ${annot}`) : this.type;
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
                return parenthesis(
                    [this.type, ...(annot ? [annot] : []), ...this.innerTypes.map((t) => t.toMicheline())].join(' '),
                );
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

export interface IRecordVariant extends IType {
    fields: Record<string, IType>;
    layout: PairsOfKeys<string>;
}
export const buildRecordVariantType = (
    fields: Record<string, IType>,
    layout: PairsOfKeys<string>,
    container: (leftType: IType, rightType: IType) => IType,
): IRecordVariant => {
    const buildBranch = (branch: string | PairsOfKeys<string>): IType => {
        if (typeof branch === 'string') {
            return fields[branch].setAnnotation(branch);
        }
        const [left, right] = branch;
        return container(buildBranch(left), buildBranch(right));
    };

    return Object.assign(buildBranch(layout), { fields, layout });
};

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
    buildRecordVariantType(fields, layout || composeRightCombLayout(Object.keys(fields)), TPair);
export const TVariant = (fields: Record<string, IType>, layout?: PairsOfKeys<string>) =>
    buildRecordVariantType(fields, layout || composeRightCombLayout(Object.keys(fields)), TOr);

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
    TVariant,
};

export default Types;
