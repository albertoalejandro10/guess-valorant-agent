import { GameStatus } from '@/modules/Valorant/interfaces'

describe('Game Status Enum test', () => {
  it('Should be have all expected values', () => {
    expect(Object.values(GameStatus)).toEqual(['playing', 'won', 'lost'])
  })
})
