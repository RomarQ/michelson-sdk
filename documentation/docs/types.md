# Type Reference

Official [Michelson type reference](https://tezos.gitlab.io/michelson-reference/#type-reference)

## Singleton types

### nat

Naturals are arbitrary-precision, meaning that the only size limit is gas.

```ts
import { TNat } from '@tezwell/michelson-sdk';

const nat_type = TNat();

// Micheline
console.log(nat_type.toMicheline());      // nat
// JSON
console.log(nat_type.toJSON());           // { prim: 'nat' }
```

### int

Integers are arbitrary-precision, meaning that the only size limit is gas.

```ts
import { TInt } from '@tezwell/michelson-sdk';

const int_type = TInt();

// Micheline
console.log(int_type.toMicheline());      // int
// JSON
console.log(int_type.toJSON());           // { prim: 'int' }
```

### mutez

Mutez (micro-Tez) are internally represented by **64-bit** signed integers. These are restricted to prevent creating a negative amount of mutez.

```ts
import { TMutez } from '@tezwell/michelson-sdk';

const mutez_type = TMutez();

// Micheline
console.log(mutez_type.toMicheline());      // mutez
// JSON
console.log(mutez_type.toJSON());           // { prim: 'mutez' }
```

### string

The current version of Michelson restricts strings to be the printable subset of **7-bit ASCII**, namely characters with codes from within [32, 126] range, plus the following escape characters `\n`, `\\`, `\"`.

```ts
import { TString } from '@tezwell/michelson-sdk';

const string_type = TString();

// Micheline
console.log(string_type.toMicheline());      // string
// JSON
console.log(string_type.toJSON());           // { prim: 'string' }
```

### bool

The type for booleans whose values are `True` and `False`.

```ts
import { TBool } from '@tezwell/michelson-sdk';

const bool_type = TBool();

// Micheline
console.log(bool_type.toMicheline());      // bool
// JSON
console.log(bool_type.toJSON());           // { prim: 'bool' }
```

### bytes

Bytes are used for serializing data, in order to check signatures and compute hashes on them. They can also be used to incorporate data from the wild and untyped outside world.

```ts
import { TBytes } from '@tezwell/michelson-sdk';

const bytes_type = TBytes();

// Micheline
console.log(bytes_type.toMicheline());      // bytes
// JSON
console.log(bytes_type.toJSON());           // { prim: 'bytes' }
```

### address

The address type merely gives the guarantee that the value has the form of a Tezos address, as opposed to contract that guarantees that the value is indeed a valid, existing account.

A valid Tezos address is a string prefixed by either `tz1`, `tz2`, `tz3` or `KT1` and followed by a Base58 encoded hash and terminated by a 4-byte checksum.

The prefix designates the type of address:

- **`tz1`** addresses are followed by a ed25519 public key hash
- **`tz2`** addresses are followed by a Secp256k1 public key hash
- **`tz3`** addresses are followed by a NIST p256r1 public key hash
- **`KT1`** addresses are followed by a contract hash

Addresses prefixed by tz1, tz2 and tz3 designate implicit accounts, whereas those prefixed KT1 designate originated accounts.

Addresses can also specify an entrypoint, with a `%<entrypoint_name>` suffix.

```ts
import { TAddress } from '@tezwell/michelson-sdk';

const address_type = TAddress();

// Micheline
console.log(address_type.toMicheline());      // address
// JSON
console.log(address_type.toJSON());           // { prim: 'address' }
```

### timestamp
### chain_id
### bls12_381_fr
### bls12_381_g1
### bls12_381_g2
### key
### key_hash
### signature
### unit

## Container types

### list

```ts
import { TList, TNat } from '@tezwell/michelson-sdk';

const list_type = TList(TNat());

// Micheline
console.log(list_type.toMicheline());      // (list nat)
// JSON
console.log(list_type.toJSON());           // { prim: 'list', args: [ { prim: 'nat' } ] }
```

### set

```ts
import { TSet, TNat } from '@tezwell/michelson-sdk';

const set_type = TSet(TNat());

// Micheline
console.log(set_type.toMicheline());      // (set nat)
// JSON
console.log(set_type.toJSON());           // { prim: 'set', args: [ { prim: 'nat' } ] }
```

### option
### pair
### record
### map
### big_map
### lambda
