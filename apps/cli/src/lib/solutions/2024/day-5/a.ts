export default function (input: string): string {
  const [ruleLines, updateLines] = input.split('\n\n').map((s) => s.split('\n'));

  const rules = ruleLines.map((r) => {
    const ruleParts = r.split('|').map((s) => parseInt(s, 10));
    return {
      first: ruleParts[0],
      second: ruleParts[1],
    };
  });

  const updatesList = updateLines.map((u) => u.split(',').map((s) => parseInt(s, 10)));

  let sum = 0;
  for (const updates of updatesList) {
    sum += isInOrder(rules, updates) ? getMiddleNumber(updates) : 0;
  }

  return sum.toString();
}

function isInOrder(rules: { first: number; second: number }[], updates: number[]): boolean {
  return rules.every((rule) => {
    const firstIndex = updates.indexOf(rule.first);
    const secondIndex = updates.indexOf(rule.second);
    return firstIndex == -1 || secondIndex == -1 || firstIndex < secondIndex;
  });
}

function getMiddleNumber(updates: number[]): number {
  const midIndex = Math.floor(updates.length / 2);
  return updates[midIndex];
}
