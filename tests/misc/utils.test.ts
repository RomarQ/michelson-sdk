import { capitalizeBoolean, compressHexString } from '../../src/misc/utils';

describe('Misc > Utils', () => {
    it('capitalizeBoolean', () => {
        expect(capitalizeBoolean(true)).toBe('True');
        expect(capitalizeBoolean(false)).toBe('False');
    });

    it('compressHexString', () => {
        expect(compressHexString('0xabcdF')).toBe('abcdf');
        expect(compressHexString('abcdfF')).toBe('abcdff');
    });
});
