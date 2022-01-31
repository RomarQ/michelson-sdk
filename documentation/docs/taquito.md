# Using with Taquito

## Install dependencies

```shell
npm install @tezwell/michelson-sdk @taquito/taquito @taquito/signer
```

## Interact with an FA2 contract

### transfer

```ts
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { Record, Address, List, Nat } from '@tezwell/michelson-sdk/literal';

const Tezos = new TezosToolkit('https://ithacanet.visualtez.com');

Tezos.setProvider({
  signer: new InMemorySigner('edskS83aZUK3ijLrW5tTs1sDY3qLjSsMGyebKKLWP4RXSBh4LCivG2s1TezyZB5rEvvdqepXMg1MLcfBhS8VSJESN7L27hDpsX')
});

const parameters = List(
    [
        Record({
            from_: Address("tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN"),
            txs: List(
                [
                    Record({
                        to_: Address("KT1JehYdejjvFf1BqdXzTPt1QWqqSd3xS4JF"),
                        token_id: Nat(0),
                        amount: Nat(10),
                    })
                ]
            ),
        })
    ]
).toJSON();

Tezos.contract.transfer({
    to: "KT1JehYdejjvFf1BqdXzTPt1QWqqSd3xS4JF",
    amount: 0,
    parameter: {
        entrypoint: "transfer",
        value: parameters
    },
})
.then((op) => {
    console.log(`Waiting for ${op.hash} to be confirmed...`);
    return op.confirmation(1).then(() => op.hash);
})
.then((hash) => console.log("Operation injected: ", hash))
.catch((error) => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`));
```

### balance_of

```ts
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { Record, Address, List, Nat, Contract } from '@tezwell/michelson-sdk/literal';

const Tezos = new TezosToolkit('https://ithacanet.visualtez.com');

Tezos.setProvider({
  signer: new InMemorySigner('edskS83aZUK3ijLrW5tTs1sDY3qLjSsMGyebKKLWP4RXSBh4LCivG2s1TezyZB5rEvvdqepXMg1MLcfBhS8VSJESN7L27hDpsX')
});

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

Tezos.contract.transfer({
    to: "KT1JehYdejjvFf1BqdXzTPt1QWqqSd3xS4JF",
    amount: 0,
    parameter: {
        entrypoint: "balance_of",
        value: parameters
    },
})
.then((op) => {
    console.log(`Waiting for ${op.hash} to be confirmed...`);
    return op.confirmation(1).then(() => op.hash);
})
.then((hash) => console.log("Operation injected: ", hash))
.catch((error) => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`));
```

### update_operators

```ts
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { Record, Address, List, Nat, Variant } from '@tezwell/michelson-sdk/literal';
import { TRecord, TAddress, TNat, TVariant } from '@tezwell/michelson-sdk/type';

const Tezos = new TezosToolkit('https://ithacanet.visualtez.com');

Tezos.setProvider({
  signer: new InMemorySigner('edskS83aZUK3ijLrW5tTs1sDY3qLjSsMGyebKKLWP4RXSBh4LCivG2s1TezyZB5rEvvdqepXMg1MLcfBhS8VSJESN7L27hDpsX')
});

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

Tezos.contract.transfer({
    to: "KT1JehYdejjvFf1BqdXzTPt1QWqqSd3xS4JF",
    amount: 0,
    parameter: {
        entrypoint: "update_operators",
        value: parameters
    },
})
.then((op) => {
    console.log(`Waiting for ${op.hash} to be confirmed...`);
    return op.confirmation(1).then(() => op.hash);
})
.then((hash) => console.log("Operation injected: ", hash))
.catch((error) => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`));
```
