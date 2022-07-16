import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { Schema } from '../schema'
import { addCommitMessageHook, addHuskyPrepareScript } from './husky.helper'

export function addCommitlint(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (options.isAddCommitlint) {
      createCommitlintConfig(tree, context)
      addHuskyPrepareScript(tree, context)
      addCommitMessageHook(tree, context)
    }

    return tree
  }
}

function createCommitlintConfig(tree: Tree, context: SchematicContext) {
  const configFileName = 'commitlint.config.js'
  if (tree.exists(configFileName)) {
    const originalConfigFileName = `${configFileName}.original`
    if (tree.exists(originalConfigFileName)) {
      tree.delete(originalConfigFileName)
    }
    tree.rename(configFileName, originalConfigFileName)
    context.logger.info(`Rename ${configFileName} to ${originalConfigFileName}`)
  }

  tree.create(configFileName, `module.exports = { extends: ['@commitlint/config-conventional'] };`)
  context.logger.info(`Added ${configFileName}`)
}
