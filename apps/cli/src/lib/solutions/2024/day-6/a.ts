type Point = { x: number; y: number };
type Guard = Point & { facing: number };

// Legend:
const NORTH = 0;
const EAST = 1;
const SOUTH = 2;
const WEST = 3;
const START_INDICATOR = '^';
const OBSTRUCTION = '#';

export default function (input: string): string | number {
  const map = input.split('\n').map((row) => row.split(''));

  let guard = map.reduce((acc, row, i) => {
    if (acc != null) {
      return acc;
    }
    const startIndex = row.indexOf(START_INDICATOR);
    if (startIndex != -1) {
      acc = {
        x: startIndex,
        y: i,
        facing: NORTH,
      };
    }
    return acc;
  }, null as Guard | null);

  if (guard == null) {
    return '';
  }

  const visited = new Set<string>();
  while (isInBounds(map, guard)) {
    // printMap(map, guard);
    visited.add(`${guard.x},${guard.y}`);
    const nextSpace = getSpaceAhead(map, guard);
    if (!isInBounds(map, nextSpace)) {
      guard = nextSpace;
    } else {
      if (map[nextSpace.y][nextSpace.x] == OBSTRUCTION) {
        guard = { ...guard, facing: (guard.facing + 1) % 4 };
      } else {
        guard = nextSpace;
      }
    }
  }

  return visited.size;
}

function isInBounds(map: string[][], point: Point): boolean {
  if (point.x < 0 || point.y < 0) {
    return false;
  }
  if (point.x >= map[0].length) {
    return false;
  }
  if (point.y >= map.length) {
    return false;
  }
  return true;
}

function getSpaceAhead(map: string[][], guard: Guard): Guard {
  let xDiff = 0;
  let yDiff = 0;
  switch (guard.facing) {
    case NORTH:
      yDiff = -1;
      break;
    case SOUTH:
      yDiff = 1;
      break;
    case EAST:
      xDiff = 1;
      break;
    case WEST:
      xDiff = -1;
      break;
  }

  return {
    x: guard.x + xDiff,
    y: guard.y + yDiff,
    facing: guard.facing,
  };
}
function printMap(map: string[][], guard: Guard) {
  for (let y = 0; y < map.length; y++) {
    const row = [...map[y]];
    if (guard.y == y) {
      row[guard.x] = 'O';
    }
    console.log(row.join(''));
  }
  console.log('\n');
}
