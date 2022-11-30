import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { Schema } from '../schema';

export function addNodeVersion(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    addEngines(tree, context, options.nodeVersion);
    generateNodeVersionFile(tree, context, options);
    return tree;
  };
}

function addEngines(tree: Tree, context: SchematicContext, nodeVersion: number) {
  const pkgPath = 'package.json';
  const buffer = tree.read(pkgPath);

  if (buffer === null) {
    throw new SchematicsException(`Cannot find ${pkgPath}`);
  }

  const packageJson = JSON.parse(buffer.toString());
  packageJson.engines = {
    node: `>= ${nodeVersion}`,
  };
  tree.overwrite(pkgPath, JSON.stringify(packageJson, null, 2));
  context.logger.info(`Added ${nodeVersion} to package.json`);
}

function generateNodeVersionFile(tree: Tree, context: SchematicContext, options: Schema) {
  const { shouldCreateNodeVersionFile, nodeVersion } = options;
  if (!shouldCreateNodeVersionFile) {
    return;
  }

  const nodeVersionFiles = ['.nvmrc', '.node-version'];

  nodeVersionFiles.forEach((nodeVersionFile) => {
    if (tree.exists(nodeVersionFile)) {
      const originalConfigFileName = `${nodeVersionFile}.original`;
      if (tree.exists(originalConfigFileName)) {
        tree.delete(originalConfigFileName);
      }
      tree.rename(nodeVersionFile, originalConfigFileName);
      context.logger.info(`Rename ${nodeVersionFile} to ${originalConfigFileName}`);
    }

    tree.create(nodeVersionFile, `${nodeVersion}`);
    context.logger.info(`Created ${nodeVersionFile}`);
  });
}
