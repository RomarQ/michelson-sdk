import type { PairsOfKeys } from '../typings';
import { Prim } from '../core/enums/prim';

export const parenthesis = (str: string) => `(${str})`;
export const curlyBrackets = (str: string) => `{ ${str} }`;

export const capitalizeBoolean = (bool: boolean): Prim.True | Prim.False => (bool ? Prim.True : Prim.False);

export const compressHexString = (str: string) => {
    return (str.slice(0, 2) === '0x' ? str.slice(2) : str).toLowerCase();
};

/**
 * @description Build right aligned nested binary pairs
 * @see https://tezos.gitlab.io/active/michelson.html#operations-on-pairs-and-right-combs
 * @param fields A sequence of strings
 * @returns {PairsOfKeys<K>}
 */
export const composeRightCombLayout = <K>(fields: K[]): PairsOfKeys<K> => {
    if (fields.length > 2) {
        return [fields[0], composeRightCombLayout<K>(fields.slice(1))];
    }
    return fields;
};

const Utils = {
    parenthesis,
    curlyBrackets,
    capitalizeBoolean,
    compressHexString,
    composeRightCombLayout,
};

export default Utils;
