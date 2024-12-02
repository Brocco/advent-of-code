export function get2Columns<T>(
  lines: string[],
  split: string,
  transformFn: (i: string) => T
): { lefts: T[]; rights: T[] } {
  return lines.reduce(
    (acc, line) => {
      const [left, right] = line.split(split);
      acc.lefts.push(transformFn(left));
      acc.rights.push(transformFn(right));
      return acc;
    },
    { lefts: [], rights: [] } as { lefts: T[]; rights: T[] }
  );
}
