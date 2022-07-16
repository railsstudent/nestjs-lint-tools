import { mergeWith, Rule, SchematicContext, SchematicsException, Tree, url } from '@angular-devkit/schematics'
import { cspell } from '../constants'
import { Schema } from '../schema'
import { addDependencies } from './dependency.helper'

export function addCspell(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (options.isAddCspell) {
      addDependencies(tree, context, [cspell])
      addNpmScript(tree, context)
      renameCspell(tree, context)

      return mergeWith(url('./files/cspell'))(tree, context)
    }

    return tree
  }
}

function renameCspell(tree: Tree, context: SchematicContext) {
  const configFileName = 'cspell.json'
  if (tree.exists(configFileName)) {
    const originalConfigFileName = `${configFileName}.original`
    if (tree.exists(originalConfigFileName)) {
      tree.delete(originalConfigFileName)
    }
    tree.rename(configFileName, originalConfigFileName)
    context.logger.info(`Rename ${configFileName} to ${originalConfigFileName}`)
  }
}

function addNpmScript(tree: Tree, context: SchematicContext) {
  const pkgPath = 'package.json'
  const buffer = tree.read(pkgPath)

  if (buffer === null) {
    throw new SchematicsException(`Cannot find ${pkgPath}`)
  }

  const packageJson = JSON.parse(buffer.toString())
  if (!packageJson.scripts.cspell) {
    packageJson.scripts.cspell = 'cspell --no-must-find-files src/**/*.{ts,js}'
    tree.overwrite(pkgPath, JSON.stringify(packageJson, null, 2))
    context.logger.info('Added cspell script to package.json')
  } else {
    context.logger.info('Found cspell script, skip this step')
  }
}
