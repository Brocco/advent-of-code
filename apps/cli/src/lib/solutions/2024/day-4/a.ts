export default function (input: string): string {
  const wordToFind = 'XMAS';
  const chars = input.split('\n').map((row) => row.split(''));

  let wordCount = 0;
  for (let y = 0; y < chars.length; y++) {
    for (let x = 0; x < chars[0].length; x++) {
      wordCount += getWordCount(x, y, chars, wordToFind);
    }
  }
  return wordCount.toString();
}

function getWordCount(x: number, y: number, chars: string[][], word: string): number {
  let wordFindCount = 0;

  wordFindCount += findCount(x, 1, y, 0, chars, word);
  wordFindCount += findCount(x, -1, y, 0, chars, word);
  wordFindCount += findCount(x, 0, y, 1, chars, word);
  wordFindCount += findCount(x, 0, y, -1, chars, word);
  wordFindCount += findCount(x, 1, y, 1, chars, word);
  wordFindCount += findCount(x, -1, y, -1, chars, word);
  wordFindCount += findCount(x, 1, y, -1, chars, word);
  wordFindCount += findCount(x, -1, y, 1, chars, word);

  return wordFindCount;
}

function findCount(
  x: number,
  xDiff: number,
  y: number,
  yDiff: number,
  chars: string[][],
  word: string
): number {
  let letters = '';

  for (let m = 0; m < word.length; m++) {
    if (
      y + m * yDiff >= 0 &&
      y + m * yDiff < chars.length &&
      x + m * xDiff >= 0 &&
      x + m * xDiff < chars[0].length
    ) {
      letters += chars[y + m * yDiff][x + m * xDiff];
    }
  }

  return letters == word ? 1 : 0;
}
