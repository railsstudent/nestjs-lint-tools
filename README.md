# NestJS Schematics for linting NestJS project    

## What does it do?
- Enable strict mode in tsconfig.json
- Install eslint-plugin-rxjs to lint rxjs codes
- Install eslint-plugin-sonarjs to assure code quality
- Install cspell and create cspell.json to check spelling
- Install lint-staged and create .lintstagedrc.json configuration
- Install commitlint and create .commitlintrc.json
- Install husky pre-commit and commit-msg hooks
- Add engines section in package.json
- Add either .node-version or .nvmrc node configuration version

## Installation

```bash
nest add nestjs-lint-tools
```

or use ```npm``` to install the library directly
```bash
npm install --save-dev nestjs-linit-tools
```

Example output of the schematics:

``` bash
 nest add nestjs-lint-tools
✔ Package installation in progress... ☕
Starting library setup...
? Do you like to set strict mode in tsconfig.json? Yes
? Do you like to add cspell for spell checking? Yes
? Do you like to add commitlint to adopt the convention of commit message? Yes
? Do you like to add lint-staged? Yes
? Do you like to add eslint rules for RxJs? Yes
? Do you like to add SonarJS rules for ESLint? Yes
? Which version does the project use? 16
? Do you like to create node version configuration file? .nvmrc
    Added strict mode to tsconfig.json
    Found cspell@~6.1.1, do not add dependency
    Found @commitlint/cli@~17.0.2, do not add dependency
    Found @commitlint/config-conventional@~17.0.2, do not add dependency
    Found husky@~8.0.1, do not add dependency
    Found eslint-plugin-rxjs@~5.0.2, do not add dependency
    Found eslint-plugin-sonarjs@~0.13.0, do not add dependency
    Found lint-staged@~13.0.0, do not add dependency
    Found cspell script, skip this step
    Found husky prepare script, skip this step
    Added .husky/commit-msg
    Added .husky/pre-commit
    Does not support .eslintrc.js
    Append extends and plugins from ./eslintrc.template to .eslintrc.js. Then, delete the template file.
    Added 16 to package.json
    Created .nvmrc
CREATE cspell.json (123 bytes)
CREATE .husky/commit-msg (81 bytes)
CREATE .husky/pre-commit (81 bytes)
CREATE .commitlintrc.json (66 bytes)
CREATE .lintstagedrc.json (105 bytes)
CREATE eslintrc.template (88 bytes)
CREATE .nvmrc (2 bytes)
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

Copy ```['plugin:rxjs/recommended','plugin:sonarjs/recommended]'``` and 

```javascript
['sonarjs']
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
