import { color, getDefaultDay, Color } from './util';
import { existsSync, readFileSync } from 'fs';

export async function runDay(year: number, day?: number, data?: string): Promise<void> {
  day = day ?? getDefaultDay();

  const solveFn = await import(`${__dirname}/solutions/${year}/day-${day}`).then((m) => m.default);

  if (!solveFn) {
    console.log(`No solution found for year: ${year}, day: ${day}`);
    return;
  }

  const fileNames = getFileNames(data);

  const inputData = getFileData(year, day, fileNames.input);
  const expectedData = getFileData(year, day, fileNames.output);

  if (day == 1) {
    console.time();
  }
  const output = solveFn(inputData);
  if (day == 1) {
    console.timeEnd();
  }

  if (expectedData) {
    if (output === expectedData) {
      console.log(color(Color.FgGreen)(`Output matches expected`));
    } else {
      console.log(color(Color.FgRed)(`Output does not match expected`));
      console.log(color(Color.FgRed)(`Received:\n${output}`));
      console.log(color(Color.FgRed)(`Expected:\n${expectedData}`));
    }
  } else {
    console.log(color(Color.FgGreen)(output));
  }
}

function getFileNames(data?: string) {
  if (!data) {
    return { input: 'input.txt' };
  }
  return { input: `${data}-input.txt`, output: `${data}-output.txt` };
}

function getFileData(year: number, day: number, fileName?: string): string {
  const path = `${__dirname}/solutions/${year}/day-${day}/${fileName}`;
  if (fileName && existsSync(path)) {
    return readFileSync(path, 'utf8');
  }
  return '';
}
