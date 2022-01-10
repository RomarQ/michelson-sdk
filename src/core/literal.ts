import Utils from '../misc/utils';
import { MichelsonJSON, MichelsonMicheline } from '../typings';
import { Prim } from './enums/prim';
import {
    Michelson_Type,
    TAddress,
    TBool,
    TBytes,
    TChainID,
    TInt,
    TList,
    TMutez,
    TNat,
    TString,
    TTimestamp,
    TUnit,
} from './type';

export type Michelson_LiteralUnion = Michelson_Literal | Michelson_Literal_C1;

export class Michelson_Literal {
    private prim: Prim;
    private value: number | string | boolean;
    type: Michelson_Type;

    constructor(prim: Prim, type: Michelson_Type, value?: number | string | boolean) {
        this.prim = prim;
        this.type = type;
        switch (this.prim) {
            case Prim.Unit:
                this.value = Prim.Unit;
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
                return `${this.value}`;
            case Prim.chain_id:
                if (`${this.value}`.slice(0, 2) === '0x') {
                    return `${this.value}`;
                }
                return `"${this.value}"`;
            case Prim.address:
            case Prim.string:
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
                return {
                    [Prim.string]: this.value,
                };
            case Prim.bytes:
                return {
                    // Same behaviour as in "tezos-client"
                    [Prim.bytes]: Utils.compressHexString(`${this.value}`),
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
    private prim: Prim;
    private elements: Michelson_LiteralUnion[];
    type: Michelson_Type;

    constructor(prim: Prim, type: Michelson_Type, elements: Michelson_LiteralUnion[]) {
        this.prim = prim;
        this.type = type;
        this.elements = elements;
    }

    toMicheline(): MichelsonMicheline {
        switch (this.prim) {
            case Prim.list:
                return `{ ${this.elements.map((v) => v.toMicheline()).join(' ; ')} }`;
        }

        throw new Error(`Cannot produce michelson for literal of type: ${this.prim}`);
    }

    toJSON(): MichelsonJSON {
        switch (this.prim) {
            case Prim.list:
                return this.elements.map((v) => v.toJSON());
        }

        throw new Error(`Cannot produce michelson JSON for literal of type: ${this.prim}`);
    }
}

export const Unit = () => new Michelson_Literal(Prim.Unit, TUnit);

export const Nat = (value: number) => new Michelson_Literal(Prim.nat, TNat, value);
export const Int = (value: number) => new Michelson_Literal(Prim.int, TInt, value);
export const Mutez = (value: number) => new Michelson_Literal(Prim.mutez, TMutez, value);
export const Timestamp = (value: number | string) => new Michelson_Literal(Prim.timestamp, TTimestamp, value);

export const String = (value: string) => new Michelson_Literal(Prim.string, TString, value);
export const Address = (value: string) => new Michelson_Literal(Prim.address, TAddress, value);
export const Bytes = (value: string) => new Michelson_Literal(Prim.bytes, TBytes, value);
export const ChainID = (value: string) => new Michelson_Literal(Prim.chain_id, TChainID, value);

export const Bool = (value: boolean) => new Michelson_Literal(Prim.bool, TBool, value);

export const List = (elements: Michelson_LiteralUnion[], innerType: Michelson_Type) =>
    new Michelson_Literal_C1(Prim.list, TList(innerType), elements);

const Literals = {
    Unit,
    Nat,
    Int,
    Mutez,
    String,
    Bool,
    Address,
    Timestamp,
    ChainID,
    Bytes,
    List,
};

export default Literals;