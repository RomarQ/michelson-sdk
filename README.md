# Michelson SDK
![CI](https://github.com/RomarQ/michelson-sdk/workflows/CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/RomarQ/michelson-sdk/badge.svg?branch=main)](https://coveralls.io/github/RomarQ/michelson-sdk?branch=main)


`Michelson SDK` is a framework for generating Michelson values and types from Javascript.

# [Documentation](https://romarq.github.io/michelson-sdk)

## Usage

### Compile a value and its type

```ts
import { List, Nat } from '@tezwell/michelson-sdk';

const literal = List([Nat(1), Nat(2)]);

// Micheline
console.log(literal.toMicheline());         // { 1 ; 2 }
// JSON
console.log(literal.toJSON());              // [ { int: '1' }, { int: '2' } ]
```

### Compile a type

```ts
import { TList, TNat } from '@tezwell/michelson-sdk';

const list_type = TList(TNat());

// Micheline
console.log(list_type.toMicheline());    // (list nat)

// JSON
console.log(list_type.toJSON());         // { prim: 'list', args: [ { prim: 'nat' } ] }
```

## [Contributing](CONTRIBUTING.md)
