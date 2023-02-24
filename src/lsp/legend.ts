export const tokenTypes = [
  'namespace',
  'type',
  'class',
  'enum',
  'interface',
  'struct',
  'typeParameter',
  'parameter',
  'variable',
  'property',
  'enumMember',
  'event',
  'function',
  'method',
  'macro',
  'keyword',
  'modifier',
  'comment',
  'string',
  'number',
  'regexp',
  'operator',
  'decorator',
] as const

export const tokenModifiers = [
  // 'declaration',
  // 'definition',
  // 'readonly',
  // 'static',
  // 'deprecated',
  // 'abstract',
  // 'async',
  // 'modification',
  // 'documentation',
  // 'defaultLibrary',
] as const

export const getTokenTypeIndex = (type: (typeof tokenTypes)[number]) => {
  return tokenTypes.indexOf(type)
}

export const getTokenModifierIndex = (
  modifier: (typeof tokenModifiers)[number]
) => {
  return tokenModifiers.indexOf(modifier)
}
