export type MichelsonJSON = Record<string, unknown> | MichelsonJSON[];
export type MichelsonMicheline = string;
export type PairsOfKeys<K> = (K | PairsOfKeys<K>)[];
export * from './literal';
export * from './type';
