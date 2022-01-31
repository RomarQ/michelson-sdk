# Value Reference

Official [Michelson reference](https://tezos.gitlab.io/michelson-reference)

## Singletons

### Nat

- [Type reference](./types#nat)

```ts
import { Nat } from '@tezwell/michelson-sdk';

const nat_value = Nat(1);

// Micheline
console.log(nat_value.toMicheline());      // 1
// JSON
console.log(nat_value.toJSON());           // { int: '1' }
```

### Int

- [Type reference](./types#int)

```ts
import { Int } from '@tezwell/michelson-sdk';

const int_value = Int(1);

// Micheline
console.log(int_value.toMicheline());      // 1
// JSON
console.log(int_value.toJSON());           // { int: '1' }
```

### Mutez

- [Type reference](./types#mutez)

```ts
import { Mutez } from '@tezwell/michelson-sdk';

const mutez_value = Mutez(1);

// Micheline
console.log(mutez_value.toMicheline());      // 1
// JSON
console.log(mutez_value.toJSON());           // { int: '1' }
```

### String

- [Type reference](./types#string)

```ts
import { String } from '@tezwell/michelson-sdk';

const string_value = String("A String");

// Micheline
console.log(string_value.toMicheline());      // "A String"
// JSON
console.log(string_value.toJSON());           // { string: 'A String' }
```

### Bool

- [Type reference](./types#bool)

```ts
import { Bool } from '@tezwell/michelson-sdk';

const bool_value = Bool(true);

// Micheline
console.log(bool_value.toMicheline());      // True
// JSON
console.log(bool_value.toJSON());           // { prim: 'True' }
```

### Bytes

- [Type reference](./types#bytes)

```ts
import { Bytes } from '@tezwell/michelson-sdk';

const bytes_value = Bytes("0xfffF");

// Micheline
console.log(bytes_value.toMicheline());      // 0xffff
// JSON
console.log(bytes_value.toJSON());           // { bytes: 'ffff' }
```

### Address

- [Type reference](./types#address)

```ts
import { Address } from '@tezwell/michelson-sdk';

const address_value = Address("tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN");

// Micheline
console.log(address_value.toMicheline());      // "tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN"
// JSON
console.log(address_value.toJSON());           // { string: 'tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN' }
```

### Contract

- [Type reference](./types#contract)

```ts
import { Contract } from '@tezwell/michelson-sdk';

const contract_value = Contract("tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN");

// Micheline
console.log(contract_value.toMicheline());      // "KT1SiSomCunxkq3g7vQKYpPpWBHodhH5pJkU%entrypoint"
// JSON
console.log(contract_value.toJSON());           // { string: 'KT1SiSomCunxkq3g7vQKYpPpWBHodhH5pJkU%entrypoint' }
```

### Timestamp

- [Type reference](./types#timestamp)

```ts
import { Timestamp } from '@tezwell/michelson-sdk';

const timestamp_number = Timestamp(1571659294);
const timestamp_string = Timestamp("2019-09-26T10:59:51Z");

// Micheline
console.log(timestamp_number.toMicheline());      // 1571659294
console.log(timestamp_string.toMicheline());      // "2019-09-26T10:59:51Z"
// JSON
console.log(timestamp_number.toJSON());           // { int: '1571659294' }
console.log(timestamp_string.toJSON());           // { string: '2019-09-26T10:59:51Z' }
```

### Chain_id

- [Type reference](./types#chain_id)

```ts
import { Chain_id } from '@tezwell/michelson-sdk';

const chain_id_bytes = Chain_id("0x7a06a770");
const chain_id_string = Chain_id("NetXynUjJNZm7wi");

// Micheline
console.log(chain_id_bytes.toMicheline());      // 0x7a06a770
console.log(chain_id_string.toMicheline());     // "NetXynUjJNZm7wi"
// JSON
console.log(chain_id_bytes.toJSON());           // { bytes: '7a06a770' }
console.log(chain_id_string.toJSON());          // { string: 'NetXynUjJNZm7wi' }
```

### Bls12_381_fr

- [Type reference](./types#bls12_381_fr)

```ts
import { Bls12_381_fr } from '@tezwell/michelson-sdk';

const bls12_381_fr_number = Bls12_381_fr(1);
const bls12_381_fr_bytes = Bls12_381_fr("0x0001");

// Micheline
console.log(bls12_381_fr_number.toMicheline());    // 1
console.log(bls12_381_fr_bytes.toMicheline());     // 0x0001
// JSON
console.log(bls12_381_fr_number.toJSON());         // { int: '1' }
console.log(bls12_381_fr_bytes.toJSON());          // { bytes: '0001' }
```

### Bls12_381_g1

- [Type reference](./types#bls12_381_g1)

```ts
import { Bls12_381_g1 } from '@tezwell/michelson-sdk';

const bls12_381_g1_value = Bls12_381_g1("0x0572cbea904d67468808c8eb50a9450c9721db309128012543902d0ac358a62ae28f75bb8f1c7c42c39a8c5529bf0f4e166a9d8cabc673a322fda673779d8e3822ba3ecb8670e461f73bb9021d5fd76a4c56d9d4cd16bd1bba86881979749d28");

// Micheline
console.log(bls12_381_g1_value.toMicheline());    // 0x0572cbea904d67468808c8eb50a9450c9721db309128012543902d0ac358a62ae28f75bb8f1c7c42c39a8c5529bf0f4e166a9d8cabc673a322fda673779d8e3822ba3ecb8670e461f73bb9021d5fd76a4c56d9d4cd16bd1bba86881979749d28
// JSON
console.log(bls12_381_g1_value.toJSON());         // { bytes: '0572cbea904d67468808c8eb50a9450c9721db309128012543902d0ac358a62ae28f75bb8f1c7c42c39a8c5529bf0f4e166a9d8cabc673a322fda673779d8e3822ba3ecb8670e461f73bb9021d5fd76a4c56d9d4cd16bd1bba86881979749d28' }
```

### Bls12_381_g2

- [Type reference](./types#bls12_381_g2)

```ts
import { Bls12_381_g2 } from '@tezwell/michelson-sdk';

const bls12_381_g2_value = Bls12_381_g2("0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb813fa4d4a0ad8b1ce186ed5061789213d993923066dddaf1040bc3ff59f825c78df74f2d75467e25e0f55f8a00fa030ed0d1b3cc2c7027888be51d9ef691d77bcb679afda66c73f17f9ee3837a55024f78c71363275a75d75d86bab79f74782aa");

// Micheline
console.log(bls12_381_g2_value.toMicheline());    // 0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb813fa4d4a0ad8b1ce186ed5061789213d993923066dddaf1040bc3ff59f825c78df74f2d75467e25e0f55f8a00fa030ed0d1b3cc2c7027888be51d9ef691d77bcb679afda66c73f17f9ee3837a55024f78c71363275a75d75d86bab79f74782aa
// JSON
console.log(bls12_381_g2_value.toJSON());         // { bytes: '13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb813fa4d4a0ad8b1ce186ed5061789213d993923066dddaf1040bc3ff59f825c78df74f2d75467e25e0f55f8a00fa030ed0d1b3cc2c7027888be51d9ef691d77bcb679afda66c73f17f9ee3837a55024f78c71363275a75d75d86bab79f74782aa' }
```

### Key

- [Type reference](./types#key)

```ts
import { Key } from '@tezwell/michelson-sdk';

const key_value = Key("edpku3g7CeTEvSKhxipD4Q2B6EiEP8cR323u8PFmGFgKRVRvCneEmT");

// Micheline
console.log(key_value.toMicheline());      // "edpku3g7CeTEvSKhxipD4Q2B6EiEP8cR323u8PFmGFgKRVRvCneEmT"
// JSON
console.log(key_value.toJSON());           // { string: 'edpku3g7CeTEvSKhxipD4Q2B6EiEP8cR323u8PFmGFgKRVRvCneEmT' }
```

### Key_hash

- [Type reference](./types#key)

```ts
import { Key_hash } from '@tezwell/michelson-sdk';

const key_hash_value = Key_hash("tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN");

// Micheline
console.log(key_hash_value.toMicheline());      // "tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN"
// JSON
console.log(key_hash_value.toJSON());           // { string: 'tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN' }
```

### Signature

- [Type reference](./types#signature)

```ts
import { Signature } from '@tezwell/michelson-sdk';

const signature_value = Signature("sigsAujsNePapNNGsVotTvcKWMNNJja9B4a2FfAe8vExzFhEgEo1GTQStiif22uSA6iNxPGCGsXsRyeLHzeLbJL2y8CnYuNe");

// Micheline
console.log(signature_value.toMicheline());      // "sigsAujsNePapNNGsVotTvcKWMNNJja9B4a2FfAe8vExzFhEgEo1GTQStiif22uSA6iNxPGCGsXsRyeLHzeLbJL2y8CnYuNe"
// JSON
console.log(signature_value.toJSON());           // { string: 'sigsAujsNePapNNGsVotTvcKWMNNJja9B4a2FfAe8vExzFhEgEo1GTQStiif22uSA6iNxPGCGsXsRyeLHzeLbJL2y8CnYuNe' }
```

### Unit

- [Type reference](./types#unit)

```ts
import { Unit } from '@tezwell/michelson-sdk';

// Micheline
console.log(Unit().toMicheline());      // Unit
// JSON
console.log(Unit().toJSON());           // { prim: 'Unit' }
```

### Left

- [Type reference](./types#or)

```ts
import { Left, Nat } from '@tezwell/michelson-sdk';

const or_value = Left(Nat(1);

// Micheline
console.log(or_value.toMicheline());      // Left 1
// JSON
console.log(or_value.toJSON());           // { prim: 'Left', args: [{ int: '1' }] }
```

### Right

- [Type reference](./types#or)

```ts
import { Right, Nat } from '@tezwell/michelson-sdk';

const or_value = Right(Nat(1);

// Micheline
console.log(or_value.toMicheline());      // Right 1
// JSON
console.log(or_value.toJSON());           // { prim: 'Right', args: [{ int: '1' }] }
```

### List

- [Type reference](./types#list)

```ts
import { List, Nat } from '@tezwell/michelson-sdk';

const list_value = List([Nat(1), Nat(2)]);

// Micheline
console.log(list_value.toMicheline());      // { 1 ; 2 }
// JSON
console.log(list_value.toJSON());           // [ { int: '1' }, { int: '2' } ]
```

### Set

- [Type reference](./types#set)

```ts
import { Set, Nat } from '@tezwell/michelson-sdk';

const set_value = Set([Nat(1), Nat(2)]);

// Micheline
console.log(set_value.toMicheline());      // { 1 ; 2 }
// JSON
console.log(set_value.toJSON());           // [ { int: '1' }, { int: '2' } ]
```

### Some

- [Type reference](./types#option)

```ts
import { Some, Nat } from '@tezwell/michelson-sdk';

const some_value = Some(Nat(1));

// Micheline
console.log(some_value.toMicheline());      // Some 1
// JSON
console.log(some_value.toJSON());           // { prim: 'Some', args: [{ int: '1' }] }
```

### None

- [Type reference](./types#option)

```ts
import { None } from '@tezwell/michelson-sdk';

const none_value = None();

// Micheline
console.log(none_value.toMicheline());      // None
// JSON
console.log(none_value.toJSON());           // { prim: 'None' }
```

### Pair

- [Type reference](./types#pair)

```ts
import { Pair, Nat, String } from '@tezwell/michelson-sdk';

const pair_value = Pair(Nat(1), String("A String"));

// Micheline
console.log(pair_value.toMicheline());      // (Pair 1 "A String")
// JSON
console.log(pair_value.toJSON());           // { prim: 'Pair', args: [{ int: '1' }, { string: 'A String' }] }
```

### Map

- [Type reference](./types#map)

```ts
import { Map, Nat, String } from '@tezwell/michelson-sdk';

const map_value = Map(
    [
        [Nat(1), String("A String 1")],
        [Nat(2), String("A String 2")],
    ]
);

// Micheline
console.log(map_value.toMicheline());       // { Elt 1 "A String 1" ; Elt 2 "A String 2" }
// JSON
console.log(map_value.toJSON());            // [
                                            //   {
                                            //     prim: 'Elt',
                                            //     args: [
                                            //       {
                                            //         int: '1',
                                            //       },
                                            //       {
                                            //         string: 'A String 1',
                                            //       }
                                            //     ]
                                            //   },
                                            //   {
                                            //     prim: 'Elt',
                                            //     args: [
                                            //       {
                                            //         int: '2',
                                            //       },
                                            //       {
                                            //         string: 'A String 2',
                                            //       }
                                            //     ]
                                            //   }
                                            // ]
```

### Big_map

- [Type reference](./types#big_map)

```ts
import { Big_map, Nat, String } from '@tezwell/michelson-sdk';

const big_map_value = Big_map(
    [
        [Nat(1), String("A String 1")],
        [Nat(2), String("A String 2")],
    ]
);

// Micheline
console.log(big_map_value.toMicheline());       // { Elt 1 "A String 1" ; Elt 2 "A String 2" }
// JSON
console.log(big_map_value.toJSON());            // [
                                                //   {
                                                //     prim: 'Elt',
                                                //     args: [
                                                //       {
                                                //         int: '1',
                                                //       },
                                                //       {
                                                //         string: 'A String 1',
                                                //       }
                                                //     ]
                                                //   },
                                                //   {
                                                //     prim: 'Elt',
                                                //     args: [
                                                //       {
                                                //         int: '2',
                                                //       },
                                                //       {
                                                //         string: 'A String 2',
                                                //       }
                                                //     ]
                                                //   }
                                                // ]
```
### Lambda

- [Type reference](./types#lambda)

```ts
import { Lambda } from '@tezwell/michelson-sdk';

const lambda_value = Lambda([
    {
        prim: 'IF',
        args: [
            [{ prim: 'PUSH', args: [{ prim: 'string' }, { prim: 'YES' }] }],
            [{ prim: 'PUSH', args: [{ prim: 'string' }, { prim: 'NO' }] }],
        ],
    },
]);

// Micheline
console.log(lambda_value.toMicheline());    // IF
                                            //   {
                                            //     PUSH string "YES";
                                            //   }
                                            //   {
                                            //     PUSH string "NO";
                                            //   }
// JSON
console.log(lambda_value.toJSON());         // [
                                            //     {
                                            //         args: [
                                            //             [
                                            //                 {
                                            //                     args: [
                                            //                         {
                                            //                             prim: 'string',
                                            //                         },
                                            //                         {
                                            //                             string: 'YES',
                                            //                         },
                                            //                     ],
                                            //                     prim: 'PUSH',
                                            //                 },
                                            //             ],
                                            //             [
                                            //                 {
                                            //                     args: [
                                            //                         {
                                            //                             prim: 'string',
                                            //                         },
                                            //                         {
                                            //                             string: 'NO',
                                            //                         },
                                            //                     ],
                                            //                     prim: 'PUSH',
                                            //                 },
                                            //             ],
                                            //         ],
                                            //         prim: 'IF',
                                            //     },
                                            // ]
```

### Record

- [Type reference](./types#record)

```ts
import { Record, Nat, String, Bytes } from '@tezwell/michelson-sdk';

const record_value = Record(
    {
        field1: Nat(1),
        field2: String("A String"),
        field3: Bytes("0x01"),
    },
    [['field1', 'field2'], 'field3'],
);

// Micheline
console.log(record_value.toMicheline());    // (Pair (Pair 1 "A String") 0x01)
// JSON
console.log(record_value.toJSON());         // {
                                            //     prim: 'Pair',
                                            //     args: [
                                            //         {
                                            //             prim: 'Pair',
                                            //             args: [
                                            //                 { int: '1' },
                                            //                 { string: 'A String' }
                                            //             ]
                                            //         },
                                            //         { bytes: '01' }
                                            //     ]
                                            // }
```

### Variant

- [Type reference](./types#variant)

```ts
import { Variant, Nat, TNat, TUnit } from '@tezwell/michelson-sdk';

const variant_value = Variant(
    "add",
    Nat(1),
    TVariant({
        add: TNat(),
        remove: TNat(),
        remove_all: TUnit(),
    }),
    ['add', ['remove', 'remove_all']],
);

// Micheline
console.log(variant_value.toMicheline());   // Left 1
// JSON
console.log(variant_value.toJSON());        // {
                                            //     prim: 'Left',
                                            //     args: [
                                            //         { int: '1' }
                                            //     ]
                                            // }
```

<!--

### ticket
### sapling_state
### sapling_transaction

-->
