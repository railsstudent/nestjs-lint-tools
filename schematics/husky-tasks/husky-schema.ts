export interface HuskySchema {
  enableGitHooksScript?: string
  commitMsgFilePath?: string
  preCommitFilePath?: string
}

export interface HuskyPrecommitHookSchema extends HuskySchema {
  shouldInstallUnimported: boolean
}
