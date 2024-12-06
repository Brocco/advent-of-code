import { color, Color } from './color';
import { existsSync, readFileSync } from 'fs';

export async function runDay(
  year: number,
  day: number,
  part: 'a' | 'b',
  data?: string
): Promise<void> {
  const solveFn = await import(`${__dirname}/solutions/${year}/day-${day}/${part}`).then(
    (m) => m.default
  );

  if (!solveFn) {
    console.log(`No solution found for year: ${year}, day: ${day}`);
    return;
  }

  const fileNames = getFileNames(part, data);

  const inputData = getFileData(year, day, fileNames.input);
  const expectedData = getFileData(year, day, fileNames.output);

  const output = solveFn(inputData);

  if (expectedData) {
    if (output === expectedData) {
      console.log(color(Color.FgGreen)(`Output matches expected:\n${output}`));
    } else {
      console.log(color(Color.FgRed)(`Output does not match expected`));
      console.log(color(Color.FgRed)(`Received:\n${output}`));
      console.log(color(Color.FgRed)(`Expected:\n${expectedData}`));
    }
  } else {
    console.log(color(Color.FgGreen)(output));
  }
}

function getFileNames(part: 'a' | 'b', data?: string) {
  if (!data) {
    return { input: 'input.txt' };
  }
  return { input: `${data}-input.txt`, output: `${data}-output-${part}.txt` };
}

function getFileData(year: number, day: number, fileName?: string): string {
  const path = `${__dirname}/solutions/${year}/day-${day}/${fileName}`;
  if (fileName && existsSync(path)) {
    let contents = readFileSync(path, 'utf8');
    if (contents.endsWith('\n')) contents = contents.substring(0, contents.length - '\n'.length);
    return contents;
  }
  return '';
}
