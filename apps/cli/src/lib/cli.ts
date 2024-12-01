import * as yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { runDay } from './run-day';

interface Options {
  day: number;
  part: 1 | 2;
  input?: string;
}

export function cli(): void {
  yargs
    .command('$0 <day> <part> [input]', 'my description', {
      builder: {
        day: {
          describe: 'The day to process',
          type: 'number',
        },
        part: {
          describe: 'The part to process',
          type: 'number',
        },
        input: {
          describe: 'The name of the input to use',
          type: 'string',
        },
      } as yargs.CommandBuilder<unknown, Options>,
      handler: (argv: yargs.ArgumentsCamelCase<Options>) => {
        runDay(2024, argv.day, argv.part, argv.input);
      },
    })
    .parse(hideBin(process.argv));
}
