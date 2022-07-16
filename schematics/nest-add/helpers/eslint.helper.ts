import { SchematicContext, Tree } from '@angular-devkit/schematics'

export function updateEslintrc(tree: Tree, context: SchematicContext, rule: { eslintExtend?: string; plugin?: string }) {
  const eslintPaths = ['.eslintrc.js', '.eslintrc.json']
  const { eslintExtend, plugin } = rule
  let isEslintFileFound = false
  for (const eslintPath of eslintPaths) {
    const buffer = tree.read(eslintPath)
    if (buffer !== null) {
      isEslintFileFound = true
      if (eslintPath.endsWith('.json')) {
        const eslintFile = JSON.parse(buffer.toString())
        if (eslintExtend) {
          eslintFile.extends = [...eslintFile.extends, eslintExtend]
        }
        if (plugin) {
          eslintFile.plugins = [...eslintFile.plugins, plugin]
        }
        tree.overwrite(eslintPath, JSON.stringify(eslintFile, null, 2))
      } else if (eslintPath.endsWith('.js')) {
        let eslintJsFile = buffer.toString()
        if (plugin) {
          eslintJsFile = insertTextToStringFile(eslintJsFile, 'plugins: [', plugin)
        }
        if (eslintExtend) {
          eslintJsFile = insertTextToStringFile(eslintJsFile, 'extends: [', eslintExtend)
        }
        tree.overwrite(eslintPath, eslintJsFile)
      }
      context.logger.info(`Added '${eslintExtend}' to ${eslintPath}`)
      break
    }
  }

  if (!isEslintFileFound) {
    context.logger.info('Eslintrc file not found')
  }
}

function insertTextToStringFile(file: string, pattern: string, insertText: string) {
  const idxExtends = file.indexOf(pattern)
  const idxCloseBracket = file.indexOf(']', idxExtends)
  const contentBetween = file.substring(idxExtends + pattern.length, idxCloseBracket)
  const elements = [...contentBetween.split(','), `'${insertText}'`]
    .map((element) => element.replace(/(\r\n|\n|\r)/gm, '').trim())
    .filter((element) => element)

  return `${file.substring(0, idxExtends + pattern.length)}${elements.join(',')}${file.substring(idxCloseBracket)}`
}
