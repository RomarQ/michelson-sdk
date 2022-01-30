# Type Reference

Official [Michelson type reference](https://tezos.gitlab.io/michelson-reference/#type-reference)

## Singleton types

### nat

Naturals are arbitrary-precision, meaning that the only size limit is gas.

```ts
const { TNat } = require('@tezwell/michelson-sdk');

const nat_type = TNat();

// Micheline
console.log(nat_type.toMicheline());      // nat
// JSON
console.log(nat_type.toJSON());           // { prim: 'nat' }
```

### int

Integers are arbitrary-precision, meaning that the only size limit is gas.

```ts
const { TInt } = require('@tezwell/michelson-sdk');

const int_type = TInt();

// Micheline
console.log(int_type.toMicheline());      // int
// JSON
console.log(int_type.toJSON());           // { prim: 'int' }
```

### mutez

Mutez (micro-Tez) are internally represented by **64-bit** signed integers. These are restricted to prevent creating a negative amount of mutez.

```ts
const { TMutez } = require('@tezwell/michelson-sdk');

const mutez_type = TMutez();

// Micheline
console.log(mutez_type.toMicheline());      // mutez
// JSON
console.log(mutez_type.toJSON());           // { prim: 'mutez' }
```

### string

The current version of Michelson restricts strings to be the printable subset of **7-bit ASCII**, namely characters with codes from within [32, 126] range, plus the following escape characters `\n`, `\\`, `\"`.

```ts
const { TString } = require('@tezwell/michelson-sdk');

const string_type = TString();

// Micheline
console.log(string_type.toMicheline());      // string
// JSON
console.log(string_type.toJSON());           // { prim: 'string' }
```

### bool

The type for booleans whose values are `True` and `False`.

```ts
const { TBool } = require('@tezwell/michelson-sdk');

const bool_type = TBool();

// Micheline
console.log(bool_type.toMicheline());      // bool
// JSON
console.log(bool_type.toJSON());           // { prim: 'bool' }
```

### bytes

Bytes are used for serializing data, in order to check signatures and compute hashes on them. They can also be used to incorporate data from the wild and untyped outside world.

```ts
const { TBytes } = require('@tezwell/michelson-sdk');

const bytes_type = TBytes();

// Micheline
console.log(bytes_type.toMicheline());      // bytes
// JSON
console.log(bytes_type.toJSON());           // { prim: 'bytes' }
```

### address

The type `address` gives the guarantee that the value has the form of a Tezos address, as opposed to contract that guarantees that the value is indeed a valid, existing account.

A valid Tezos address is a string prefixed by either `tz1`, `tz2`, `tz3` or `KT1` and followed by a Base58 encoded hash and terminated by a 4-byte checksum.

The prefix designates the type of address:

- **`tz1`** addresses are followed by a ed25519 public key hash
- **`tz2`** addresses are followed by a Secp256k1 public key hash
- **`tz3`** addresses are followed by a NIST p256r1 public key hash
- **`KT1`** addresses are followed by a contract hash

Addresses prefixed by tz1, tz2 and tz3 designate implicit accounts, whereas those prefixed KT1 designate originated accounts.

Addresses can also specify an entrypoint, with a `%<entrypoint_name>` suffix.

```ts
const { TAddress } = require('@tezwell/michelson-sdk');

const address_type = TAddress();

// Micheline
console.log(address_type.toMicheline());      // address
// JSON
console.log(address_type.toJSON());           // { prim: 'address' }
```

### timestamp

The type `timestamp` is used to represent timestamps that are written either using [RFC3339](https://datatracker.ietf.org/doc/html/rfc3339) notation in a string (readable), or as the number of seconds since Epoch in a natural (optimized).

```ts
const { TTimestamp } = require('@tezwell/michelson-sdk');

const timestamp_type = TTimestamp();

// Micheline
console.log(timestamp_type.toMicheline());      // timestamp
// JSON
console.log(timestamp_type.toJSON());           // { prim: 'timestamp' }
```

### chain_id

The type `chain_id` represents an identifier for a chain, used to distinguish the test and the main chains.

```ts
const { TChain_id } = require('@tezwell/michelson-sdk');

const chain_id_type = TChain_id();

// Micheline
console.log(chain_id_type.toMicheline());      // chain_id
// JSON
console.log(chain_id_type.toJSON());           // { prim: 'chain_id' }
```

### bls12_381_fr

The type `bls12_381_fr` represents an element of the scalar field Fr, used for scalar multiplication on the BLS12-381 curves G1 and G2.

```ts
const { TBls12_381_fr } = require('@tezwell/michelson-sdk');

const bls12_381_fr_type = TBls12_381_fr();

// Micheline
console.log(bls12_381_fr_type.toMicheline());      // bls12_381_fr
// JSON
console.log(bls12_381_fr_type.toJSON());           // { prim: 'bls12_381_fr' }
```

### bls12_381_g1

The type `bls12_381_g1` represents a point on the BLS12-381 curve G1.

```ts
const { TBls12_381_g1 } = require('@tezwell/michelson-sdk');

const bls12_381_g1_type = TBls12_381_g1();

// Micheline
console.log(bls12_381_g1_type.toMicheline());      // bls12_381_g1
// JSON
console.log(bls12_381_g1_type.toJSON());           // { prim: 'bls12_381_g1' }
```

### bls12_381_g2

The type `bls12_381_g2` represents a point on the BLS12-381 curve G2.

```ts
const { TBls12_381_g2 } = require('@tezwell/michelson-sdk');

const bls12_381_g2_type = TBls12_381_g2();

// Micheline
console.log(bls12_381_g2_type.toMicheline());      // bls12_381_g2
// JSON
console.log(bls12_381_g2_type.toJSON());           // { prim: 'bls12_381_g2' }
```

### key

The type `key` represents a public cryptographic key.

```ts
const { TKey } = require('@tezwell/michelson-sdk');

const key_type = TKey();

// Micheline
console.log(key_type.toMicheline());      // key
// JSON
console.log(key_type.toJSON());           // { prim: 'key' }
```

### key_hash

The type `key_hash` represents a hash of a public cryptographic key.

```ts
const { TKey_hash } = require('@tezwell/michelson-sdk');

const key_hash_type = TKey_hash();

// Micheline
console.log(key_hash_type.toMicheline());      // key_hash
// JSON
console.log(key_hash_type.toJSON());           // { prim: 'key_hash' }
```

### signature

The type `signature` represents a cryptographic signature.

```ts
const { TSignature } = require('@tezwell/michelson-sdk');

const signature_type = TSignature();

// Micheline
console.log(signature_type.toMicheline());      // signature
// JSON
console.log(signature_type.toJSON());           // { prim: 'signature' }
```

### unit

The type whose only value is Unit, to use as a placeholder when some result or parameter is non-necessary.

```ts
const { TUnit } = require('@tezwell/michelson-sdk');

const unit_type = TUnit();

// Micheline
console.log(unit_type.toMicheline());      // unit
// JSON
console.log(unit_type.toJSON());           // { prim: 'unit' }
```

### operation

The type `operation` represents an internal operation emitted by a contract.

```ts
const { TOperation } = require('@tezwell/michelson-sdk');

const operation_type = TOperation();

// Micheline
console.log(operation_type.toMicheline());      // operation
// JSON
console.log(operation_type.toJSON());           // { prim: 'operation' }
```

### never

The type `never` is used to represent an unreachable branch.

```ts
const { TNever } = require('@tezwell/michelson-sdk');

const never_type = TNever();

// Micheline
console.log(never_type.toMicheline());      // never
// JSON
console.log(never_type.toJSON());           // { prim: 'never' }
```

## Container types

### list

The `list` type reprensents a immutable and homogeneous linked list.

```ts
const { TList, TNat } = require('@tezwell/michelson-sdk');

const list_type = TList(TNat());

// Micheline
console.log(list_type.toMicheline());      // (list nat)
// JSON
console.log(list_type.toJSON());           // { prim: 'list', args: [ { prim: 'nat' } ] }
```

### set

The `set` type is used to represent sequences of unique elements.

```ts
const { TSet, TNat } = require('@tezwell/michelson-sdk');

const set_type = TSet(TNat());

// Micheline
console.log(set_type.toMicheline());      // (set nat)
// JSON
console.log(set_type.toJSON());           // { prim: 'set', args: [ { prim: 'nat' } ] }
```

### option

The `option` type is used to represent an optional value.

```ts
const { TOption, TNat } = require('@tezwell/michelson-sdk');

const option_type = TOption(TNat());

// Micheline
console.log(option_type.toMicheline());      // (option nat)
// JSON
console.log(option_type.toJSON());           // { prim: 'option', args: [ { prim: 'nat' } ] }
```

### pair

The `pair` type represents a binary tuple composed of a left element and a right element.

```ts
const { TPair, TNat, TString } = require('@tezwell/michelson-sdk');

const pair_type = TPair(TString(), TNat());

// Micheline
console.log(pair_type.toMicheline());      // (pair string nat)
// JSON
console.log(pair_type.toJSON());           // { prim: 'pair', args: [ { prim: 'string' }, { prim: 'nat' } ] }
```

### or

The type `or` represents a union of two types. Used for type variance. (e.g. number | string)

```ts
const { TOr, TNat, TString } = require('@tezwell/michelson-sdk');

const or_type = TOr(TString(), TNat());

// Micheline
console.log(or_type.toMicheline());      // (or string nat)
// JSON
console.log(or_type.toJSON());           // { prim: 'or', args: [ { prim: 'string' }, { prim: 'nat' } ] }
```

### map

```ts
const { TMap, TNat, TString } = require('@tezwell/michelson-sdk');

const map_type = TMap(TString(), TNat());

// Micheline
console.log(map_type.toMicheline());      // (map string nat)
// JSON
console.log(map_type.toJSON());           // { prim: 'map', args: [ { prim: 'string' }, { prim: 'nat' } ] }
```

### big_map

The type `big_map` is used to represent lazily deserialized maps.

```ts
const { TBigMap, TNat, TString } = require('@tezwell/michelson-sdk');

const big_map_type = TBigMap(TString(), TNat());

// Micheline
console.log(big_map_type.toMicheline());      // (big_map string nat)
// JSON
console.log(big_map_type.toJSON());           // { prim: 'big_map', args: [ { prim: 'string' }, { prim: 'nat' } ] }
```

### lambda

The type `lambda` represents a function signature.

```ts
const { TLambda, TNat, TString } = require('@tezwell/michelson-sdk');

const lambda_type = TLambda(TString(), TNat());

// Micheline
console.log(lambda_type.toMicheline());      // (lambda string nat)
// JSON
console.log(lambda_type.toJSON());           // { prim: 'lambda', args: [ { prim: 'string' }, { prim: 'nat' } ] }
```

### ticket

The type `ticket` represents a ticket used to authenticate information.

```ts
const { TTicket, TString } = require('@tezwell/michelson-sdk');

const ticket_type = TTicket(TString());

// Micheline
console.log(ticket_type.toMicheline());      // (ticket string)
// JSON
console.log(ticket_type.toJSON());           // { prim: 'ticket', args: [ { prim: 'string' } ] }
```

### contract

The type `contract` represents the interface and address of a contract entrypoint.

```ts
const { TContract, TString } = require('@tezwell/michelson-sdk');

const contract_type = TContract(TString());

// Micheline
console.log(contract_type.toMicheline());      // (contract string)
// JSON
console.log(contract_type.toJSON());           // { prim: 'contract', args: [ { prim: 'string' } ] }
```

### sapling_state

Michelson reference [sapling_state](https://tezos.gitlab.io/michelson-reference/#type-sapling_state).

```ts
const { TSapling_state } = require('@tezwell/michelson-sdk');

const sapling_state_type = TSapling_state(8);

// Micheline
console.log(sapling_state_type.toMicheline());      // (sapling_state 8)
// JSON
console.log(sapling_state_type.toJSON());           // { prim: 'sapling_state', args: [ { int: '8' } ] }
```

### sapling_transaction

Michelson reference [sapling_transaction](https://tezos.gitlab.io/michelson-reference/#type-sapling_transaction).

```ts
const { TSapling_transaction } = require('@tezwell/michelson-sdk');

const sapling_transaction_type = TSapling_transaction(8);

// Micheline
console.log(sapling_transaction_type.toMicheline());      // (sapling_transaction 8)
// JSON
console.log(sapling_transaction_type.toJSON());           // { prim: 'sapling_transaction', args: [ { int: '8' } ] }
```

## Artificial types

### record

A `TRecord` is an artificial type composed of nested `pair's` with annotated leaves to simulate a dictionary.

```ts
const { TRecord, TNat, TInt, TBytes } = require('@tezwell/michelson-sdk');

const record_type = TRecord(
    {
        field1: TNat(),
        field2: TInt(),
        field3: TBytes()
    },
    // Optional argument (defaults to right combs)
    ["field1", ["field2", "field3"]]
);

// Micheline
console.log(record_type.toMicheline());      // (pair (nat %field1) (pair (int %field2) (bytes %field3)))
// JSON
console.log(record_type.toJSON());           // {
                                             //     prim: 'pair',
                                             //     args: [
                                             //         {
                                             //             prim: 'nat',
                                             //             annots: ["%field1"]
                                             //         },
                                             //         {
                                             //             prim: 'pair',
                                             //             args: [
                                             //                 {
                                             //                     prim: 'int',
                                             //                     annots: ["%field2"]
                                             //                 },
                                             //                 {
                                             //                     prim: 'bytes',
                                             //                     annots: ["%field3"]
                                             //                 },
                                             //             ]
                                             //         }
                                             //     ]
                                             // }
```

### variant

A `TVariant` is an artificial type composed of nested `or's` with annotated leaves to create a union type.

```ts
const { TVariant, TNat, TInt, TBytes } = require('@tezwell/michelson-sdk');

const variant_type = TVariant(
    {
        branch1: TNat(),
        branch2: TInt(),
        branch3: TBytes()
    },
    // Optional argument (defaults to right combs)
    ["branch1", ["branch2", "branch3"]]
);

// Micheline
console.log(variant_type.toMicheline());      // (or (nat %branch1) (or (int %branch2) (bytes %branch3)))
// JSON
console.log(variant_type.toJSON());          // {
                                             //     prim: 'or',
                                             //     args: [
                                             //         {
                                             //             prim: 'nat',
                                             //             annots: ["%branch1"]
                                             //         },
                                             //         {
                                             //             prim: 'or',
                                             //             args: [
                                             //                 {
                                             //                     prim: 'int',
                                             //                     annots: ["%branch2"]
                                             //                 },
                                             //                 {
                                             //                     prim: 'bytes',
                                             //                     annots: ["%branch3"]
                                             //                 },
                                             //             ]
                                             //         }
                                             //     ]
                                             // }
```
