export default function (input: string): string {
  const { lefts, rights } = input.split('\n').reduce(
    (acc, line) => {
      const [left, right] = line.split('   ');
      acc.lefts.push(parseInt(left));
      acc.rights.push(parseInt(right));
      return acc;
    },
    { lefts: [], rights: [] } as { lefts: number[]; rights: number[] }
  );
  const rightCountMap = rights.reduce((acc, right) => {
    acc[right] = (acc[right] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const result = lefts.reduce((acc, left) => {
    if (rightCountMap[left]) {
      acc += left * rightCountMap[left];
    }
    return acc;
  }, 0);

  return result.toString();
}
