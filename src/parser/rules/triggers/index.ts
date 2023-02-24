import { ParseError } from '@/parser/error'
import { ParserRule } from '@/parser/ParserRule'
import { expectTriggerWhenBackdropSwitches } from './TriggerWhenBackdropSwitches'
import { expectTriggerWhenClicked } from './TriggerWhenClicked'
import { expectTriggerWhenFlagClicked } from './TriggerWhenFlagClicked'
import { expectTriggerWhenGreaterThan } from './TriggerWhenGreaterThan'
import { expectTriggerWhenKeyPressed } from './TriggerWhenKeyPressed'
import { expectTriggerWhenReceive } from './TriggerWhenReceive'
import { expectTriggerWhenStartAsClone } from './TriggerWhenStartAsClone'

export const parseTrigger: ParserRule = (c) => {
  const peek = c.peek()

  return peek.kind.match({
    KeywordWhenFlagClicked: () => expectTriggerWhenFlagClicked(c),
    KeywordWhenKeyPressed: () => expectTriggerWhenKeyPressed(c),
    KeywordWhenClicked: () => expectTriggerWhenClicked(c),
    KeywordWhenBackdropSwitches: () => expectTriggerWhenBackdropSwitches(c),
    KeywordWhenGreaterThan: () => expectTriggerWhenGreaterThan(c),
    KeywordWhenReceive: () => expectTriggerWhenReceive(c),
    KeywordWhenStartAsClone: () => expectTriggerWhenStartAsClone(c),
    _: () => {
      throw new ParseError(
        `expect trigger, but got \`${
          peek.literal
        }(${peek.kind.getVariant()})\``,
        peek.span
      )
    },
  })
}
