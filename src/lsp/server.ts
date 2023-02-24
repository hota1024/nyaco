import {
  createConnection,
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  ProposedFeatures,
  InitializeParams,
  DidChangeConfigurationNotification,
  CompletionItem,
  CompletionItemKind,
  TextDocumentPositionParams,
  TextDocumentSyncKind,
  InitializeResult,
  DocumentHighlight,
  DocumentHighlightKind,
  Range,
  SemanticTokensRequest,
  SemanticTokensDeltaRequest,
  SemanticTokensBuilder,
  SemanticTokensLegend,
} from 'vscode-languageserver/node.js'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { Lexer } from '@/lexer/Lexer'
import { Token, TokenKindVariants } from '@/tokens'
import { getTokenTypeIndex, tokenModifiers, tokenTypes } from './legend'
import { None, Ok, Opt, Result, Some } from 'rs-enums'
import { ParseError } from '@/parser/error'
import { parse } from '@/parser/parse'
import { ParserContext } from '@/parser/context'
import { AnalyzeContext } from '@/analyzer/context'
import { createCoreScope } from '@/scope/core'
import { analyze } from '@/analyzer'
import { createRootScope } from '@/cli/createRootScope'

const connection = createConnection(ProposedFeatures.all)
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument)

let hasConfigurationCapability = false
let hasWorkspaceFolderCapability = false
let hasDiagnosticRelatedInformationCapability = false

connection.onInitialize((params: InitializeParams) => {
  const capabilities = params.capabilities

  hasConfigurationCapability = !!(
    capabilities.workspace && !!capabilities.workspace.configuration
  )
  hasWorkspaceFolderCapability = !!(
    capabilities.workspace && !!capabilities.workspace.workspaceFolders
  )
  hasDiagnosticRelatedInformationCapability = !!(
    capabilities.textDocument &&
    capabilities.textDocument.publishDiagnostics &&
    capabilities.textDocument.publishDiagnostics.relatedInformation
  )

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      hoverProvider: true,
      semanticTokensProvider: {
        legend: {
          tokenTypes: tokenTypes as unknown as string[],
          tokenModifiers: tokenModifiers as unknown as string[],
        },
        full: true,
        range: false,
      },
    },
  }
  if (hasWorkspaceFolderCapability) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true,
      },
    }
  }
  return result
})

connection.onInitialized(() => {
  if (hasConfigurationCapability) {
    connection.client.register(
      DidChangeConfigurationNotification.type,
      undefined
    )
  }
  if (hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders(() => {
      connection.console.log('Workspace folder change event received.')
    })
  }
})

documents.onDidChangeContent((change) => {
  validateTextDocument(change.document)
})

const lexer = new Lexer()
let tokens: Token[] = []
let parserError: Opt<ParseError> = None()
let analyzeContext: AnalyzeContext

const validateTextDocument = async (textDocument: TextDocument) => {
  const [newTokens, errors] = lexer.tokenize(textDocument.getText())
  tokens = newTokens

  const parserContext = new ParserContext(tokens)
  const result = parse(parserContext)

  analyzeContext = new AnalyzeContext(createRootScope(), parserContext)

  result.match({
    Ok: (node) => {
      analyze(analyzeContext, node)
      parserError = None()
    },
    Err: (err) => {
      parserError = Some(err)
    },
  })

  const diagnostics: Diagnostic[] = []

  for (const error of errors) {
    const diagnostic: Diagnostic = {
      severity: DiagnosticSeverity.Error,
      range: {
        start: textDocument.positionAt(error.span.start),
        end: textDocument.positionAt(error.span.end),
      },
      message: error.message,
      source: 'nyaco lexer',
    }

    diagnostics.push(diagnostic)
  }

  if (parserError.isSome()) {
    const diagnostic: Diagnostic = {
      severity: DiagnosticSeverity.Error,
      range: {
        start: textDocument.positionAt(parserError.unwrap().span.start),
        end: textDocument.positionAt(parserError.unwrap().span.end),
      },
      message: parserError.unwrap().message,
      source: 'nyaco parser',
    }

    diagnostics.push(diagnostic)
  }

  for (const error of analyzeContext.errors) {
    const diagnostic: Diagnostic = {
      severity: DiagnosticSeverity.Error,
      range: {
        start: textDocument.positionAt(error.span.start),
        end: textDocument.positionAt(error.span.end),
      },
      message: error.message,
      source: 'nyaco analyzer',
    }

    diagnostics.push(diagnostic)
  }

  connection.sendDiagnostics({ uri: textDocument.uri, diagnostics })
}

connection.languages.semanticTokens.on((params) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const textDocument = documents.get(params.textDocument.uri)!

  const tokensBuilder = new SemanticTokensBuilder()

  for (const token of tokens) {
    const pos = textDocument.positionAt(token.span.start)
    const len = token.span.end - token.span.start
    const type: Opt<number> = token.meta?.legendTokenType
      ? Some(getTokenTypeIndex(token.meta.legendTokenType))
      : token.kind.match({
          Ident: () => Some(getTokenTypeIndex('variable')),
          LitStr: () => Some(getTokenTypeIndex('string')),
          LitNum: () => Some(getTokenTypeIndex('number')),
          LitColor: () => Some(getTokenTypeIndex('number')),
          LitBool: () => Some(getTokenTypeIndex('keyword')),
          InlineComment: () => Some(getTokenTypeIndex('comment')),
          _: () => {
            if (token.kind.isOp()) {
              return Some(getTokenTypeIndex('operator'))
            } else if (token.kind.isKeyword()) {
              return Some(getTokenTypeIndex('keyword'))
            } else if (token.kind.isType()) {
              return Some(getTokenTypeIndex('type'))
            } else {
              return None()
            }
          },
        })

    if (type.isSome()) {
      tokensBuilder.push(
        pos.line,
        pos.character,
        len,
        type.takeVariantValue(),
        0
      )
    }
  }

  return tokensBuilder.build()
})

connection.onHover((params) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const textDocument = documents.get(params.textDocument.uri)!
  const pos = params.position
  let range: Range | undefined

  const token = tokens.find((token) => {
    const start = textDocument.positionAt(token.span.start)
    const end = textDocument.positionAt(token.span.end)

    range = {
      start,
      end,
    }
    return (
      pos.line === start.line &&
      pos.character >= start.character &&
      pos.line === end.line &&
      pos.character <= end.character - 1
    )
  })

  const contents: string[] = []

  if (token) {
    const entity = token.meta?.entity

    if (entity) {
      entity.kind.match({
        Fn(value) {
          contents.push(
            `(function) ${entity.name}(${value.args
              .map((arg) => `${arg.name}: ${arg.ty}`)
              .join(', ')}): ${value.retTy}`
          )
        },
        ScratchVar(value) {
          contents.push(`(scratch variable) ${entity.name}: ${value.ty}`)
        },
        Var() {
          contents.push(`(variable) ${entity.name}`)
        },
        List() {
          contents.push(`(list) ${entity.name}`)
        },
        Scope(value) {
          contents.push(
            `(namespace) ${entity.name} (${value.scope.entities.length} entities)`
          )
        },
        Proc(value) {
          contents.push(
            `(procedure) ${entity.name}(${value.args
              .map((arg) => `${arg.name}: ${arg.ty}`)
              .join(', ')})`
          )
        },
        ProcParam(value) {
          contents.push(`(procedure parameter) ${entity.name}: ${value.ty}`)
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        _() {},
      })
    } else {
      contents.push(`(token) ${token.kind.getVariant()}`)
    }
  }

  return {
    contents,
    range,
  }
})

documents.listen(connection)
connection.listen()
