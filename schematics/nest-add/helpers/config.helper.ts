import { apply, chain, mergeWith, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics'
import { strings } from '@angular-devkit/core'
import { Schema } from '../schema'
import { addCommitMessageHook, addHuskyPrepareScript, addPreCommitHook } from './husky.helper'

export function addConfigurationFiles(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (options.isAddCommitlint || options.isAddLintStaged) {
      addHuskyPrepareScript(tree, context)
    }

    const configRules: Rule[] = []
    if (options.isAddCommitlint) {
      addCommitMessageHook(tree, context)
      configRules.push(createCommitlintConfig(tree, context))
    }

    if (options.isAddLintStaged) {
      addPreCommitHook(tree, context)
      configRules.push(createLintStagedJson(tree, context, options))
    }

    return configRules.length ? chain(configRules) : tree
  }
}

function createLintStagedJson(tree: Tree, context: SchematicContext, options: Schema) {
  const cspell = options.isAddCspell ? '"cspell .", ' : ''

  const configFileName = '.lintstagedrc.json'
  if (tree.exists(configFileName)) {
    const originalConfigFileName = `${configFileName}.original`
    if (tree.exists(originalConfigFileName)) {
      tree.delete(originalConfigFileName)
    }
    tree.rename(configFileName, originalConfigFileName)
    context.logger.info(`Rename ${configFileName} to ${originalConfigFileName}`)
  }

  const sourceTemplate = url('./files/lint-staged')
  const sourceParameterizedTemplate = apply(sourceTemplate, [
    template({
      cspell,
      ...options,
      ...strings,
    }),
  ])

  return mergeWith(sourceParameterizedTemplate)
}

function createCommitlintConfig(tree: Tree, context: SchematicContext) {
  const configFileName = '.commitlintrc.json'
  if (tree.exists(configFileName)) {
    const originalConfigFileName = `${configFileName}.original`
    if (tree.exists(originalConfigFileName)) {
      tree.delete(originalConfigFileName)
    }
    tree.rename(configFileName, originalConfigFileName)
    context.logger.info(`Rename ${configFileName} to ${originalConfigFileName}`)
  }

  return mergeWith(url('./files/commitlint'))
}
