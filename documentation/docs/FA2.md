# FA2 Interface

## Entrypoint Parameter

### transfer

- [Using Taquito](./taquito#transfer)
- [Using ConseilJS](./conseiljs#transfer)

```ts
const { Record, Address, List, Nat } = require('@tezwell/michelson-sdk/literal');

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
```

### balance_of

- [Using Taquito](./taquito#balance_of)
- [Using ConseilJS](./conseiljs#balance_of)

```ts
const { Record, Address, List, Nat } = require('@tezwell/michelson-sdk/literal');

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
```

### update_operators

- [Using Taquito](./taquito#update_operators)
- [Using ConseilJS](./conseiljs#update_operators)

```ts
const { Record, Address, List, Nat, Variant } = require('@tezwell/michelson-sdk/literal');
const { TRecord, TAddress, TNat, TVariant } = require('@tezwell/michelson-sdk/type');

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
```
