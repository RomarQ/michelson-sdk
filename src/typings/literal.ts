import { Prim } from '../core/enums/prim';

export type PrimValue =
    | Prim.Unit
    | Prim.int
    | Prim.string
    | Prim.bytes
    | Prim.bool
    | Prim.Some
    | Prim.None
    | Prim.list
    | Prim.Pair
    | Prim.Left
    | Prim.Right;
