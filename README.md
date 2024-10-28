# ⚡ Binary Permutations Generator

A fast, zero-dependency generator for creating binary permutations with customizable format and filtering options. The use of **ES6 generators** allows this package to handle large values of `n` efficiently. Permutations are generated on-the-fly, ensuring low memory usage and smooth high performance.

## 🚀 Features

- **Zero dependencies** – simple and lightweight.
- **Flexible format options** – return results as booleans, numbers, or strings.
- **Efficient ES6 generator for large `n`** – handles big inputs smoothly, yielding permutations one-by-one.
- **Custom filters** – control how many `true` values appear in results.

## 🛠️ Installation

```bash
npm install bin-perm-gen
```

## 📖 Usage

```javascript
import getBinaryPermutations, { getPermutationCount } from 'binary-perm-gen';

// Basic usage with default options
const generator = getBinaryPermutations(3);
for (const permutation of generator) {
  console.log(permutation);
}
// Output:
// [ false, false, false ]
// [ false, false, true ]
// [ false, true, false ]
// ...

// Using options
const generatorWithOptions = getBinaryPermutations(4, { format: 'string', minOnes: 2 });
for (const perm of generatorWithOptions) {
  console.log(perm);
}
// Output:
// '0011'
// '0101'
// '0110'
// '1001'
// ...

// Get the number of all possible permutations for n bits
const totalPermutations = getPermutationCount(4); // 16
console.log(totalPermutations);
```

## 🔧 API

### `getBinaryPermutations(n: number, options?: Options): Generator<string | number[] | boolean[]>`

Default export. Generates all binary permutations for `n` bits, allowing customization through the `options` parameter.

- `n` (number): The number of bits (must be a non-negative integer).
- `options` (optional):
  - `format` (`'boolean' | 'string' | 'number'`): The output format. Defaults to `'boolean'`.
  - `minOnes` (number): Minimum number of ones (`true` values) in the result. Defaults to `0`.
  - `maxOnes` (number): Maximum number of ones (`true` values) in the result. Defaults to `n`.

### `getPermutationCount(n: number): number`

Returns the total number of binary permutations for a given `n` bits. It equals to `2^n`.
