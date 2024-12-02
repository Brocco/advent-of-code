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
  const sortedLefts = lefts.sort((a, b) => a - b);
  const sortedRights = rights.sort((a, b) => a - b);
  let diffSum = 0;
  for (let i = 0; i < sortedLefts.length; i++) {
    diffSum += Math.abs(sortedLefts[i] - sortedRights[i]);
  }
  return diffSum.toString();
}
