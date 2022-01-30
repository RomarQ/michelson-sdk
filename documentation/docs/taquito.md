# Using with Taquito

```ts
const { TezosToolkit } = require('@taquito/taquito');
const { InMemorySigner } = require('@taquito/signer');
const { Record, Address, List, Nat } = require('@tezwell/michelson-sdk/literal');
const { TRecord, TAddress, TList, TNat } = require('@tezwell/michelson-sdk/type');

const Tezos = new TezosToolkit('https://ithacanet.visualtez.com');

Tezos.setProvider({
  signer: new InMemorySigner('edskS83aZUK3ijLrW5tTs1sDY3qLjSsMGyebKKLWP4RXSBh4LCivG2s1TezyZB5rEvvdqepXMg1MLcfBhS8VSJESN7L27hDpsX')
});

const transferParameters = List(
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
                ],
                TRecord({
                    to_: TAddress(),
                    token_id: TNat(),
                    amount: TNat(),
                })
            ),
        })
    ],
    TRecord({
        from_: TAddress(),
        txs: TList(
            TRecord({
                to_: TAddress(),
                token_id: TNat(),
                amount: TNat(),
            })
        )
    })
).toJSON();

Tezos.contract.transfer({
    to: "KT1JehYdejjvFf1BqdXzTPt1QWqqSd3xS4JF",
    amount: 0,
    parameter: {
        entrypoint: "transfer",
        value: transferParameters
    },
})
.then((op) => {
    console.log(`Waiting for ${op.hash} to be confirmed...`);
    return op.confirmation(1).then(() => op.hash);
})
.then((hash) => console.log(`Operation injected: https://hangzhou.tzstats.com/${hash}`))
.catch((error) => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`));

```
