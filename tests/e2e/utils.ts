import { execSync } from 'child_process';
import path from 'path';
import { Michelson_LiteralUnion } from '../../src/core';

export const TEZOS_CLIENT_CMD = './tests/e2e/tezos-binaries/tezos-client';

export const startMockup = () => {
    try {
        execSync(path.resolve('./tests/e2e/scripts/bootstrap-mockup.sh'));
        console.info('Mockup bootstrapped...');
    } catch (e) {
        console.error(e);
    }
};

export const stopMockup = () => {
    try {
        execSync(path.resolve('./tests/e2e/scripts/teardown.sh'));
        console.info('Teardown...');
    } catch (e) {
        console.error(e);
    }
};

export const convertMichelsonToJSON = (value: string, type: string) => {
    const parameters = `--mode mockup --base-dir _build/mockup convert data ${value} from michelson to json --type "${type}"`;
    return execSync(`${path.resolve(TEZOS_CLIENT_CMD)} ${parameters}`).toString('utf-8');
};

export const convertContractToJSON = (contract: string) => {
    const parameters = `--mode mockup --base-dir _build/mockup convert script '${contract}' from michelson to json`;
    return execSync(`${path.resolve(TEZOS_CLIENT_CMD)} ${parameters}`).toString('utf-8');
};

export const buildTesterContract = (literal: Michelson_LiteralUnion) => {
    const michelineType = literal.type.toMicheline();
    const michelineValue = literal.toMicheline();
    const jsonType = literal.type.toJSON();
    const jsonValue = literal.toJSON();
    return {
        micheline:
            `storage ${michelineType};\n` +
            'parameter unit;\n' +
            'code {\n' +
            '  DROP;\n' +
            `  PUSH ${michelineType} ${michelineValue};\n` +
            '  NIL operation;\n' +
            '  PAIR;\n' +
            '};',
        json: [
            { prim: 'storage', args: [jsonType] },
            { prim: 'parameter', args: [{ prim: 'unit' }] },
            {
                prim: 'code',
                args: [
                    [
                        { prim: 'DROP' },
                        { prim: 'PUSH', args: [jsonType, jsonValue] },
                        { prim: 'NIL', args: [{ prim: 'operation' }] },
                        { prim: 'PAIR' },
                    ],
                ],
            },
        ],
    };
};
