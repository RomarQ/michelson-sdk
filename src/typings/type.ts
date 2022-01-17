import { MichelsonJSON, MichelsonMicheline } from '.';

export interface IType {
    _isType: true;
    toMicheline: () => MichelsonMicheline;
    toJSON: () => MichelsonJSON;
}

export type ILayout = (string | ILayout)[];
