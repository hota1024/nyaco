import { AnalyzeContext } from '@/analyzer/context'
import { Node } from '@/ast'
import { CompileError } from '@/compiler/error'
import { Scope } from '@/scope'
import { Entity } from '@/scope/Entity'

export class CompileContext {
  public currentScope: Scope

  constructor(
    public readonly rootScope: Scope,
    public analyzeContext: AnalyzeContext
  ) {
    this.currentScope = rootScope
  }

  resolveScopeEntity(node: Node): Entity {
    return node.kind.match({
      Ident: (value) => {
        return this.currentScope.get(value.ident).match({
          Some: (entity) => {
            return entity
          },
          None: () => {
            throw new CompileError(`undefined \`${value.ident}\``, node.span)
          },
        })
      },
      Path: ({ segments }) => {
        let scope = this.currentScope

        for (const segment of segments.slice(0, -1)) {
          const ident = segment.kind.expect('Ident')
          scope = scope.get(ident.ident).match({
            Some: (entity) => {
              return entity.kind.match({
                Scope({ scope }) {
                  return scope
                },
                _: () => {
                  throw new CompileError(
                    `\`${ident.ident}\` is not a scope`,
                    segment.span
                  )
                },
              })
            },
            None: () => {
              throw new CompileError(
                `undefined \`${ident.ident}\``,
                segment.span
              )
            },
          })
        }

        const lastSegment = segments[segments.length - 1]
        const entity = scope.get(lastSegment.kind.expect('Ident').ident).match({
          Some(entity) {
            return entity
          },
          None: () => {
            throw new CompileError(
              `undefined \`${lastSegment.kind.expect('Ident').ident}\``,
              lastSegment.span
            )
          },
        })

        return entity
      },
      _: () => {
        throw new Error(
          `expect identifier or path, but got \`${node.kind.getVariant()}\``
        )
      },
    })
  }
}
