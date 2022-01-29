import { capitalizeBoolean, composeRightCombLayout, compressHexString } from '../../src/misc/utils';

describe('Misc > Utils', () => {
    it('capitalizeBoolean', () => {
        expect(capitalizeBoolean(true)).toBe('True');
        expect(capitalizeBoolean(false)).toBe('False');
    });

    it('compressHexString', () => {
        expect(compressHexString('0xabcdF')).toBe('abcdf');
        expect(compressHexString('abcdfF')).toBe('abcdff');
    });

    it('composeRightCombLayout', () => {
        expect(composeRightCombLayout(['field1', 'field2', 'field3'])).toEqual(
            expect.arrayContaining(['field1', ['field2', 'field3']]),
        );
        expect(composeRightCombLayout(['field1', 'field2', 'field3', 'field4'])).toEqual(
            expect.arrayContaining(['field1', ['field2', ['field3', 'field4']]]),
        );
    });
});
