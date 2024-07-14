import { agentValorantApi } from '@Valorant/API/AgentValorant'

describe('Agent Valorant API test', () => {
  it('Should be configure as expected', () => {
    const baseURL = 'https://valorant-api.com/v1'
    expect(agentValorantApi.defaults.baseURL).toBe(baseURL)
    expect(agentValorantApi.defaults.headers['Content-Type']).toBe('application/json')
  })
})
