export default function (input: string): string {
  const mulRegex = /mul\(\d{1,3},\d{1,3}\)/gm;
  const mulMatches = input.matchAll(mulRegex);

  if (mulMatches === null) {
    return '0';
  }

  const muls = Array.from(mulMatches, (match) => match[0]);

  const result = muls.reduce((acc, mul) => {
    const [num1, num2] = mul
      .replace('mul(', '')
      .replace(')', '')
      .split(',')
      .map((n) => {
        return parseInt(n, 10);
      });
    return acc + num1 * num2;
  }, 0);

  return result.toString();
}
