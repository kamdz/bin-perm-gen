/** Output format of a single permutation. */
export type Format = 'boolean' | 'string' | 'number';

/** Maps each format to the type of value the generator yields. */
export interface FormatMap {
  boolean: boolean[];
  string: string;
  number: number[];
}

export interface Options<F extends Format = Format> {
  /**
   * The format of the data returned by the generator.
   * @default 'boolean'
   */
  format?: F;

  /**
   * The minimum number of `1`s (true values) that must appear in the returned permutations.
   * @default 0
   */
  minOnes?: number;

  /**
   * The maximum number of `1`s (true values) that may appear in the returned permutations.
   * @default n
   */
  maxOnes?: number;
}

const assertInteger = (value: number, name: string, min = 0): void => {
  if (!Number.isSafeInteger(value) || value < min) {
    throw new RangeError(`${name} must be a non-negative integer`);
  }
};

/**
 * Yields all binary permutations of `n` bits in lexicographic order (`000`, `001`, `010`, …),
 * optionally restricted to permutations with between `minOnes` and `maxOnes` ones.
 *
 * Permutations are produced lazily, so large `n` is fine as long as you don't consume all `2^n` of them.
 * Filtered permutations are skipped in O(n) instead of being enumerated and discarded.
 *
 * @param n - The number of bits (a non-negative integer).
 * @param options - Output format and filters for the number of ones.
 * @throws {RangeError} When `n`, `minOnes` or `maxOnes` is not a non-negative integer, or `format` is unknown.
 *
 * @example
 * for (const perm of getBinaryPermutations(3, { format: 'string', minOnes: 2 })) {
 *   console.log(perm); // '011', '101', '110', '111'
 * }
 */
export function getBinaryPermutations<F extends Format = 'boolean'>(
  n: number,
  options: Options<F> = {}
): Generator<FormatMap[F], void, undefined> {
  const { format = 'boolean', minOnes = 0, maxOnes = n } = options;

  assertInteger(n, 'n');
  assertInteger(minOnes, 'minOnes');
  assertInteger(maxOnes, 'maxOnes');
  if (!Object.hasOwn(formatters, format)) {
    throw new RangeError(`format must be one of: ${Object.keys(formatters).join(', ')}`);
  }

  // Validation runs eagerly (above); the actual work happens in the inner generator.
  return generate(n, Math.min(minOnes, n + 1), Math.min(maxOnes, n), format as F);
}

function* generate<F extends Format>(n: number, min: number, max: number, format: F): Generator<FormatMap[F]> {
  if (min > max) return;

  const toOutput = formatters[format] as (bits: Uint8Array) => FormatMap[F];

  // First permutation: the `min` ones packed to the right, e.g. 0011 for n = 4, min = 2.
  const bits = new Uint8Array(n);
  bits.fill(1, n - min);
  let ones = min;

  while (true) {
    yield toOutput(bits);

    // Find the next permutation: flip the rightmost 0 at position i for which a valid suffix still exists,
    // then make the suffix as small as possible (only the ones still needed, packed to the right).
    let prefixOnes = ones;
    let i = n - 1;
    for (; i >= 0; i--) {
      if (bits[i] === 1) {
        prefixOnes--;
        continue;
      }
      const needed = min - (prefixOnes + 1);
      if (prefixOnes + 1 <= max && needed <= n - i - 1) break;
    }
    if (i < 0) return;

    const needed = Math.max(0, min - (prefixOnes + 1));
    bits[i] = 1;
    bits.fill(0, i + 1, n - needed);
    bits.fill(1, n - needed);
    ones = prefixOnes + 1 + needed;
  }
}

const formatters: { [F in Format]: (bits: Uint8Array) => FormatMap[F] } = {
  boolean: bits => Array.from(bits, bit => bit === 1),
  number: bits => Array.from(bits),
  string: bits => bits.join('')
};

export default getBinaryPermutations;
