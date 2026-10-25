import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import getBinaryPermutations, { getBinaryPermutations as named } from '../src/index.ts';

const ALL_4 = Array.from({ length: 16 }, (_, i) => i.toString(2).padStart(4, '0'));
const popcount = (s: string) => [...s].filter(bit => bit === '1').length;

/** Reference implementation: enumerate everything and filter. */
const reference = (n: number, min = 0, max = n) =>
  Array.from({ length: 2 ** n }, (_, i) => (n === 0 ? '' : i.toString(2).padStart(n, '0'))).filter(
    s => popcount(s) >= min && popcount(s) <= max
  );

describe('getBinaryPermutations', () => {
  it('exports the same function as default and named export', () => {
    assert.equal(getBinaryPermutations, named);
  });

  it('returns all permutations as booleans by default', () => {
    assert.deepEqual(
      Array.from(getBinaryPermutations(4)),
      ALL_4.map(s => [...s].map(bit => bit === '1'))
    );
  });

  it('returns permutations as strings', () => {
    assert.deepEqual(Array.from(getBinaryPermutations(4, { format: 'string' })), ALL_4);
  });

  it('returns permutations as numbers', () => {
    assert.deepEqual(
      Array.from(getBinaryPermutations(4, { format: 'number' })),
      ALL_4.map(s => [...s].map(Number))
    );
  });

  it('applies minOnes', () => {
    assert.deepEqual(Array.from(getBinaryPermutations(4, { format: 'string', minOnes: 3 })), [
      '0111',
      '1011',
      '1101',
      '1110',
      '1111'
    ]);
  });

  it('applies maxOnes', () => {
    assert.deepEqual(Array.from(getBinaryPermutations(4, { format: 'string', maxOnes: 1 })), [
      '0000',
      '0001',
      '0010',
      '0100',
      '1000'
    ]);
  });

  it('matches the reference implementation for every n ≤ 8 and every filter', () => {
    for (let n = 0; n <= 8; n++) {
      for (let min = 0; min <= n + 1; min++) {
        for (let max = 0; max <= n + 1; max++) {
          const actual = Array.from(getBinaryPermutations(n, { format: 'string', minOnes: min, maxOnes: max }));
          assert.deepEqual(actual, reference(n, min, max), `n=${n} min=${min} max=${max}`);
        }
      }
    }
  });

  it('yields a single empty permutation for n = 0', () => {
    assert.deepEqual(Array.from(getBinaryPermutations(0)), [[]]);
  });

  it('yields fresh arrays', () => {
    const [a, b] = getBinaryPermutations(2);
    assert.notEqual(a, b);
    assert.deepEqual(a, [false, false]);
  });

  it('works past 32 bits', () => {
    const permutations = getBinaryPermutations(40, { format: 'string' });
    assert.equal(permutations.next().value, '0'.repeat(40));
    assert.equal(permutations.next().value, `${'0'.repeat(39)}1`);
  });

  it('skips filtered permutations quickly for large n', () => {
    const permutations = getBinaryPermutations(50_000, { format: 'number', minOnes: 49_999 });
    assert.deepEqual(permutations.next().value, [0, ...Array(49_999).fill(1)]);
    assert.equal(permutations.next().value?.[0], 1);
  });

  it('throws eagerly for invalid arguments', () => {
    assert.throws(() => getBinaryPermutations(-1), { name: 'RangeError', message: 'n must be a non-negative integer' });
    assert.throws(() => getBinaryPermutations(1.5), RangeError);
    assert.throws(() => getBinaryPermutations(3, { minOnes: -1 }), /minOnes/);
    assert.throws(() => getBinaryPermutations(3, { maxOnes: Number.NaN }), /maxOnes/);
  });
});

describe('cli', () => {
  const cli = fileURLToPath(new URL('../src/cli.ts', import.meta.url));
  const run = (...args: string[]) => execFileSync(process.execPath, [cli, ...args], { encoding: 'utf8' });

  it('prints one permutation per line', () => {
    assert.equal(run('2'), '00\n01\n10\n11\n');
  });

  it('supports format and filters', () => {
    assert.equal(run('3', '--format', 'number', '--min-ones', '2', '--max-ones', '2'), '[0,1,1]\n[1,0,1]\n[1,1,0]\n');
  });

  it('fails on invalid input', () => {
    assert.throws(() => execFileSync(process.execPath, [cli, 'abc'], { stdio: 'pipe' }), /n must be/);
  });
});
