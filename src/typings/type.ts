import { MichelsonJSON, MichelsonMicheline } from '.';

export interface IType {
    _isType: true;
    setAnnotation: (annotation: string) => IType;
    toMicheline: () => MichelsonMicheline;
    toJSON: () => MichelsonJSON;
}

export type ILayout = (string | ILayout)[];
