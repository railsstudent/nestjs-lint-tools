import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { exec } from 'child_process'
import { HuskySchema } from './husky-schema'

export function commitMsgExecutable(options: HuskySchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (options.commitMsgFilePath && options.enableGitHooksScript) {
      exec(options.enableGitHooksScript)
      exec(`chmod a+x ${options.commitMsgFilePath}`)
      context.logger.info(`Made ${options.commitMsgFilePath} executable`)
    }

    return tree
  }
}

export function preCommitExecutable(options: HuskySchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (options.preCommitFilePath && options.enableGitHooksScript) {
      exec(options.enableGitHooksScript)
      exec(`chmod a+x ${options.preCommitFilePath}`)
      context.logger.info(`Made ${options.preCommitFilePath} executable`)
    }

    return tree
  }
}
