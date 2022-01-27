export type MichelsonJSON = Record<string, unknown> | MichelsonJSON[];
export type MichelsonMicheline = string;

export type PairsOfKeys<K> = (K | PairsOfKeys<K>)[];
