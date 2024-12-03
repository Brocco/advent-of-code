export default function (input: string): string {
  const updatedInput = removeDonts(input);
  const mulRegex = /mul\(\d{1,3},\d{1,3}\)/gm;
  const mulMatches = updatedInput.matchAll(mulRegex);

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

function removeDonts(input: string): string {
  const doFn = `do()`;
  const dontFn = `don't()`;

  let strippedInput = input;
  let dontIndex = strippedInput.indexOf(dontFn);
  while (dontIndex !== -1) {
    const doIndex = strippedInput.indexOf(doFn, dontIndex);
    if (doIndex === -1) {
      strippedInput = strippedInput.substring(0, dontIndex);
    } else {
      strippedInput =
        strippedInput.substring(0, dontIndex) + strippedInput.substring(doIndex + doFn.length);
    }
    dontIndex = strippedInput.indexOf(dontFn);
  }
  return strippedInput;
}
