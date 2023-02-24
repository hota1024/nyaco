import * as path from 'path'
import { workspace, ExtensionContext } from 'vscode'
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node'
import * as vscode from 'vscode'

let client: LanguageClient

export const activate = (context: ExtensionContext) => {
  const serverModule = context.asAbsolutePath(path.join('dist/lsp/server.js'))
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] }
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'nyaco' }],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher('**/.clientrc'),
    },
  }

  client = new LanguageClient(
    'nyaco',
    'Nyaco Language Server',
    serverOptions,
    clientOptions
  )

  client.start()
}

export const deactivate = () => {
  if (client) return client.stop()
}
