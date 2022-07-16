import { Tree, SchematicContext, SchematicsException } from '@angular-devkit/schematics'
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks'

export function addCommitMessageHook(tree: Tree, context: SchematicContext) {
  const commitMsg = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit "\${1}"
  `

  const commitMsgFilePath = '.husky/commit-msg'
  if (!tree.exists(commitMsgFilePath)) {
    tree.create(commitMsgFilePath, commitMsg)
    context.logger.info(`Added ${commitMsgFilePath}`)
    const installTaskId = context.addTask(new NodePackageInstallTask())
    context.addTask(
      new RunSchematicTask('commit-msg-hook', {
        enableGitHooksScript: 'npm run prepare',
        commitMsgFilePath,
      }),
      [installTaskId],
    )
  } else {
    context.logger.info(`Found ${commitMsgFilePath}, skip this step`)
  }
}

export function addPreCommitHook(tree: Tree, context: SchematicContext) {
  const preCommit = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
    
npx --no-install lint-staged    
  `

  const preCommitFilePath = '.husky/pre-commit'
  if (!tree.exists(preCommitFilePath)) {
    tree.create(preCommitFilePath, preCommit)
    context.logger.info(`Added ${preCommitFilePath}`)
    const installTaskId = context.addTask(new NodePackageInstallTask())
    context.addTask(
      new RunSchematicTask('pre-commit-hook', {
        enableGitHooksScript: 'npm run prepare',
        preCommitFilePath,
      }),
      [installTaskId],
    )
  } else {
    context.logger.info(`Found ${preCommitFilePath}, skip this step`)
  }
}

export function addHuskyPrepareScript(tree: Tree, context: SchematicContext) {
  const pkgPath = 'package.json'
  const buffer = tree.read(pkgPath)

  if (buffer === null) {
    throw new SchematicsException(`Cannot find ${pkgPath}`)
  }

  const packageJson = JSON.parse(buffer.toString())
  if (!packageJson.scripts.prepare) {
    packageJson.scripts.prepare = 'husky install'
    tree.overwrite(pkgPath, JSON.stringify(packageJson, null, 2))
    context.logger.info('Added husky prepare script to package.json')
  } else {
    context.logger.info('Found husky prepare script, skip this step')
  }
}
