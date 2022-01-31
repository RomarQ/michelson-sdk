import type { IType } from '../../src/typings';
import {
    TAddress,
    TBool,
    TBytes,
    TChain_id,
    TContract,
    TInt,
    TLambda,
    TList,
    TNat,
    TNever,
    TOperation,
    TOr,
    TRecord,
    TSapling_state,
    TSapling_transaction,
    TTicket,
    TUnit,
    TVariant,
} from '../../src/type';
import { buildTypeTesterContract, convertContractToJSON } from './utils';

const verifyType = (testName: string, type: IType) => {
    it(testName, () => {
        const { micheline, json } = buildTypeTesterContract(type);
        const jsonResult = convertContractToJSON(micheline);
        expect([micheline, json]).toMatchSnapshot();
        expect(json).toEqual(JSON.parse(jsonResult));
    });
};

export const runTests = () => {
    describe('[E2E] - Artificial types', () => {
        verifyType(
            'variant',
            TVariant({
                branch1: TNat(),
                branch2: TInt(),
                branch3: TBytes(),
            }),
        );
        verifyType(
            'record',
            TRecord({
                field1: TNat(),
                field2: TInt(),
                field3: TBytes(),
            }),
        );
    });
    describe('[E2E] - Michelson types with no literals', () => {
        verifyType('ticket', TTicket(TNat()));
        verifyType('never', TNever());
        verifyType('contract', TContract(TInt()));
        verifyType('sapling_state', TSapling_state(1));
        verifyType('sapling_transaction', TSapling_transaction(1));
        verifyType('or', TOr(TBytes(), TUnit()));
        verifyType('or (nested)', TOr(TNat(), TOr(TBool(), TChain_id())));
        verifyType('lambda', TLambda(TBool(), TChain_id()));
        verifyType(
            'contract',
            TContract(
                TList(
                    TRecord({
                        request: TRecord({
                            owner: TAddress(),
                            token_id: TNat(),
                        }),
                        balance: TNat(),
                    }),
                ),
            ),
        );

        it('operation', () => {
            const micheline =
                `storage unit;\n` +
                'parameter unit;\n' +
                'code {\n' +
                '  CDR;\n' +
                `  NIL ${TOperation().toMicheline()};\n` +
                '  PAIR;\n' +
                '};';
            const json = [
                { prim: 'storage', args: [{ prim: 'unit' }] },
                { prim: 'parameter', args: [{ prim: 'unit' }] },
                {
                    prim: 'code',
                    args: [[{ prim: 'CDR' }, { prim: 'NIL', args: [TOperation().toJSON()] }, { prim: 'PAIR' }]],
                },
            ];
            const jsonResult = convertContractToJSON(micheline);
            expect([micheline, json]).toMatchSnapshot();
            expect(json).toEqual(JSON.parse(jsonResult));
        });
    });
};
