export interface Schema {
  isAddEslintRxjs: boolean;
  isAddStrictMode: boolean;
  isAddCspell: boolean;
  isAddUnimported: boolean;
  isAddCommitlint: boolean;
  isAddLintStaged: boolean;
  isSkipHuskyHook: boolean;
  isAddEslintSonarJs: boolean;
  isEnableESModuleInterop: boolean;
  nodeVersion: number;
  nodeVersionFile: string;
}
