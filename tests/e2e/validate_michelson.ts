import type { IType, IValue } from '../../src/typings';
import {
    Address,
    Bool,
    Bytes,
    Chain_id,
    Int,
    Set,
    List,
    Mutez,
    Nat,
    None,
    Pair,
    Record,
    Some,
    String,
    Timestamp,
    Unit,
    Bls12_381_fr,
    Bls12_381_g2,
    Bls12_381_g1,
    Key,
    Signature,
    Key_hash,
    Map,
    Big_map,
    Variant,
    Left,
    Right,
    Lambda,
} from '../../src/literal';
import {
    TAddress,
    TBig_map,
    TBls12_381_fr,
    TBls12_381_g1,
    TBls12_381_g2,
    TBool,
    TBytes,
    TChain_id,
    TInt,
    TKey,
    TKey_hash,
    TLambda,
    TList,
    TMap,
    TMutez,
    TNat,
    TOption,
    TOr,
    TPair,
    TRecord,
    TSet,
    TSignature,
    TString,
    TTimestamp,
    TUnit,
    TVariant,
} from '../../src/type';
import { buildTesterContract, convertContractToJSON, convertMichelsonToJSON } from './utils';

const verifyLiteral = (testName: string, lit: IValue, type: IType) => {
    it(testName, () => {
        const { micheline, json } = buildTesterContract(lit, type);
        const jsonResult = convertContractToJSON(micheline);
        expect([micheline, json]).toMatchSnapshot();
        expect(json).toEqual(JSON.parse(jsonResult));
    });
};

