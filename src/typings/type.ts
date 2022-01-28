import { MichelsonJSON, MichelsonMicheline } from '.';
import { Prim } from '../core/enums/prim';

export interface IType {
    setAnnotation: (annotation: string) => IType;
    toMicheline: () => MichelsonMicheline;
    toJSON: () => MichelsonJSON;
}

export type ILayout = (string | ILayout)[];

export type PrimType =
    // Singleton types
    | Prim.unit
    | Prim.nat
    | Prim.int
    | Prim.mutez
    | Prim.timestamp
    | Prim.string
    | Prim.address
    | Prim.bytes
    | Prim.chain_id
    | Prim.bool
    | Prim.bls12_381_fr
    | Prim.bls12_381_g1
    | Prim.bls12_381_g2
    | Prim.key
    | Prim.key_hash
    | Prim.signature
    | Prim.operation
    | Prim.never
    // Container types
    | Prim.list
    | Prim.set
    | Prim.option
    | Prim.pair
    | Prim.or
    | Prim.map
    | Prim.big_map
    | Prim.lambda
    | Prim.ticket
    | Prim.contract
    | Prim.sapling_state
    | Prim.sapling_transaction;
