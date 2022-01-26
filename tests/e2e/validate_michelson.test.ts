import path from 'path';
import { execSync } from 'child_process';
import {
    Address,
    Bool,
    Bytes,
    ChainID,
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
} from '../../src/core/literal';
import { TNat } from '../../src/core/type';

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
            const literal = ChainID('NetXynUjJNZm7wi');
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`'${value}'`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('ChainID (bytes)', () => {
            const literal = ChainID('0x7a06a770');
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
    });

    describe('[E2E] - Michelson compilation (List)', () => {
        it('List', () => {
            const literal = List([Nat(1), Nat(2)], TNat);
            const value = literal.toMicheline();
            const type = literal.type.toMicheline();
            const jsonValue = literal.toJSON();

            const result = convertMichelsonToJSON(`"${value}"`, type);

            expect(jsonValue).toEqual(JSON.parse(result));
            expect(jsonValue).toMatchSnapshot();
        });
        it('Set', () => {
            const literal = Set([Nat(1), Nat(2)], TNat);
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
            const literal = None(TNat);
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
}
