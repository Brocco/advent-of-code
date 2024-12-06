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
    if (!isInOrder(rules, updates)) {
      const orderedUpdates = applyRules(rules, updates);
      if (isInOrder(rules, orderedUpdates)) {
        sum += getMiddleNumber(orderedUpdates);
      }
    }
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

function applyRules(rules: { first: number; second: number }[], updates: number[]): number[] {
  const visited: Set<number> = new Set();
  let validUpdate = true;

  const orderMap: Map<number, number[]> = new Map();

  for (const rule of rules) {
    // const pages: string[] = printData[i].split("|")
    const currentRules = orderMap.get(rule.first);
    if (currentRules?.length) {
      currentRules.push(rule.second);
    }
    orderMap.set(rule.first, currentRules ?? [rule.second]);
  }

  for (let i = 0; i < updates.length; i++) {
    const updateKey = updates[i];
    const secondPages = orderMap.get(updateKey);
    if (!secondPages) {
      visited.add(updateKey);
      continue;
    }
    let validKey = true;
    for (let page = 0; page < secondPages.length; page++) {
      if (visited.has(secondPages[page])) {
        validKey = false;
        break;
      }
    }
    if (!validKey) {
      validUpdate = false;
      break;
    }
    visited.add(updateKey);
  }

  if (!validUpdate) {
    const updateSet = new Set(updates);
    updates.sort((a, b) => {
      const mapA: number = orderMap.get(a)?.filter((val) => updateSet.has(val)).length || 0;
      const mapB: number = orderMap.get(b)?.filter((val) => updateSet.has(val)).length || 0;
      return mapB - mapA;
    });
  }
  return updates;
}

function handleInvalid(updates: number[], orderMap: Map<number, number[]>): number {
  const updateSet = new Set(updates);
  updates.sort((a, b) => {
    const mapA: number = orderMap.get(a)?.filter((val) => updateSet.has(val)).length || 0;
    const mapB: number = orderMap.get(b)?.filter((val) => updateSet.has(val)).length || 0;
    return mapB - mapA;
  });
  return getMiddleNumber(updates);
}

function getMiddleNumber(updates: number[]): number {
  const midIndex = Math.floor(updates.length / 2);
  return updates[midIndex];
}
