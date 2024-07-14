import { type Agent } from '@/modules/Valorant/interfaces'

describe('Agent properties test', () => {
  const agent: Agent = {
    uuid: '12345678-1234-1234-1234-123456789012',
    name: 'Agent Name'
  }
  it('Should have an uuid property of type string', () => {
    expect(agent).toHaveProperty('uuid')
  })
  it('Should have a name property of type string', () => {
    expect(agent).toHaveProperty('name')
  })
})
