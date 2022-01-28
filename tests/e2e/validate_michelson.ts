import {
    Address,
    Bool,
    Bytes,
    Chain_id,
    Int,
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
    Set,
    Bls12_381_fr,
    Bls12_381_g2,
    Bls12_381_g1,
    Key,
    Signature,
    Key_hash,
    Map,
    Big_map,
    Michelson_LiteralUnion,
} from '../../src/core/literal';
import { TNat, TString } from '../../src/core/type';
import { buildTesterContract, convertContractToJSON, convertMichelsonToJSON } from './utils';

const verifyLiteral = (testName: string, lit: Michelson_LiteralUnion) => {
    it(testName, () => {
        const { micheline, json } = buildTesterContract(lit);
        const jsonResult = convertContractToJSON(micheline);
        expect([micheline, json]).toMatchSnapshot();
        expect(json).toEqual(JSON.parse(jsonResult));
    });
};

export const runTests = () => {
    describe('[E2E] - Michelson compilation (Singleton Literals)', () => {
        verifyLiteral('Nat', Nat(1));
        verifyLiteral('Int', Int(2));
        verifyLiteral('Mutez', Mutez(10));
        verifyLiteral('String', String('Hello World'));
        verifyLiteral('Bool (True)', Bool(true));
        verifyLiteral('Bool (False)', Bool(false));
        verifyLiteral('Bytes', Bytes('0xFFFF'));
        verifyLiteral('Address', Address('tz28QJHLyqvaY2rXAoFZTbxrXeD88NA8wscC'));
        verifyLiteral('Timestamp (string)', Timestamp('2019-09-26T10:59:51Z'));
        verifyLiteral('Timestamp (number)', Timestamp(1571659294));
        verifyLiteral('ChainID (string)', Chain_id('NetXynUjJNZm7wi'));
        verifyLiteral('ChainID (bytes)', Chain_id('0x7a06a770'));
        verifyLiteral('Unit', Unit());
        verifyLiteral('Bls12_381_fr (bytes)', Bls12_381_fr('0x0001'));
        verifyLiteral('Bls12_381_fr (number)', Bls12_381_fr(1));
        verifyLiteral(
            'Bls12_381_g1',
            Bls12_381_g1(
                '0x0572cbea904d67468808c8eb50a9450c9721db309128012543902d0ac358a62ae28f75bb8f1c7c42c39a8c5529bf0f4e166a9d8cabc673a322fda673779d8e3822ba3ecb8670e461f73bb9021d5fd76a4c56d9d4cd16bd1bba86881979749d28',
            ),
        );
        verifyLiteral(
            'Bls12_381_g2',
            Bls12_381_g2(
                '0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb813fa4d4a0ad8b1ce186ed5061789213d993923066dddaf1040bc3ff59f825c78df74f2d75467e25e0f55f8a00fa030ed0d1b3cc2c7027888be51d9ef691d77bcb679afda66c73f17f9ee3837a55024f78c71363275a75d75d86bab79f74782aa',
            ),
        );
        verifyLiteral('Key', Key('edpku3g7CeTEvSKhxipD4Q2B6EiEP8cR323u8PFmGFgKRVRvCneEmT'));
        verifyLiteral('Key hash', Key_hash('tz28QJHLyqvaY2rXAoFZTbxrXeD88NA8wscC'));
        verifyLiteral(
            'Signature',
            Signature(
                'sigsAujsNePapNNGsVotTvcKWMNNJja9B4a2FfAe8vExzFhEgEo1GTQStiif22uSA6iNxPGCGsXsRyeLHzeLbJL2y8CnYuNe',
            ),
        );
    });

    describe('[E2E] - Michelson compilation (List)', () => {
        verifyLiteral('List', List([Nat(1), Nat(2)], TNat()));
        verifyLiteral('Set', Set([Nat(1), Nat(2)], TNat()));
    });

    describe('[E2E] - Michelson compilation (Option)', () => {
        verifyLiteral('Some', Some(Nat(1)));
        verifyLiteral('None', None(TNat()));
    });

    describe('[E2E] - Michelson compilation (Pair)', () => {
        verifyLiteral('Simple', Pair(Nat(1), Unit()));
        verifyLiteral('Nested', Pair(Nat(1), Pair(Nat(1), Pair(Bool(false), String('Test')))));
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
        );
        verifyLiteral(
            'Right Comb Layout',
            Record({
                field1: Nat(1),
                field2: Nat(2),
                field3: Nat(3),
            }),
        );
    });

    describe('[E2E] - Michelson compilation (Maps)', () => {
        verifyLiteral(
            'Map',
            Map(
                [
                    [Nat(1), String('VALUE1')],
                    [Nat(2), String('VALUE2')],
                ],
                TNat(),
                TString(),
            ),
        );
        // big_map prim cannot be used with "PUSH <big_map>"
        it('Big Map', () => {
            const literal = Big_map(
                [
                    [String('KEY1'), Nat(1)],
                    [String('KEY2'), Nat(2)],
                ],
                TString(),
                TNat(),
            );
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
    });
};
