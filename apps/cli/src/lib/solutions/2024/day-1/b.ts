import { get2Columns } from '../../util';

export default function (input: string): string {
  const { lefts, rights } = get2Columns(input.split('\n'), '   ', parseInt);
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
