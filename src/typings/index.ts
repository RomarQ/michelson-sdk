import { Prim } from '../core/enums/prim';

export type MichelsonJSON_Prim = {
    prim: keyof typeof Prim;
    args?: MichelsonJSON[];
    annots?: string[];
};
export type MichelsonJSON_Int = {
    int: string;
    annots?: string[];
};
export type MichelsonJSON_String = {
    string: string;
    annots?: string[];
};
export type MichelsonJSON_Bytes = {
    bytes: string;
    annots?: string[];
};
export type MichelsonJSON =
    | MichelsonJSON_Prim
    | MichelsonJSON_Int
    | MichelsonJSON_String
    | MichelsonJSON_Bytes
    | MichelsonJSON[];
export type MichelsonMicheline = string;
export type PairsOfKeys<K> = (K | PairsOfKeys<K>)[];

export interface IValue {
    toMicheline: (wrap?: boolean) => MichelsonMicheline;
    toJSON: () => MichelsonJSON;
}

export interface IType {
    setAnnotation: (annotation: string) => IType;
    toMicheline: () => MichelsonMicheline;
    toJSON: () => MichelsonJSON;
}

export * from './literal';
export * from './type';
