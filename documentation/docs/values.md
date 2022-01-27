# Value Reference

Official [Michelson reference](https://tezos.gitlab.io/michelson-reference)

## Singletons

### nat

```ts
import { Nat } from '@tezwell/michelson-sdk';

const nat_value = Nat(1);

// Micheline
console.log(nat_value.toMicheline());      // 1
// JSON
console.log(nat_value.toJSON());           // { int: '1' }
```

### int

```ts
import { Int } from '@tezwell/michelson-sdk';

const int_value = Nat(1);

// Micheline
console.log(int_value.toMicheline());      // 1
// JSON
console.log(int_value.toJSON());           // { int: '1' }
```

## Containers

### list

```ts
import { List, Nat, TNat } from '@tezwell/michelson-sdk';

const list_value = List([Nat(1), Nat(2)], TNat());

// Micheline
console.log(list_value.toMicheline());      // { 1 ; 2 }
// JSON
console.log(list_value.toJSON());           // [ { int: '1' }, { int: '2' } ]
```

### set

```ts
import { Set, Nat, TNat } from '@tezwell/michelson-sdk';

const set_value = Set([Nat(1), Nat(2)], TNat());

// Micheline
console.log(set_value.toMicheline());      // { 1 ; 2 }
// JSON
console.log(set_value.toJSON());           // [ { int: '1' }, { int: '2' } ]
```
