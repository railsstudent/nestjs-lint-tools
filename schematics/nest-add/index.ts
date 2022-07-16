import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks'
import { addCommitlint, addCspell, addEslintRxjs, addLintStaged, addStrictMode, addEslintSonarjs, addNodeVersion } from './helpers'
import { Schema } from './schema'

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function nestAdd(options: Schema): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask())

    return chain([
      addStrictMode(options),
      addCspell(options),
      addCommitlint(options),
      addLintStaged(options),
      addEslintRxjs(options),
      addEslintSonarjs(options),
      addNodeVersion(options),
    ])
  }
}
