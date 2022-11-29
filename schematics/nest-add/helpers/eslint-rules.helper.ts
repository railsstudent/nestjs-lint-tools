import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema } from '../schema';

export function addEslint(options: Schema) {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Does not support .eslintrc.js');
    const eslintTemplate = './eslintrc.template';

    const eslintExtends: string[] = [];
    if (options.isAddEslintRxjs) {
      eslintExtends.push('plugin:rxjs/recommended');
    }

    let plugins = '';
    if (options.isAddEslintSonarJs) {
      eslintExtends.push('plugin:sonarjs/recommended');
      plugins = `plugins: ['sonarjs']`;
    }

    const strEslintExtends = eslintExtends.map((eslintExtend) => `'${eslintExtend}'`).join(',');
    const enableEslintPlugins = `extends: [${strEslintExtends}]${plugins ? ',' : ''}
${plugins}
`;

    if (tree.exists(eslintTemplate)) {
      tree.delete(eslintTemplate);
    }

    tree.create(eslintTemplate, enableEslintPlugins);
    context.logger.info(
      `Append extends and plugins from ${eslintTemplate} to .eslintrc.js. Then, delete the template file.`,
    );
    return tree;
  };
}
