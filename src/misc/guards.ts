import {
    MichelsonJSON,
    MichelsonJSON_Bytes,
    MichelsonJSON_Int,
    MichelsonJSON_Prim,
    MichelsonJSON_String,
} from '../typings';

const isPrim = (michelson: MichelsonJSON): michelson is MichelsonJSON_Prim => 'prim' in michelson;
const isInt = (michelson: MichelsonJSON): michelson is MichelsonJSON_Int => 'int' in michelson;
const isString = (michelson: MichelsonJSON): michelson is MichelsonJSON_String => 'string' in michelson;
const isBytes = (michelson: MichelsonJSON): michelson is MichelsonJSON_Bytes => 'bytes' in michelson;

const Guards = {
    isPrim,
    isInt,
    isString,
    isBytes,
};

export default Guards;
