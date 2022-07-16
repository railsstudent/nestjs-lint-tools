import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import * as path from 'path'

const collectionPath = path.join(__dirname, '../collection.json')

describe('nest-lint-tools', () => {
  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath)
    const tree = await runner.runSchematicAsync('nest-lint-tools', {}, Tree.empty()).toPromise()

    expect(tree.files).toEqual([])
  })
})
