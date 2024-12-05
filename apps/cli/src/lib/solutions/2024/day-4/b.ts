export default function (input: string): string {
  const wordToFind = 'MAS';
  const chars = input.split('\n').map((row) => row.split(''));

  let wordCount = 0;
  for (let y = 1; y < chars.length - 1; y++) {
    for (let x = 1; x < chars[0].length - 1; x++) {
      wordCount += getWordCount(x, y, chars, wordToFind);
    }
  }
  return wordCount.toString();
}

function getWordCount(x: number, y: number, chars: string[][], word: string): number {
  const tlbr = chars[y - 1][x - 1] + chars[y][x] + chars[y + 1][x + 1];
  const bltr = chars[y + 1][x - 1] + chars[y][x] + chars[y - 1][x + 1];
  const revWord = word.split('').reverse().join('');

  if ((tlbr == word || tlbr == revWord) && (bltr == word || bltr == revWord)) {
    return 1;
  }
  return 0;
}
