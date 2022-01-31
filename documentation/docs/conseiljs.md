# Using with ConseilJS

## Install dependencies

```shell
npm install @tezwell/michelson-sdk conseiljs conseiljs-softsigner node-fetch loglevel
```

## Interact with an FA2 contract

### transfer

```ts
import fetch from 'node-fetch';
import log from 'loglevel';

import { registerFetch, registerLogger, TezosMessageUtils, TezosParameterFormat, TezosNodeWriter } from 'conseiljs';
import { KeyStoreUtils, SoftSigner  } from 'conseiljs-softsigner';
import { Record, Address, List, Nat } from '@tezwell/michelson-sdk/literal';

const logger = log.getLogger('conseiljs');
logger.setLevel('debug', false); // to see only errors, set to 'error'
registerLogger(logger);
registerFetch(fetch);

const RPC = 'https://ithacanet.visualtez.com';
const contract = 'KT1JehYdejjvFf1BqdXzTPt1QWqqSd3xS4JF'

const parameters = List(
    [
        Record({
            from_: Address('tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN'),
            txs: List(
                [
                    Record({
                        to_: Address('KT1JehYdejjvFf1BqdXzTPt1QWqqSd3xS4JF'),
                        token_id: Nat(0),
                        amount: Nat(10),
                    })
                ]
            ),
        })
    ]
).toJSON();

(async () => {
    const keyStore = await KeyStoreUtils.restoreIdentityFromSecretKey('edskS83aZUK3ijLrW5tTs1sDY3qLjSsMGyebKKLWP4RXSBh4LCivG2s1TezyZB5rEvvdqepXMg1MLcfBhS8VSJESN7L27hDpsX');
    const signer = await SoftSigner.createSigner(TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'), -1);

    const result = await TezosNodeWriter.sendContractInvocationOperation(
        RPC,
        signer,
        keyStore,
        contract,
        10_000,
        100_000,
        10_000,
        100_000,
        'transfer',
        JSON.stringify(parameters),
        TezosParameterFormat.Micheline
    );
    console.log("Injected operation: ", result.operationGroupID);
})();
```

### balance_of

```ts
import fetch from 'node-fetch';
import log from 'loglevel';

import { registerFetch, registerLogger, TezosMessageUtils, TezosParameterFormat, TezosNodeWriter } from 'conseiljs';
import { KeyStoreUtils, SoftSigner  } from 'conseiljs-softsigner';
import { Record, Address, List, Nat, Contract } from '@tezwell/michelson-sdk/literal';

const logger = log.getLogger('conseiljs');
logger.setLevel('debug', false); // to see only errors, set to 'error'
registerLogger(logger);
registerFetch(fetch);

const RPC = 'https://ithacanet.visualtez.com';
const contract = 'KT1JehYdejjvFf1BqdXzTPt1QWqqSd3xS4JF'

const parameters = Record({
    requests: List(
        [
            Record({
                owner: Address("KT1JehYdejjvFf1BqdXzTPt1QWqqSd3xS4JF"),
                token_id: Nat(0)
            }),
            Record({
                owner: Address("tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN"),
                token_id: Nat(0)
            })
        ]
    ),
    callback: Contract("KT1SiSomCunxkq3g7vQKYpPpWBHodhH5pJkU", "receive_balances")
}).toJSON();

(async () => {
    const keyStore = await KeyStoreUtils.restoreIdentityFromSecretKey('edskS83aZUK3ijLrW5tTs1sDY3qLjSsMGyebKKLWP4RXSBh4LCivG2s1TezyZB5rEvvdqepXMg1MLcfBhS8VSJESN7L27hDpsX');
    const signer = await SoftSigner.createSigner(TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'), -1);

    const result = await TezosNodeWriter.sendContractInvocationOperation(
        RPC,
        signer,
        keyStore,
        contract,
        10_000,
        100_000,
        10_000,
        100_000,
        'balance_of',
        JSON.stringify(parameters),
        TezosParameterFormat.Micheline
    );
    console.log("Injected operation: ", result.operationGroupID);
})();
```

### update_operators

```ts
import fetch from 'node-fetch';
import log from 'loglevel';

import { registerFetch, registerLogger, TezosMessageUtils, TezosParameterFormat, TezosNodeWriter } from 'conseiljs';
import { KeyStoreUtils, SoftSigner  } from 'conseiljs-softsigner';
import { Record, Address, List, Nat, Variant } from '@tezwell/michelson-sdk/literal';
import { TRecord, TAddress, TNat, TVariant } from '@tezwell/michelson-sdk/type';

const logger = log.getLogger('conseiljs');
logger.setLevel('debug', false); // to see only errors, set to 'error'
registerLogger(logger);
registerFetch(fetch);

const RPC = 'https://ithacanet.visualtez.com';
const contract = 'KT1JehYdejjvFf1BqdXzTPt1QWqqSd3xS4JF'

const VariantType = TVariant({
    add_operator: TRecord({
        owner: TAddress(),
        operator: TAddress(),
        token_id: TNat(),
    }),
    remove_operator: TRecord({
        owner: TAddress(),
        operator: TAddress(),
        token_id: TNat(),
    })
});
const parameters = List(
    [
        Variant(
            "add_operator",
            Record({
                owner: Address("tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN"),
                operator: Address("KT1JehYdejjvFf1BqdXzTPt1QWqqSd3xS4JF"),
                token_id: Nat(0),
            }),
            VariantType
        ),
        Variant(
            "remove_operator",
            Record({
                owner: Address("tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN"),
                operator: Address("KT1JehYdejjvFf1BqdXzTPt1QWqqSd3xS4JF"),
                token_id: Nat(0),
            }),
            VariantType
        )
    ]
).toJSON();

(async () => {
    const keyStore = await KeyStoreUtils.restoreIdentityFromSecretKey('edskS83aZUK3ijLrW5tTs1sDY3qLjSsMGyebKKLWP4RXSBh4LCivG2s1TezyZB5rEvvdqepXMg1MLcfBhS8VSJESN7L27hDpsX');
    const signer = await SoftSigner.createSigner(TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'), -1);

    const result = await TezosNodeWriter.sendContractInvocationOperation(
        RPC,
        signer,
        keyStore,
        contract,
        10_000,
        100_000,
        10_000,
        100_000,
        'update_operators',
        JSON.stringify(parameters),
        TezosParameterFormat.Micheline
    );
    console.log("Injected operation: ", result.operationGroupID);
})();
```
