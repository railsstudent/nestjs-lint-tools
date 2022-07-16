import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics'
import { getPackageJsonDependency } from '@schematics/angular/utility/dependencies'
import { Schema } from '../schema'

export function addStrictMode(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (options.isAddStrictMode) {
      const tsConfigPath = 'tsconfig.json'
      const buffer = tree.read(tsConfigPath)
      if (buffer === null) {
        throw new SchematicsException(`Could not find ${tsConfigPath}.`)
      }

      const tsConfigFile = JSON.parse(buffer.toString())
      const compilerOptions = tsConfigFile.compilerOptions
      compilerOptions.strict = true
      compilerOptions.strictPropertyInitialization = false
      compilerOptions.noImplicitAny = false
      compilerOptions.noImplicitThis = true
      compilerOptions.noUnusedParameters = true
      compilerOptions.noUnusedLocals = true
      compilerOptions.noUncheckedIndexedAccess = true

      const packagePath = 'package.json'
      const typeScriptDependency = getPackageJsonDependency(tree, 'typescript', packagePath)
      if (typeScriptDependency) {
        const [, minor = '0'] = typeScriptDependency.version.split('.')
        if (parseInt(minor) >= 4) {
          compilerOptions.useUnknownInCatchVariables = true
        }
      }

      tree.overwrite(tsConfigPath, JSON.stringify(tsConfigFile, null, 2))
      context.logger.info(`Added strict mode to ${tsConfigPath}`)
    }
    return tree
  }
}
