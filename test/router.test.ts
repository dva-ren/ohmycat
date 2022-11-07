import { describe, expect, it } from 'vitest'

describe('router', () => {
  it('route', async () => {
    expect([1, 2, 3, 4, 5]).toMatchInlineSnapshot(`
      [
        1,
        2,
        3,
        4,
        5,
      ]
    `)
  })
})

