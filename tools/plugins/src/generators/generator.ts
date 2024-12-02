import { formatFiles, generateFiles, Tree } from '@nx/devkit';
import * as path from 'path';
import { NewDayGeneratorSchema } from './schema';

export async function newDayGenerator(tree: Tree, options: NewDayGeneratorSchema) {
  const projectRoot = `apps/cli/src/lib/solutions/${options.year}/day-${options.day}`;
  tree.delete(projectRoot);
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default newDayGenerator;
