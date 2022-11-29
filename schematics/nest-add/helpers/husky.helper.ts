import { Tree, SchematicContext, SchematicsException } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { Schema } from '../schema';

export function addCommitMessageHook(tree: Tree, context: SchematicContext) {
  const commitMsg = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit "\${1}"
  `;

  const commitMsgFilePath = '.husky/commit-msg';
  if (!tree.exists(commitMsgFilePath)) {
    tree.create(commitMsgFilePath, commitMsg);
    context.logger.info(`Added ${commitMsgFilePath}`);
    const installTaskId = context.addTask(new NodePackageInstallTask());
    context.addTask(
      new RunSchematicTask('commit-msg-hook', {
        enableGitHooksScript: 'npm run prepare',
        commitMsgFilePath,
      }),
      [installTaskId],
    );
  } else {
    context.logger.info(`Found ${commitMsgFilePath}, skip this step`);
  }
}

export function addPreCommitHook(tree: Tree, context: SchematicContext, options: Schema) {
  const { isAddLintStaged, isAddUnimported } = options;
  const cmdLintStaged = isAddLintStaged ? 'npx --no-install lint-staged' : '';
  const cmdUnimported = isAddUnimported ? 'npm run unimported' : '';
  const preCommit = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
    
${cmdLintStaged}
${cmdUnimported}
  `;

  const preCommitFilePath = '.husky/pre-commit';
  if (!tree.exists(preCommitFilePath)) {
    tree.create(preCommitFilePath, preCommit);
    context.logger.info(`Added ${preCommitFilePath}`);
    const installTaskId = context.addTask(new NodePackageInstallTask());
    context.addTask(
      new RunSchematicTask('pre-commit-hook', {
        enableGitHooksScript: 'npm run prepare',
        preCommitFilePath,
      }),
      [installTaskId],
    );
  } else {
    context.logger.info(`Found ${preCommitFilePath}, skip this step`);
  }
}

export function addHuskyPrepareScript(tree: Tree, context: SchematicContext, options: Schema) {
  const pkgPath = 'package.json';
  const buffer = tree.read(pkgPath);

  if (buffer === null) {
    throw new SchematicsException(`Cannot find ${pkgPath}`);
  }

  let isUnimportedScriptAdded = false;
  let isHuskyPrepareAdded = false;
  const packageJson = JSON.parse(buffer.toString());
  if (options.isAddUnimported) {
    packageJson.scripts.unimported = 'unimported';
    isUnimportedScriptAdded = true;
  }

  if (!packageJson.scripts.prepare) {
    packageJson.scripts.prepare = `${options.isSkipHusyHook ? 'is-ci || ' : ''}husky install`;
    isHuskyPrepareAdded = true;
  }

  if (isHuskyPrepareAdded || isUnimportedScriptAdded) {
    tree.overwrite(pkgPath, JSON.stringify(packageJson, null, 2));
    if (isHuskyPrepareAdded) {
      context.logger.info('Added husky prepare script to package.json');
    }

    if (isUnimportedScriptAdded) {
      context.logger.info('Added unimported to package.json');
    }
  } else {
    context.logger.info('Found husky prepare script, skip this step');
  }
}
