interface Options {
  /**
   * The format of the data returned by the generator.
   * @default 'boolean'
   */
  format?: 'boolean' | 'string' | 'number';

  /**
   * The minimum number of `1`s (true values) that must appear in the returned permutations.
   * @default 0
   */
  minOnes?: number;

  /**
   * The maximum number of `1`s (true values) that must appear in the returned permutations.
   * @default n
   */
  maxOnes?: number;
}

/**
 * Generator function that yields all binary permutations for `n` bits,
 * allowing customization of the output format and constraints on the number of `1`s.
 *
 * @param n - The number of bits (must be a non-negative integer).
 * @param options - Optional configuration object to specify output format and filters for ones count.
 * @returns A generator that yields each binary permutation in the specified format.
 * @throws Will throw an error if `n` is negative or not an integer.
 *
 * @example
 * const permutations = getBinaryPermutations(3);
 * for (const perm of permutations) {
 *     console.log(perm); // Logs each binary permutation as an array of booleans by default.
 * }
 */

function getBinaryPermutations(n: number): Generator<boolean[]>;
function getBinaryPermutations(n: number, options: { format: 'boolean' } & Partial<Options>): Generator<boolean[]>;
function getBinaryPermutations(n: number, options: { format: 'string' } & Partial<Options>): Generator<string>;
function getBinaryPermutations(n: number, options: { format: 'number' } & Partial<Options>): Generator<number[]>;
function getBinaryPermutations(n: number, options: Omit<Options, 'format'>): Generator<boolean[]>;
function* getBinaryPermutations(n: number, options: Options = {}): Generator<boolean[] | string | number[]> {
  const { format = 'boolean', minOnes = 0, maxOnes = n } = options;

  if (!Number.isInteger(n) || n < 0) {
    throw new Error('n must be a non-negative integer');
  }

  const maxPermutations = 1 << n;

  for (let i = 0; i < maxPermutations; i++) {
    const binary = i.toString(2).padStart(n, '0');

    const onesCount = binary.split('').reduce((count, bit) => count + (bit === '1' ? 1 : 0), 0);

    if (onesCount < minOnes || onesCount > maxOnes) {
      continue;
    }

    switch (format) {
      case 'string':
        yield binary;
        break;
      case 'number':
        yield binary.split('').map(Number);
        break;
      case 'boolean':
      default:
        yield binary.split('').map(bit => bit === '1');
    }
  }
}
export default getBinaryPermutations;
