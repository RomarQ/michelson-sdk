import { Prim } from '../core/enums/prim';

export interface ILiteral {
    _isLiteral: true;
}

export type PrimValue =
    | Prim.Unit
    | Prim.int
    | Prim.string
    | Prim.bytes
    | Prim.bool
    | Prim.Some
    | Prim.None
    | Prim.list
    | Prim.Pair;
