import { Node } from '@/ast'
import { ParserContext } from '@/parser/context'
import { Scope } from '@/scope'
import { Entity } from '@/scope/Entity'
import { List, Variable } from 'nyair'
import { Err, Ok, Result } from 'rs-enums'
import { AnalyzeError } from './error'

export class AnalyzeContext {
  public currentScope: Scope
  public readonly errors: AnalyzeError[] = []
  public readonly globalVariables: Variable[] = []
  public readonly globalLists: List[] = []
  public readonly broadcasts: Set<string> = new Set()

  constructor(
    public readonly rootScope: Scope,
    public readonly parserContext: ParserContext
  ) {
    this.currentScope = rootScope
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
