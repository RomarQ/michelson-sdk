import { Prim } from '../core/enums/prim';

/**
 * @see https://tezos.gitlab.io/alpha/michelson.html#full-grammar
 */
export type PrimValue =
    | Prim.int
    | Prim.string
    | Prim.bytes
    | Prim.Unit
    | Prim.Some
    | Prim.None
    | Prim.Pair
    | Prim.Left
    | Prim.Right
    | Prim.True
    | Prim.False
    | Prim.Elt;
