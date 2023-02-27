/* eslint-disable @typescript-eslint/no-empty-function */
import * as path from 'path'
import * as fs from 'fs/promises'
import {
  createUID,
  Nyair,
  NyairCompiler,
  NyairJSON,
  ProcTransformer,
  Sprite,
  Stage,
} from 'nyair'
import { md5hash } from './md5hash'
import { Lexer } from '@/lexer/Lexer'
import { parse } from '@/parser/parse'
import { getImageSize } from './getImageSize'
import { compile } from '@/compiler'
import { ParserContext } from '@/parser/context'
import { CompileContext } from '@/compiler/context'
import { AnalyzeContext } from '@/analyzer/context'
import { createRootScope } from './createRootScope'
import { analyze } from '@/analyzer'
import { decodeAudioData } from './decodeAudioData'
import chalk from 'chalk'

export const build = async (filePath: string, destPath: string) => {
  console.log(chalk.cyan('🔧 building', chalk.bold(path.basename(filePath))))

  const start = performance.now()
  const basePath = process.cwd()
  const fileContent = await fs.readFile(filePath, 'utf-8')

  const [tokens, errors] = new Lexer().tokenize(fileContent)

  if (errors.length > 0) {
    throw errors
  }

  const parserContext = new ParserContext(tokens)
  const node = parse(parserContext).unwrapOrThrow()

  const analyzeContext = new AnalyzeContext(createRootScope(), parserContext)
  analyze(analyzeContext, node)

  const firstAnalyzeError = analyzeContext.errors.at(0)
  if (firstAnalyzeError) {
    throw firstAnalyzeError
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  await fs.rm(destPath, { recursive: true }).catch(() => {})
  await fs.mkdir(destPath)

  const assetsPromises: Promise<void>[] = []
  const stageCostumes: NyairJSON['stage']['costumes'] = []
  const stageSounds: NyairJSON['stage']['sounds'] = []
  const broadcastsMap = new Map<string, string>()

  for (const broadcast of analyzeContext.broadcasts) {
    const uid = createUID()
    broadcastsMap.set(uid, broadcast)
  }

  const broadcasts = Object.fromEntries(
    broadcastsMap
  ) as NyairJSON['stage']['broadcasts']

  const stage: Stage = {
    costumes: stageCostumes,
    sounds: stageSounds,
    broadcasts,
    variables: analyzeContext.globalVariables,
    lists: analyzeContext.globalLists,
    blocks: [],
    currentCostume: 0,
    volume: 100,
    layerOrder: 0,
    tempo: 60,
    videoTransparency: 50,
    videoState: 'off',
    textToSpeechLanguage: null,
  }
  const sprites: Sprite[] = []

  const sections = node.kind.expect('Root').sections

  for (const section of sections) {
    const { kind } = section

    const loadCostume = async (
      costumes: NyairJSON['stage']['costumes'],
      costumePath: string,
      costumeName: string
    ) => {
      const absolutePath = path.join(basePath, costumePath)
      const content = await fs.readFile(absolutePath)
      const md5 = md5hash(content)
      const ext = path.extname(costumePath)
      const md5ext = md5 + ext

      const size = await getImageSize(absolutePath)

      fs.copyFile(absolutePath, path.join(destPath, md5ext))
      costumes.push({
        assetId: md5,
        name: costumeName,
        bitmapResolution: 1,
        md5ext,
        dataFormat: 'svg',
        rotationCenterX: (size.width ?? 0) / 2,
        rotationCenterY: (size.height ?? 0) / 2,
      })
      console.log(
        chalk.cyan(
          '👗 created costume',
          chalk.magenta(costumeName),
          ':',
          costumePath,
          '→',
          md5ext
        )
      )
    }

    const loadSound = async (
      sounds: NyairJSON['stage']['sounds'],
      soundPath: string,
      soundName: string
    ) => {
      const absolutePath = path.join(basePath, soundPath)
      const content = await fs.readFile(absolutePath)
      const md5 = md5hash(content)
      const ext = path.extname(soundPath)
      const md5ext = md5 + ext

      const data = await decodeAudioData(content)

      fs.copyFile(absolutePath, path.join(destPath, md5ext))
      sounds.push({
        assetId: md5,
        name: soundName,
        dataFormat: ext.slice(1),
        md5ext,
        rate: data.rate,
        sampleCount: data.sampleCount,
      })
      console.log(
        chalk.cyan(
          '🎵 created sound',
          chalk.magenta(soundName),
          ':',
          soundPath,
          '→',
          md5ext
        )
      )
    }

    kind.match({
      SectionStage: (stageSection) => {
        const compileContext = new CompileContext(
          analyzeContext.currentScope,
          analyzeContext
        )
        stage.blocks = compile(compileContext, stageSection.items)
          .unwrapOrThrow()
          .toNodeArray()

        for (const item of stageSection.items) {
          item.kind.match({
            ItemCostume: (costume) => {
              const costumePath = costume.path.kind.expect('LitStr').value
              const costumeName = costume.name.kind.expect('LitStr').value

              assetsPromises.push(
                loadCostume(stageCostumes, costumePath, costumeName)
              )
            },
            ItemSound: (sound) => {
              const soundPath = sound.path.kind.expect('LitStr').value
              const soundName = sound.name.kind.expect('LitStr').value

              assetsPromises.push(loadSound(stage.sounds, soundPath, soundName))
            },
            _: () => {},
          })
        }
      },
      SectionSprite: (sprite) => {
        const costumes: NyairJSON['stage']['costumes'] = []
        const sounds: NyairJSON['stage']['sounds'] = []
        const name = sprite.name.kind.expect('LitStr').value

        const compilerContext = new CompileContext(
          analyzeContext.currentScope,
          analyzeContext
        )
        const nomList = compile(compilerContext, sprite.items).unwrapOrThrow()
        const blocks = nomList.toNodeArray()
        analyzeContext.stackBlocks.forEach((b) => blocks.unshift(b.toNode()))

        for (const item of sprite.items) {
          item.kind.match({
            ItemCostume: (costume) => {
              const costumePath = costume.path.kind.expect('LitStr').value
              const costumeName = costume.name.kind.expect('LitStr').value

              assetsPromises.push(
                loadCostume(costumes, costumePath, costumeName)
              )
            },
            ItemSound: (sound) => {
              const soundPath = sound.path.kind.expect('LitStr').value
              const soundName = sound.name.kind.expect('LitStr').value

              assetsPromises.push(loadSound(sounds, soundPath, soundName))
            },
            _: () => {},
          })
        }

        sprites.push({
          costumes,
          sounds,
          broadcasts: {},
          variables: [],
          lists: [],
          blocks,
          currentCostume: 0,
          volume: 100,
          layerOrder: sprites.length + 1,
          name,
          visible: true,
          x: 0,
          y: 0,
          size: 100,
          direction: 90,
          draggable: false,
          rotationStyle: 'all around',
        })
      },
      _: () => {},
    })
  }

  await Promise.all(assetsPromises)

  console.log(
    chalk.cyan(
      '🖼️  created stage (',
      'costumes:',
      stageCostumes.length,
      ', sounds:',
      stageSounds.length,
      ', blocks:',
      stage.blocks.length,
      ')'
    )
  )

  sprites.forEach((sprite) => {
    console.log(
      chalk.cyan(
        '😺 created sprite',
        chalk.yellow(sprite.name),
        '(',
        'costumes:',
        sprite.costumes.length,
        ', sounds:',
        sprite.sounds.length,
        ', blocks:',
        sprite.blocks.length,
        ')'
      )
    )
  })

  const nyair = new Nyair({
    version: '0',
    stage,
    sprites,
    extensions: ['pen'],
  })
  const compiler = new NyairCompiler([new ProcTransformer()])
  const projectJson = compiler.compile(nyair)

  await fs.writeFile(
    path.join(destPath, 'project.json'),
    JSON.stringify(projectJson, null, 2)
  )
  const elapsed = performance.now() - start

  console.log(chalk.green('✅ done in', `${Math.floor(elapsed)}ms`))
}
