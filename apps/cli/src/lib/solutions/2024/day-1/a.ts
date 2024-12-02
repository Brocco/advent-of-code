import { get2Columns } from '../../util';

export default function (input: string): string {
  const { lefts, rights } = get2Columns(input.split('\n'), '   ', parseInt);
  const sortedLefts = lefts.sort((a, b) => a - b);
  const sortedRights = rights.sort((a, b) => a - b);
  let diffSum = 0;
  for (let i = 0; i < sortedLefts.length; i++) {
    diffSum += Math.abs(sortedLefts[i] - sortedRights[i]);
  }
  return diffSum.toString();
}
