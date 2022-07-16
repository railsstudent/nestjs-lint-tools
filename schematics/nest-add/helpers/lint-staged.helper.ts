import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { husky, lintStaged } from '../constants'
import { Schema } from '../schema'
import { addDependencies } from './dependency.helper'
import { addHuskyPrepareScript, addPreCommitHook } from './husky.helper'

export function addLintStaged(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (options.isAddLintStaged) {
      addDependencies(tree, context, [lintStaged, husky])
      createLintStagedJson(tree, context, options)
      addHuskyPrepareScript(tree, context)
      addPreCommitHook(tree, context)
    }

    return tree
  }
}

function createLintStagedJson(tree: Tree, context: SchematicContext, options: Schema) {
  const eslintCommands: string[] = []
  if (options.isAddCspell) {
    eslintCommands.push('cspell .')
  }
  eslintCommands.push('eslint --fix --max-warnings 0')

  const content: Record<string, string[] | string> = {
    '*.ts': eslintCommands,
    '*.{md,json,html}': 'prettier --write',
  }

  const configFileName = '.lintstagedrc.json'
  if (tree.exists(configFileName)) {
    const originalConfigFileName = `${configFileName}.original`
    if (tree.exists(originalConfigFileName)) {
      tree.delete(originalConfigFileName)
    }
    tree.rename(configFileName, originalConfigFileName)
    context.logger.info(`Rename ${configFileName} to ${originalConfigFileName}`)
  }

  tree.create(configFileName, JSON.stringify(content, null, 2))
  context.logger.info(`Added ${configFileName}`)
}
