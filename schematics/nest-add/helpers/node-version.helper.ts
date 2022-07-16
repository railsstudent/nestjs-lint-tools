import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics'
import { NODE_VERSION_FILE } from '../enums'
import { Schema } from '../schema'

export function addNodeVersion(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    addEngines(tree, context, options.nodeVersion)
    generateNodeVersionFile(tree, context, options)
    return tree
  }
}

function addEngines(tree: Tree, context: SchematicContext, nodeVersion: number) {
  const pkgPath = 'package.json'
  const buffer = tree.read(pkgPath)

  if (buffer === null) {
    throw new SchematicsException(`Cannot find ${pkgPath}`)
  }

  const packageJson = JSON.parse(buffer.toString())
  packageJson.engines = {
    node: `>= ${nodeVersion}`,
  }
  tree.overwrite(pkgPath, JSON.stringify(packageJson, null, 2))
  context.logger.info(`Added ${nodeVersion} to package.json`)
}

function generateNodeVersionFile(tree: Tree, context: SchematicContext, options: Schema) {
  const configFileNameMap: Record<string, string> = {
    [NODE_VERSION_FILE.NODE_VERSION]: '.node-version',
    [NODE_VERSION_FILE.NVMRC]: '.nvmrc',
    [NODE_VERSION_FILE.NONE]: '',
  }

  const { nodeVersionFile, nodeVersion } = options
  const configFileName = configFileNameMap[nodeVersionFile] || ''

  if (!configFileName) {
    return
  }

  if (tree.exists(configFileName)) {
    const originalConfigFileName = `${configFileName}.original`
    if (tree.exists(originalConfigFileName)) {
      tree.delete(originalConfigFileName)
    }
    tree.rename(configFileName, originalConfigFileName)
    context.logger.info(`Rename ${configFileName} to ${originalConfigFileName}`)
  }

  tree.create(configFileName, `${nodeVersion}`)
  context.logger.info(`Created ${configFileName}`)
}
