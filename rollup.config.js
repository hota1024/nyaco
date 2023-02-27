import ts from 'rollup-plugin-ts'
import pkg from './package.json'
import eslint from '@rollup/plugin-eslint'
import json from '@rollup/plugin-json'
import { builtinModules } from 'module'

export default [
  {
    input: 'src/cli/main.ts',
    output: [
      {
        file: 'dist/cli/cli.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      // eslint(),
      json(),
      ts({
        transpileOnly: true,
      }),
    ],
    external: [
      ...builtinModules,
      ...(pkg.dependencies == null ? [] : Object.keys(pkg.dependencies)),
      ...(pkg.devDependencies == null ? [] : Object.keys(pkg.devDependencies)),
      ...(pkg.peerDependencies == null
        ? []
        : Object.keys(pkg.peerDependencies)),
    ],
  },
  {
    input: 'src/lsp/server.ts',
    output: [
      {
        file: 'dist/lsp/server.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      // eslint(),
      ts({
        transpileOnly: true,
      }),
    ],
    external: [
      ...builtinModules,
      ...(pkg.dependencies == null ? [] : Object.keys(pkg.dependencies)),
      ...(pkg.devDependencies == null ? [] : Object.keys(pkg.devDependencies)),
      ...(pkg.peerDependencies == null
        ? []
        : Object.keys(pkg.peerDependencies)),
    ],
  },
  {
    input: 'src/extension/extension.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      // eslint(),
      ts({
        transpileOnly: true,
      }),
    ],
    external: [
      ...builtinModules,
      ...(pkg.dependencies == null ? [] : Object.keys(pkg.dependencies)),
      ...(pkg.devDependencies == null ? [] : Object.keys(pkg.devDependencies)),
      ...(pkg.peerDependencies == null
        ? []
        : Object.keys(pkg.peerDependencies)),
    ],
  },
]
