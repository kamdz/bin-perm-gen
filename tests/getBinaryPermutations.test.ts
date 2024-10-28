import getBinaryPermutations from '@@';

describe('getBinaryPermutations', () => {
  it('should return all binary permutations for n = 4', () => {
    const result = Array.from(getBinaryPermutations(4));
    expect(result).toEqual([
      [false, false, false, false],
      [false, false, false, true],
      [false, false, true, false],
      [false, false, true, true],
      [false, true, false, false],
      [false, true, false, true],
      [false, true, true, false],
      [false, true, true, true],
      [true, false, false, false],
      [true, false, false, true],
      [true, false, true, false],
      [true, false, true, true],
      [true, true, false, false],
      [true, true, false, true],
      [true, true, true, false],
      [true, true, true, true]
    ]);
  });

  it('should return all binary permutations as strings for n = 4', () => {
    const result = Array.from(getBinaryPermutations(4, { format: 'string' }));
    expect(result).toEqual([
      '0000',
      '0001',
      '0010',
      '0011',
      '0100',
      '0101',
      '0110',
      '0111',
      '1000',
      '1001',
      '1010',
      '1011',
      '1100',
      '1101',
      '1110',
      '1111'
    ]);
  });

  it('should return all binary permutations as numbers for n = 4', () => {
    const result = Array.from(getBinaryPermutations(4, { format: 'number' }));
    expect(result).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 0, 1, 1],
      [0, 1, 0, 0],
      [0, 1, 0, 1],
      [0, 1, 1, 0],
      [0, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 0, 0, 1],
      [1, 0, 1, 0],
      [1, 0, 1, 1],
      [1, 1, 0, 0],
      [1, 1, 0, 1],
      [1, 1, 1, 0],
      [1, 1, 1, 1]
    ]);
  });

  it('should throw an error for negative n', () => {
    expect(() => {
      Array.from(getBinaryPermutations(-1));
    }).toThrow('n must be a non-negative integer');
  });

  it('should apply minOnes filter', () => {
    const result = Array.from(getBinaryPermutations(4, { minOnes: 3 }));
    expect(result).toEqual([
      [false, true, true, true],
      [true, false, true, true],
      [true, true, false, true],
      [true, true, true, false],
      [true, true, true, true]
    ]);
  });

  it('should apply maxOnes filter', () => {
    const result = Array.from(getBinaryPermutations(4, { maxOnes: 1 }));
    expect(result).toEqual([
      [false, false, false, false],
      [false, false, false, true],
      [false, false, true, false],
      [false, true, false, false],
      [true, false, false, false]
    ]);
  });

  it('should handle both minOnes and maxOnes filters', () => {
    const result = Array.from(getBinaryPermutations(4, { minOnes: 2, maxOnes: 3 }));
    expect(result).toEqual([
      [false, false, true, true],
      [false, true, false, true],
      [false, true, true, false],
      [false, true, true, true],
      [true, false, false, true],
      [true, false, true, false],
      [true, false, true, true],
      [true, true, false, false],
      [true, true, false, true],
      [true, true, true, false]
    ]);
  });

  it('works with big n without memory leak failure', () => {
    expect(() => {
      const permutations = getBinaryPermutations(50000);
      expect(permutations.next().value).toEqual(new Array(50000).fill(false));
    }).not.toThrow();
  });
});