export const runTests = () => {
    describe('[E2E] - Michelson compilation (Singleton Literals)', () => {
        verifyLiteral('Nat', Nat(1), TNat());
        verifyLiteral('Int', Int(2), TInt());
        verifyLiteral('Mutez', Mutez(10), TMutez());
        verifyLiteral('String', String('Hello World'), TString());
        verifyLiteral('Bool (True)', Bool(true), TBool());
        verifyLiteral('Bool (False)', Bool(false), TBool());
        verifyLiteral('Bytes', Bytes('0xFFFF'), TBytes());
        verifyLiteral('Address', Address('tz28QJHLyqvaY2rXAoFZTbxrXeD88NA8wscC'), TAddress());
        verifyLiteral('Timestamp (string)', Timestamp('2019-09-26T10:59:51Z'), TTimestamp());
        verifyLiteral('Timestamp (number)', Timestamp(1571659294), TTimestamp());
        verifyLiteral('ChainID (string)', Chain_id('NetXynUjJNZm7wi'), TChain_id());
        verifyLiteral('ChainID (bytes)', Chain_id('0x7a06a770'), TChain_id());
        verifyLiteral('Unit', Unit(), TUnit());
        verifyLiteral('Bls12_381_fr (bytes)', Bls12_381_fr('0x0001'), TBls12_381_fr());
        verifyLiteral('Bls12_381_fr (number)', Bls12_381_fr(1), TBls12_381_fr());
        verifyLiteral(
            'Bls12_381_g1',
            Bls12_381_g1(
                '0x0572cbea904d67468808c8eb50a9450c9721db309128012543902d0ac358a62ae28f75bb8f1c7c42c39a8c5529bf0f4e166a9d8cabc673a322fda673779d8e3822ba3ecb8670e461f73bb9021d5fd76a4c56d9d4cd16bd1bba86881979749d28',
            ),
            TBls12_381_g1(),
        );
        verifyLiteral(
            'Bls12_381_g2',
            Bls12_381_g2(
                '0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb813fa4d4a0ad8b1ce186ed5061789213d993923066dddaf1040bc3ff59f825c78df74f2d75467e25e0f55f8a00fa030ed0d1b3cc2c7027888be51d9ef691d77bcb679afda66c73f17f9ee3837a55024f78c71363275a75d75d86bab79f74782aa',
            ),
            TBls12_381_g2(),
        );
        verifyLiteral('Key', Key('edpku3g7CeTEvSKhxipD4Q2B6EiEP8cR323u8PFmGFgKRVRvCneEmT'), TKey());
        verifyLiteral('Key hash', Key_hash('tz28QJHLyqvaY2rXAoFZTbxrXeD88NA8wscC'), TKey_hash());
        verifyLiteral(
            'Signature',
            Signature(
                'sigsAujsNePapNNGsVotTvcKWMNNJja9B4a2FfAe8vExzFhEgEo1GTQStiif22uSA6iNxPGCGsXsRyeLHzeLbJL2y8CnYuNe',
            ),
            TSignature(),
        );
    });

    describe('[E2E] - Michelson compilation (List)', () => {
        verifyLiteral('List', List([Nat(1), Nat(2)]), TList(TNat()));
        verifyLiteral('Set', Set([Nat(1), Nat(2)]), TSet(TNat()));
        verifyLiteral(
            'Complex list',
            List([
                Record({
                    from_: Address('tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN'),
                    txs: List([
                        Record({
                            to_: Address('KT1JehYdejjvFf1BqdXzTPt1QWqqSd3xS4JF'),
                            token_id: Nat(0),
                            amount: Nat(10),
                        }),
                    ]),
                }),
            ]),
            TList(
                TRecord({
                    from_: TAddress(),
                    txs: TList(
                        TRecord({
                            to_: TAddress(),
                            token_id: TNat(),
                            amount: TNat(),
                        }),
                    ),
                }),
            ),
        );
    });

    describe('[E2E] - Michelson compilation (Option)', () => {
        verifyLiteral('Some', Some(Nat(1)), TOption(TNat()));
        verifyLiteral('None', None(), TOption(TNat()));
    });

    describe('[E2E] - Michelson compilation (Pair)', () => {
        verifyLiteral('Simple', Pair(Nat(1), Unit()), TPair(TNat(), TUnit()));
        verifyLiteral(
            'Nested',
            Pair(Nat(1), Pair(Nat(1), Pair(Bool(false), String('Test')))),
            TPair(TNat(), TPair(TNat(), TPair(TBool(), TString()))),
        );
    });

    describe('[E2E] - Michelson compilation (Record)', () => {
        verifyLiteral(
            'Left Comb Layout',
            Record(
                {
                    field1: Nat(1),
                    field2: Nat(2),
                    field3: Nat(3),
                },
                [['field1', 'field2'], 'field3'],
            ),
            TRecord(
                {
                    field1: TNat(),
                    field2: TNat(),
                    field3: TNat(),
                },
                [['field1', 'field2'], 'field3'],
            ),
        );
        verifyLiteral(
            'Balanced Layout',
            Record(
                {
                    field1: Nat(1),
                    field2: Nat(2),
                    field3: Nat(3),
                    field4: Nat(4),
                },
                [
                    ['field1', 'field2'],
                    ['field3', 'field4'],
                ],
            ),
            TRecord(
                {
                    field1: TNat(),
                    field2: TNat(),
                    field3: TNat(),
                    field4: TNat(),
                },

                [
                    ['field1', 'field2'],
                    ['field3', 'field4'],
                ],
            ),
        );
        verifyLiteral(
            'Right Comb Layout',
            Record({
                field1: Nat(1),
                field2: Nat(2),
                field3: Nat(3),
            }),
            TRecord({
                field1: TNat(),
                field2: TNat(),
                field3: TNat(),
            }),
        );
    });

    describe('[E2E] - Michelson compilation (Variant)', () => {
        verifyLiteral('Left', Left(Bytes('0x00')), TOr(TBytes(), TBool()));
        verifyLiteral('Right', Right(Bool(true)), TOr(TBytes(), TBool()));
        verifyLiteral('Right Left', Right(Left(Bytes('0x00'))), TOr(TBytes(), TOr(TBytes(), TBool())));
        verifyLiteral('Right Right', Right(Right(Bool(true))), TOr(TBytes(), TOr(TBytes(), TBool())));
        verifyLiteral(
            'Left Comb Layout',
            Variant(
                'match2',
                Bytes('0x00'),
                TVariant(
                    {
                        match1: TNat(),
                        match2: TBytes(),
                        match3: TInt(),
                    },
                    [['match1', 'match2'], 'match3'],
                ),
            ),
            TVariant(
                {
                    match1: TNat(),
                    match2: TBytes(),
                    match3: TInt(),
                },
                [['match1', 'match2'], 'match3'],
            ),
        );
        verifyLiteral(
            'Balanced Layout',
            Variant(
                'match3',
                Int(1),
                TVariant(
                    {
                        match1: TNat(),
                        match2: TBytes(),
                        match3: TInt(),
                        match4: TString(),
                    },
                    [
                        ['match1', 'match2'],
                        ['match3', 'match4'],
                    ],
                ),
            ),
            TVariant(
                {
                    match1: TNat(),
                    match2: TBytes(),
                    match3: TInt(),
                    match4: TString(),
                },
                [
                    ['match1', 'match2'],
                    ['match3', 'match4'],
                ],
            ),
        );
        verifyLiteral(
            'Right Comb Layout',
            Variant(
                'match3',
                Int(1),
                TVariant({
                    match1: TNat(),
                    match2: TBytes(),
                    match3: TInt(),
                }),
            ),
            TVariant({
                match1: TNat(),
                match2: TBytes(),
                match3: TInt(),
            }),
        );
    });

    describe('[E2E] - Michelson compilation (Maps)', () => {
        verifyLiteral(
            'Map',
            Map([
                [Nat(1), String('VALUE1')],
                [Nat(2), String('VALUE2')],
            ]),
            TMap(TNat(), TString()),
        );
        // big_map prim cannot be used with "PUSH <big_map>"
        it('Big Map', () => {
            const literal = Big_map([
                [String('KEY1'), Nat(1)],
                [String('KEY2'), Nat(2)],
            ]);
            const value = literal.toMicheline();
            const type = TBig_map(TString(), TNat()).toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        verifyLiteral(
            'Complex map',
            Map([
                [
                    Nat(1),
                    Record({
                        from_: Address('tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN'),
                        txs: List([
                            Record({
                                to_: Address('KT1JehYdejjvFf1BqdXzTPt1QWqqSd3xS4JF'),
                                token_id: Nat(0),
                                amount: Nat(10),
                            }),
                        ]),
                    }),
                ],
            ]),
            TMap(
                TNat(),
                TRecord({
                    from_: TAddress(),
                    txs: TList(
                        TRecord({
                            to_: TAddress(),
                            token_id: TNat(),
                            amount: TNat(),
                        }),
                    ),
                }),
            ),
        );
    });

    describe('[E2E] - Michelson compilation (Lambda)', () => {
        verifyLiteral(
            'Lambda',
            Lambda([
                {
                    prim: 'DROP',
                },
                {
                    prim: 'LAMBDA',
                    args: [
                        {
                            prim: 'nat',
                        },
                        {
                            prim: 'bool',
                        },
                        [
                            {
                                prim: 'DROP',
                            },
                            {
                                prim: 'PUSH',
                                args: [
                                    {
                                        prim: 'bool',
                                    },
                                    {
                                        prim: 'True',
                                    },
                                ],
                            },
                        ],
                    ],
                },
            ]),
            TLambda(TNat(), TLambda(TNat(), TBool())),
        );
        verifyLiteral(
            'Lambda with IF control',
            Lambda([
                {
                    prim: 'IF',
                    args: [
                        [{ prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] }],
                        [{ prim: 'PUSH', args: [{ prim: 'unit' }, { prim: 'Unit' }] }],
                    ],
                },
            ]),
            TLambda(TBool(), TUnit()),
        );
    });
};
