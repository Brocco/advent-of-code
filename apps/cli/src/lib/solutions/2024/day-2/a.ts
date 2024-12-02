export default function (input: string): string {
  // const reports = input.split('\n');
  // const levels = reports.map((report) => report.split(' '));

  const safeCount = input
    .split('\n')
    .map((report) => {
      const levels = report.split(' ').map((level) => parseInt(level));
      const inc = levels[1] > levels[0];
      let safe = true;
      for (let i = 0; i < levels.length - 1; i++) {
        const diff = levels[i + 1] - levels[i];
        if ((inc && diff < 0) || (!inc && diff > 0) || Math.abs(diff) > 3 || diff === 0) {
          safe = false;
          break;
        }
      }
      return safe;
    })
    .filter((safe) => safe).length;

  return safeCount.toString();
}
