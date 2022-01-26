import path from 'path';
import { execSync } from 'child_process';
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
} from '../../src/core/literal';
import { TNat, TString } from '../../src/core/type';

const TEZOS_CLIENT_CMD = './tests/e2e/tezos-binaries/tezos-client';

const convertMichelsonToJSON = (value: string, type: string) =>
    execSync(
        `${path.resolve(
            TEZOS_CLIENT_CMD,
        )} --mode mockup --base-dir _build/mockup convert data ${value} from michelson to json --type "${type}"
`,
    ).toString('utf-8');

if (process.platform == 'linux') {
    beforeAll(() => {
        try {
            execSync(path.resolve('./tests/e2e/scripts/bootstrap-mockup.sh'));
            console.info('Mockup bootstrapped...');
        } catch (e) {
            console.error(e);
        }
    });
    afterAll(() => {
        try {
            execSync(path.resolve('./tests/e2e/scripts/teardown.sh'));
            console.info('Teardown...');
        } catch (e) {
            console.error(e);
        }
    });

    describe('[E2E] - Michelson compilation (Singleton Literals)', () => {
        it('Nat', () => {
            const literal = Nat(1);
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(value, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Int', () => {
            const literal = Int(2);
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(value, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Mutez', () => {
            const literal = Mutez(10);
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(value, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('String', () => {
            const literal = String('Hello World');
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Bool (True)', () => {
            const literal = Bool(true);
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(value, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Bool (False)', () => {
            const literal = Bool(false);
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(value, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Bytes', () => {
            const literal = Bytes('0xFFFF');
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(value, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Address', () => {
            const literal = Address('tz28QJHLyqvaY2rXAoFZTbxrXeD88NA8wscC');
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Timestamp (string)', () => {
            const literal = Timestamp('2019-09-26T10:59:51Z');
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Timestamp (number)', () => {
            const literal = Timestamp(1571659294);
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(value, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('ChainID (string)', () => {
            const literal = Chain_id('NetXynUjJNZm7wi');
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('ChainID (bytes)', () => {
            const literal = Chain_id('0x7a06a770');
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(value, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Unit', () => {
            const literal = Unit();
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Bls12_381_fr (bytes)', () => {
            const literal = Bls12_381_fr('0x0001');
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Bls12_381_fr (number)', () => {
            const literal = Bls12_381_fr(1);
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Bls12_381_g1', () => {
            const literal = Bls12_381_g1(
                '0x0572cbea904d67468808c8eb50a9450c9721db309128012543902d0ac358a62ae28f75bb8f1c7c42c39a8c5529bf0f4e166a9d8cabc673a322fda673779d8e3822ba3ecb8670e461f73bb9021d5fd76a4c56d9d4cd16bd1bba86881979749d28',
            );
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Bls12_381_g2', () => {
            const literal = Bls12_381_g2(
                '0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb813fa4d4a0ad8b1ce186ed5061789213d993923066dddaf1040bc3ff59f825c78df74f2d75467e25e0f55f8a00fa030ed0d1b3cc2c7027888be51d9ef691d77bcb679afda66c73f17f9ee3837a55024f78c71363275a75d75d86bab79f74782aa',
            );
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Key', () => {
            const literal = Key('edpku3g7CeTEvSKhxipD4Q2B6EiEP8cR323u8PFmGFgKRVRvCneEmT');
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Key hash', () => {
            const literal = Key_hash('tz28QJHLyqvaY2rXAoFZTbxrXeD88NA8wscC');
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Signature', () => {
            const literal = Signature(
                'sigsAujsNePapNNGsVotTvcKWMNNJja9B4a2FfAe8vExzFhEgEo1GTQStiif22uSA6iNxPGCGsXsRyeLHzeLbJL2y8CnYuNe',
            );
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
    });

    describe('[E2E] - Michelson compilation (List)', () => {
        it('List', () => {
            const literal = List([Nat(1), Nat(2)], TNat());
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`"${value}"`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Set', () => {
            const literal = Set([Nat(1), Nat(2)], TNat());
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`"${value}"`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
    });

    describe('[E2E] - Michelson compilation (Option)', () => {
        it('Some', () => {
            const literal = Some(Nat(1));
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('None', () => {
            const literal = None(TNat());
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
    });

    describe('[E2E] - Michelson compilation (Pair)', () => {
        it('Simple', () => {
            const literal = Pair(Nat(1), Unit());

            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);
            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Nested', () => {
            const literal = Pair(Nat(1), Pair(Bool(false), String('Test')));

            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);
            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
    });

    describe('[E2E] - Michelson compilation (Record)', () => {
        it('Left Comb Layout', () => {
            const literal = Record(
                {
                    field1: Nat(1),
                    field2: Nat(2),
                    field3: Nat(3),
                },
                [['field1', 'field2'], 'field3'],
            );
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);
            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Balanced Layout', () => {
            const literal = Record(
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
            );
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);
            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Right Comb Layout', () => {
            const literal = Record({
                field1: Nat(1),
                field2: Nat(2),
                field3: Nat(3),
            });
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);
            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
    });

    describe('[E2E] - Michelson compilation (Maps)', () => {
        it('Map', () => {
            const literal = Map(
                [
                    [Nat(1), String('VALUE1')],
                    [Nat(2), String('VALUE2')],
                ],
                TNat(),
                TString(),
            );
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
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
}
