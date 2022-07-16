import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { Schema } from '../schema'
import { updateEslintrc } from './eslint.helper'

export function addEslintRxjs(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (options.isAddEslintRxjs) {
      updateEslintrc(tree, context, { eslintExtend: 'plugin:rxjs/recommended' })
    }

    return tree
  }
}

export function addEslintSonarjs(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (options.isAddEslintSonarJs) {
      updateEslintrc(tree, context, { eslintExtend: 'plugin:sonarjs/recommended', plugin: 'sonarjs' })
    }
  }
}
