import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { addPackageJsonDependency, getPackageJsonDependency, NodeDependency } from '@schematics/angular/utility/dependencies'
import { commitlintCli, commitlintConfigConvention, cspell, eslintPluginRxjs, eslintSonarjs, husky, lintStaged } from '../constants'
import { Schema } from '../schema'

export function installDependencies(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const dependencies = new Set<NodeDependency>()
    if (options.isAddCspell) {
      dependencies.add(cspell)
    }

    if (options.isAddCommitlint) {
      dependencies.add(commitlintCli).add(commitlintConfigConvention).add(husky)
    }

    if (options.isAddEslintRxjs) {
      dependencies.add(eslintPluginRxjs)
    }

    if (options.isAddEslintSonarJs) {
      dependencies.add(eslintSonarjs)
    }

    if (options.isAddLintStaged) {
      dependencies.add(lintStaged).add(husky)
    }

    addDependencies(tree, context, Array.from(dependencies))
    return tree
  }
}

function addDependencies(tree: Tree, context: SchematicContext, dependencies: NodeDependency[]) {
  const pkgPath = 'package.json'
  for (const dependency of dependencies) {
    const result = getPackageJsonDependency(tree, dependency.name, pkgPath)
    if (!result) {
      addPackageJsonDependency(tree, dependency)
      context.logger.info(`Added ${dependency.name}@${dependency.version}`)
    } else {
      context.logger.info(`Found ${dependency.name}@${dependency.version}, do not add dependency`)
    }
  }
}
