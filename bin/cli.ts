#!/usr/bin/env node
import getBinaryPermutations from '@@';

try {
  console.log(Array.from(getBinaryPermutations(Number(process.argv[2]))));
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
