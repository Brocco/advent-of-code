export default function (part: 1 | 2, input: string): string {
  const { lefts, rights } = input.split('\n').reduce(
    (acc, line) => {
      const [left, right] = line.split('   ');
      acc.lefts.push(parseInt(left));
      acc.rights.push(parseInt(right));
      return acc;
    },
    { lefts: [], rights: [] } as { lefts: number[]; rights: number[] }
  );
  if (part === 1) {
    return part1(lefts, rights).toString();
  }
  return part2(lefts, rights).toString();
}

function part1(lefts: number[], rights: number[]): number {
  const sortedLefts = lefts.sort((a, b) => a - b);
  const sortedRights = rights.sort((a, b) => a - b);
  let diffSum = 0;
  for (let i = 0; i < sortedLefts.length; i++) {
    diffSum += Math.abs(sortedLefts[i] - sortedRights[i]);
  }
  return diffSum;
}

function part2(lefts: number[], rights: number[]): number {
  const rightCountMap = rights.reduce((acc, right) => {
    acc[right] = (acc[right] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return lefts.reduce((acc, left) => {
    if (rightCountMap[left]) {
      acc += left * rightCountMap[left];
    }
    return acc;
  }, 0);
}
