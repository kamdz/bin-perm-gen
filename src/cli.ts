#!/usr/bin/env node
import { once } from 'node:events';
import { parseArgs } from 'node:util';
import { type Format, getBinaryPermutations } from './index.ts';

const HELP = `Usage: bin-perm-gen <n> [options]

Prints every binary permutation of n bits, one per line.

Options:
  -f, --format <format>  string | number | boolean (default: string)
      --min-ones <k>     minimum number of ones
      --max-ones <k>     maximum number of ones
  -h, --help             show this help`;

const FORMATS: readonly Format[] = ['string', 'number', 'boolean'];

const toInt = (value: string | undefined, name: string): number | undefined => {
  if (value === undefined) return undefined;
  if (!/^\d+$/.test(value)) throw new RangeError(`${name} must be a non-negative integer`);
  return Number(value);
};

async function main(): Promise<void> {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      format: { type: 'string', short: 'f', default: 'string' },
      'min-ones': { type: 'string' },
      'max-ones': { type: 'string' },
      help: { type: 'boolean', short: 'h' }
    }
  });

  if (values.help || positionals.length === 0) {
    console.log(HELP);
    return;
  }

  if (positionals.length > 1) throw new RangeError(`unexpected argument: ${positionals[1]}`);

  const format = values.format as Format;
  if (!FORMATS.includes(format)) throw new RangeError(`format must be one of: ${FORMATS.join(', ')}`);

  const n = toInt(positionals[0], 'n') ?? 0;
  const permutations = getBinaryPermutations(n, {
    format,
    minOnes: toInt(values['min-ones'], 'min-ones'),
    maxOnes: toInt(values['max-ones'], 'max-ones')
  });

  // Write in chunks and respect backpressure, so huge outputs don't pile up in memory.
  let chunk = '';
  for (const permutation of permutations) {
    chunk += `${typeof permutation === 'string' ? permutation : JSON.stringify(permutation)}\n`;
    if (chunk.length >= 1 << 16) {
      if (!process.stdout.write(chunk)) await once(process.stdout, 'drain');
      chunk = '';
    }
  }
  process.stdout.write(chunk);
}

// Exit quietly when the reader goes away, e.g. `bin-perm-gen 30 | head`.
process.stdout.on('error', error => {
  if ((error as NodeJS.ErrnoException).code === 'EPIPE') process.exit(0);
  throw error;
});

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
