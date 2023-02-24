import { cac } from 'cac'
import { build } from './build'
import * as path from 'path'
import chalk from 'chalk'
import pkg from '../../package.json'

export const main = () => {
  const cli = cac()

  cli
    .command('build [file] [dest]', 'build nyaco project')
    .action((file: string, dest) => {
      console.log(chalk.green('🐾 nyaco build', `v${pkg.version}`))
      const basePath = process.cwd()
      build(path.join(basePath, file), path.join(basePath, dest))
    })

  cli.parse()
  cli.help()
}
