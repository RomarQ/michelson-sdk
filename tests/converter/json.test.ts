import Converter from '../../src/converter';

describe('Converter > JSON', () => {
    it('Type', () => {
        expect(
            Converter.michelineOfJSON({
                prim: 'pair',
                args: [
                    { prim: 'nat', annots: ['%b'] },
                    { prim: 'nat', annots: ['%a'] },
                ],
            }),
        ).toEqual('(pair (nat %b) (nat %a))');
    });
    it('Value', () => {
        expect(Converter.michelineOfJSON({ prim: 'Pair', args: [{ int: '1' }, { int: '2' }] })).toEqual('(Pair 1 2)');
    });
    it('Code block', () => {
        expect(
            Converter.michelineOfJSON([
                { prim: 'CDR' },
                { prim: 'NIL', args: [{ prim: 'operation' }] },
                { prim: 'PAIR' },
            ]),
        ).toEqual(
            `{
  CDR;
  NIL operation;
  PAIR;
}`,
        );
    });
    it('Whole contract', () => {
        expect(
            Converter.michelineOfJSON([
                {
                    prim: 'storage',
                    args: [
                        {
                            prim: 'pair',
                            args: [
                                { prim: 'nat', annots: ['%b'] },
                                { prim: 'nat', annots: ['%a'] },
                            ],
                        },
                    ],
                },
                { prim: 'parameter', args: [{ prim: 'unit' }] },
                {
                    prim: 'code',
                    args: [
                        [
                            { prim: 'DROP' },
                            {
                                prim: 'PUSH',
                                args: [
                                    {
                                        prim: 'pair',
                                        args: [
                                            { prim: 'nat', annots: ['%b'] },
                                            { prim: 'nat', annots: ['%a'] },
                                        ],
                                    },
                                    { prim: 'Pair', args: [{ int: '1' }, { int: '2' }] },
                                ],
                            },
                            { prim: 'NIL', args: [{ prim: 'operation' }] },
                            { prim: 'PAIR' },
                        ],
                    ],
                },
            ]),
        ).toEqual(
            `{
  storage (pair (nat %b) (nat %a));
  parameter unit;
  code {
    DROP;
    PUSH (pair (nat %b) (nat %a)) (Pair 1 2);
    NIL operation;
    PAIR;
  };
}`,
        );
    });
});
