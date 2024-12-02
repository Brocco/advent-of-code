import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { newDayGenerator } from './generator';
import { NewDayGeneratorSchema } from './schema';

describe('tools/plugins/src/generators/new-day generator', () => {
  let tree: Tree;
  const options: NewDayGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await newDayGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
