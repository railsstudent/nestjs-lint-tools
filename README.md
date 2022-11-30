# NestJS Schematics for linting NestJS project

## What does it do?

- Enable strict mode in tsconfig.json
- Enable esModuleInterop in tsconfig.js
- Install eslint-plugin-rxjs to lint rxjs codes
- Install eslint-plugin-sonarjs to assure code quality
- Install cspell and create cspell.json to check spelling
- Install lint-staged and create .lintstagedrc.json configuration
- Install commitlint and create .commitlintrc.json
- Install husky pre-commit and commit-msg hooks
- Add engines section in package.json
- Add .node-version and .nvmrc node configuration version
- Install unimported and create .unimportedrc.json configuration to check unused files and dependencies

## Installation

```bash
nest add nestjs-lint-tools
```

or use `npm` to install the library directly

```bash
npm install --save-dev nestjs-linit-tools
```

Example output of the schematics:

```bash
 nest add nestjs-lint-tools
✔ Package installation in progress... ☕
Starting library setup...
? Do you like to set strict mode in tsconfig.json? Yes
? Do you like to set esModuleInterop to true in tsconfig.json? Yes
? Do you like to add cspell for spell checking? Yes
? Do you like to add unimported to find unused files and dependencies? Yes
? Do you like to add commitlint to adopt the convention of commit message? Yes
? Do you like to add lint-staged? Yes
? Do you like to skip husky hook during CI/CD? Yes
? Do you like to add eslint rules for RxJs? Yes
? Do you like to add SonarJS rules for ESLint? Yes
? Which version does the project use? 16
? Do you like to create node version files (.nvmrc and .node-version)? Yes
    Added esModuleInterop to tsconfig.json
    Added strict mode to tsconfig.json
    Added cspell@6.15.0
    Added @commitlint/cli@17.3.0
    Added @commitlint/config-conventional@17.3.0
    Added husky@8.0.2
    Added eslint-plugin-rxjs@5.0.2
    Added eslint-plugin-sonarjs@0.16.0
    Added lint-staged@13.0.4
    Added unimported@1.23.0
    Found cspell script, skip this step
    Added husky prepare script "is-ci || husky install" to package.json
    Added .husky/commit-msg
    Added .husky/pre-commit
    Does not support .eslintrc.js
    Append extends and plugins from ./eslintrc.template to .eslintrc.js. Then, delete the template file.
    Added 16 to package.json
    Created .nvmrc
    Created .node-version
CREATE cspell.json (123 bytes)
CREATE .husky/commit-msg (81 bytes)
CREATE .husky/pre-commit (81 bytes)
CREATE .unimportedrc.json (408 bytes)
CREATE .commitlintrc.json (66 bytes)
CREATE .lintstagedrc.json (105 bytes)
CREATE eslintrc.template (88 bytes)
CREATE .nvmrc (2 bytes)
CREATE .node-version (2 bytes)
UPDATE tsconfig.json (734 bytes)
UPDATE package.json (2374 bytes)
✔ Packages installed successfully.
✔ Packages installed successfully.
✔ Packages installed successfully.
    Made .husky/pre-commit executable
    Made .husky/commit-msg executable
```

eslintrc.template

```javascript
extends: ['plugin:rxjs/recommended','plugin:sonarjs/recommended'],
plugins: ['sonarjs']
```

Copy `['plugin:rxjs/recommended','plugin:sonarjs/recommended]'` and

```javascript
['sonarjs'];
```

to .eslintrc.js

```javascript
  ....
  plugins: ['@typescript-eslint/eslint-plugin', 'sonarjs'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:rxjs/recommended',
    'plugin:sonarjs/recommended'
  ],
  ...
```
