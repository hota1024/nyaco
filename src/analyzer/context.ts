import { Node } from '@/ast'
import { ParserContext } from '@/parser/context'
import { Scope } from '@/scope'
import { Entity } from '@/scope/Entity'
import { createNom, createNomList, createUID, List, NOM, Variable } from 'nyair'
import { Err, Ok, Result } from 'rs-enums'
import { AnalyzeError } from './error'

export class AnalyzeContext {
  public currentScope: Scope
  public readonly errors: AnalyzeError[] = []
  public readonly globalVariables: Variable[] = []
  public readonly globalLists: List[] = []
  public readonly broadcasts: Set<string> = new Set()

  private isCreatedStacks = false
  public readonly symbolStackAlloc = `🐾 | mem::stack::alloc ${createUID()}`
  public readonly symbolStackFree = `🐾 | mem::stack::free ${createUID()}`
  public readonly symbolStack0 = `🐾 | mem::stack ${createUID()}`
  public readonly stackBlocks: NOM[] = []

  constructor(
    public readonly rootScope: Scope,
    public readonly parserContext: ParserContext
  ) {
    this.currentScope = rootScope
  }

  createStacksIfNotExists() {
    if (this.isCreatedStacks) return
    this.isCreatedStacks = true

    this.globalLists.push({
      name: this.symbolStack0,
      initialValue: [],
    })

    this.stackBlocks.push(
      createNom('$proc_def', {
        name: this.symbolStackAlloc,
        schema: [
          {
            type: 'label',
            text: this.symbolStackAlloc,
          },
          {
            type: 'string_number',
            name: 'size',
          },
          {
            type: 'string_number',
            name: 'init',
          },
        ],
        warp: true,
        body: createNomList([
          createNom('control_repeat', {
            times: createNom('$proc_arg', {
              name: 'size',
            }),
            substack: createNomList([
              createNom('data_addtolist', {
                list: this.symbolStack0,
                item: createNom('$proc_arg', {
                  name: 'init',
                }),
              }),
            ]),
          }),
        ]),
      })
    )

    this.stackBlocks.push(
      createNom('$proc_def', {
        name: this.symbolStackFree,
        schema: [
          {
            type: 'label',
            text: this.symbolStackFree,
          },
          {
            type: 'string_number',
            name: 'size',
          },
        ],
        warp: true,
        body: createNomList([
          createNom('control_repeat', {
            times: createNom('$proc_arg', {
              name: 'size',
            }),
            substack: createNomList([
              createNom('data_deleteoflist', {
                list: this.symbolStack0,
                index: createNom('data_lengthoflist', {
                  list: this.symbolStack0,
                }),
              }),
            ]),
          }),
        ]),
      })
    )
  }

  resolveScopeEntity(node: Node): Result<Entity | Entity[], AnalyzeError> {
    return node.kind.match({
      Ident: (value) => {
        return this.currentScope.get(value.ident).match({
          Some: (entity) => {
            const token = value.token
            token.meta = {
              ...token.meta,
              entity,
            }
            return Ok<Entity, AnalyzeError>(entity)
          },
          None: () => {
            return Err<Entity, AnalyzeError>(
              new AnalyzeError(`undefined \`${value.ident}\``, node.span)
            )
          },
        })
      },
      Path: ({ segments }) => {
        let scope = this.currentScope

        try {
          for (const segment of segments.slice(0, -1)) {
            const ident = segment.kind.expect('Ident')
            scope = scope.get(ident.ident).match({
              Some: (entity) => {
                const token = ident.token
                token.meta = {
                  ...token.meta,
                  entity,
                }

                return entity.kind.match({
                  Scope({ scope }) {
                    return scope
                  },
                  _: () => {
                    throw new AnalyzeError(
                      `\`${ident.ident}\` is not a scope`,
                      segment.span
                    )
                  },
                })
              },
              None: () => {
                throw new AnalyzeError(
                  `undefined \`${ident.ident}\``,
                  segment.span
                )
              },
            })
          }
        } catch (err) {
          if (err instanceof AnalyzeError) {
            return Err<Entity, AnalyzeError>(err)
          } else {
            throw err
          }
        }

        const lastSegment = segments[segments.length - 1]

        if (lastSegment.kind.matches('PathWild')) {
          return Ok<Entity[], AnalyzeError>(scope.entities)
        }

        const entity = scope.get(lastSegment.kind.expect('Ident').ident).match({
          Some(entity) {
            const token = lastSegment.kind.expect('Ident').token
            token.meta = {
              ...token.meta,
              entity,
            }

            return Ok<Entity, AnalyzeError>(entity)
          },
          None: () => {
            return Err<Entity, AnalyzeError>(
              new AnalyzeError(
                `undefined \`${lastSegment.kind.expect('Ident').ident}\``,
                lastSegment.span
              )
            )
          },
        })

        return entity
      },
      _: () => {
        return Err<Entity, AnalyzeError>(
          new AnalyzeError(
            `expect identifier or path, but got \`${node.kind.getVariant()}\``,
            node.span
          )
        )
      },
    })
  }
}
