export default function (input: string): string {
  // const reports = input.split('\n');
  // const levels = reports.map((report) => report.split(' '));

  const safeCount = input
    .split('\n')
    .map((report) => {
      const levels = report.split(' ').map((level) => parseInt(level));
      let unsafeCount = getUnsafeCount(levels);
      let i = 0;
      while (unsafeCount > 0 && i < levels.length) {
        const subLevels = levels.slice(0, i).concat(levels.slice(i + 1));
        unsafeCount = getUnsafeCount(subLevels);
        i++;
      }
      return unsafeCount === 0;
    })
    .filter((safe) => safe).length;

  return safeCount.toString();
}

function getUnsafeCount(levels: number[]): number {
  const inc = levels[1] > levels[0];
  let unsafeCount = 0;
  for (let i = 0; i < levels.length - 1; i++) {
    const diff = levels[i + 1] - levels[i];
    if ((inc && diff < 0) || (!inc && diff > 0) || Math.abs(diff) > 3 || diff === 0) {
      unsafeCount++;
    }
  }
  return unsafeCount;
}
