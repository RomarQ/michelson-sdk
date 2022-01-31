import { Prim } from '../enums/prim';
import Guards from '../misc/guards';
import { MichelsonJSON, MichelsonJSON_Prim, MichelsonMicheline } from '../typings';

/**
 * @description Convert type from JSON to Micheline
 * @param {MichelsonJSON_Prim} michelson type
 * @returns {MichelsonMicheline}
 */
const toMichelineType = (michelson: MichelsonJSON_Prim): MichelsonMicheline => {
    const args = michelson.args?.map((m) => toMicheline(m, '')) || [];
    const annot = michelson.annots || [];
    if (args.length || annot.length) {
        return `(${[michelson.prim, ...annot, ...args].join(' ')})`;
    }
    return michelson.prim;
};

/**
 * @description Convert sequence from JSON to Micheline
 * @param {MichelsonJSON[]} michelson sequence
 * @param {string} identation
 * @returns {MichelsonMicheline}
 */
const toMichelineSeq = (michelson: MichelsonJSON[], identation: string): MichelsonMicheline => {
    const innerIdentation = identation + ' '.repeat(2);
    return `${identation ? `\n${identation}` : identation}{\n${michelson
        .map((m) => toMicheline(m, innerIdentation))
        .join(`\n`)}\n${identation}}`;
};

export const toMicheline = (michelson: MichelsonJSON, padding = ''): MichelsonMicheline => {
    if (Array.isArray(michelson)) {
        return toMichelineSeq(michelson, padding);
    }
    if (Guards.isInt(michelson)) {
        return michelson.int;
    }
    if (Guards.isString(michelson)) {
        return michelson.string;
    }
    if (Guards.isBytes(michelson)) {
        return michelson.bytes;
    }
    const prim = michelson.prim;
    const args = michelson.args || [];
    switch (michelson.prim) {
        case Prim.storage:
        case Prim.parameter:
            return `${padding}${prim} ${(args as MichelsonJSON_Prim[]).map(toMichelineType).join('')};`;
        case Prim.code:
            return `${padding}${prim} ${toMicheline(michelson.args?.[0] || [], padding).trim()};`;
        case Prim.unit:
        case Prim.nat:
        case Prim.int:
        case Prim.mutez:
        case Prim.timestamp:
        case Prim.string:
        case Prim.address:
        case Prim.bytes:
        case Prim.chain_id:
        case Prim.bool:
        case Prim.bls12_381_fr:
        case Prim.bls12_381_g1:
        case Prim.bls12_381_g2:
        case Prim.key:
        case Prim.key_hash:
        case Prim.signature:
        case Prim.operation:
        case Prim.never:
        case Prim.list:
        case Prim.set:
        case Prim.option:
        case Prim.pair:
        case Prim.or:
        case Prim.map:
        case Prim.big_map:
        case Prim.lambda:
        case Prim.ticket:
        case Prim.contract:
        case Prim.sapling_state:
        case Prim.sapling_transaction:
            return toMichelineType(michelson);
        case Prim.None:
        case Prim.True:
        case Prim.False:
        case Prim.Unit:
            return prim;
        case Prim.Some:
        case Prim.Pair:
        case Prim.Left:
        case Prim.Right:
            return `(${[prim, ...(args?.map((m) => toMicheline(m, padding)) || [])].join(' ')})`;
        default:
            return `${padding}${[prim, ...(args?.map((m) => toMicheline(m, padding)) || [])].join(' ')};`;
    }
};

const Michelson_JSON = {
    toMichelineType,
    toMichelineSeq,
    toMicheline,
};

export default Michelson_JSON;
