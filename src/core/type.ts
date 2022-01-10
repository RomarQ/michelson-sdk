import { MichelsonJSON, MichelsonMicheline } from '../typings';
import { Prim } from './enums/prim';

export enum PrimType {
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
    list = Prim.list,
    option = Prim.option,
}

export class Michelson_Type {
    _isType = true as const;

    private innerTypes: Michelson_Type[];

    constructor(private type: PrimType, ...innerTypes: Michelson_Type[]) {
        this.innerTypes = innerTypes;
    }

    toMicheline(): MichelsonMicheline {
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
                return String(this.type);
            case PrimType.list:
                return `(${this.type} ${this.innerTypes.map((t) => t.toMicheline()).join(' ')})`;
        }
        throw new Error(`Cannot produce michelson for type: ${this.type}`);
    }

    toJSON(): MichelsonJSON {
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
                return {
                    prim: this.type,
                };
            case PrimType.list:
                return {
                    prim: this.type,
                    args: this.innerTypes.map((t) => t.toJSON()),
                };
        }

        throw new Error(`Cannot produce michelson JSON for type: ${this.type}`);
    }
}

// Singleton types
export const TUnit = new Michelson_Type(PrimType.unit);
export const TNat = new Michelson_Type(PrimType.nat);
export const TInt = new Michelson_Type(PrimType.int);
export const TMutez = new Michelson_Type(PrimType.mutez);
export const TString = new Michelson_Type(PrimType.string);
export const TBool = new Michelson_Type(PrimType.bool);
export const TAddress = new Michelson_Type(PrimType.address);
export const TTimestamp = new Michelson_Type(PrimType.timestamp);
export const TChainID = new Michelson_Type(PrimType.chain_id);
export const TBytes = new Michelson_Type(PrimType.bytes);
// Container types
export const TList = (innerType: Michelson_Type) => new Michelson_Type(PrimType.list, innerType);

const Types = {
    // Singleton types
    TUnit,
    TNat,
    TInt,
    TMutez,
    TString,
    TBool,
    TAddress,
    TTimestamp,
    TChainID,
    // Container types
    TList,
};

export default Types;
