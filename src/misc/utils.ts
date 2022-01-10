export const capitalizeBoolean = (bool: boolean): string => (bool ? 'True' : 'False');

export const compressHexString = (str: string) => {
    return (str.slice(0, 2) === '0x' ? str.slice(2) : str).toLowerCase();
};

const Utils = {
    capitalizeBoolean,
    compressHexString,
};

export default Utils;
