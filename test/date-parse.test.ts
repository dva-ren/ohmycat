import { describe, expect, it } from 'vitest'
import { parse } from 'date-fns'
describe('date-fns', () => {
  it('parseISO', async () => {
    expect(parse('2022-11-9 20:10', 'yyyy-mm-d hh:mm', 0)).toMatchInlineSnapshot()
  })
})
