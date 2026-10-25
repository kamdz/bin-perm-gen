# 🔟 Binary Permutations Generator

A fast, zero-dependency generator of binary permutations with customizable format and filtering. Permutations are produced lazily, one at a time, so memory use stays low even for large `n`.

## 🚀 Features

- **Zero dependencies** – simple and lightweight.
- **Flexible output** – booleans, numbers or strings.
- **Lazy generator** – works for any `n`, including more than 32 bits.
- **Fast filters** – limit the number of ones; filtered-out permutations are skipped, not enumerated.
- **Typed** – the yielded type follows the `format` option.

## 🛠️ Installation

```bash
npm install bin-perm-gen
```

Requires Node.js 22.12 or later. The package is ESM-only; `require('bin-perm-gen')` also works on supported Node versions.

## 📖 Usage

```js
import { getBinaryPermutations } from 'bin-perm-gen';

for (const permutation of getBinaryPermutations(3)) {
  console.log(permutation);
}
// [ false, false, false ]
// [ false, false, true ]
// [ false, true, false ]
// ...

for (const permutation of getBinaryPermutations(4, { format: 'string', minOnes: 2 })) {
  console.log(permutation);
}
// '0011'
// '0101'
// '0110'
// '0111'
// ...

// Collect into an array – only for small n, there are 2^n permutations
const all = [...getBinaryPermutations(4, { format: 'number' })];
```

The default export (`import getBinaryPermutations from 'bin-perm-gen'`) is still available.

### Command line

```bash
npx bin-perm-gen 3
# 000
# 001
# 010
# ...

npx bin-perm-gen 4 --min-ones 2 --max-ones 2 --format number
# [0,0,1,1]
# [0,1,0,1]
# ...
```

| Option                  | Description                                      |
| ----------------------- | ------------------------------------------------ |
| `-f, --format <format>` | `string` (default), `number` or `boolean`        |
| `--min-ones <k>`        | minimum number of ones                           |
| `--max-ones <k>`        | maximum number of ones                           |
| `-h, --help`            | show help                                        |

Output is streamed one permutation per line, so it can be piped (`npx bin-perm-gen 30 | head`).

## 🔧 API

### `getBinaryPermutations(n, options?)`

Returns a generator of all binary permutations of `n` bits, in lexicographic order.

- `n` (`number`): number of bits, a non-negative integer.
- `options` (optional):
  - `format` (`'boolean' | 'string' | 'number'`): output format. Default `'boolean'`.
  - `minOnes` (`number`): minimum number of ones (`true` values). Default `0`.
  - `maxOnes` (`number`): maximum number of ones (`true` values). Default `n`.

Throws a `RangeError` immediately when `n`, `minOnes` or `maxOnes` is not a non-negative integer. When `minOnes > maxOnes` or `minOnes > n`, the generator yields nothing.

## 🧑‍💻 Development

```bash
npm install
npm test           # node:test, runs the TypeScript sources directly
npm run lint       # Biome (lint + format check), npm run lint:fix to fix
npm run typecheck
npm run build      # tsc → dist/
```

Releases are automated with [release-please](https://github.com/googleapis/release-please) from [Conventional Commits](https://www.conventionalcommits.org/) and published to npm with trusted publishing.
