import { flushPromises } from '@vue/test-utils'
import MockAdapter from 'axios-mock-adapter'
import confetti from 'canvas-confetti'

import { GameStatus } from '@/modules/Valorant/interfaces'
import { useValorantGame } from '@Valorant/composables/useValorantGame'
import { agentValorantApi } from '@Valorant/API/AgentValorant'

import { withSetup } from '../../../utils/with-setup'
import { agentListFake } from '../../../data/fake-agentList'

const mockAgentAPI = new MockAdapter(agentValorantApi)

mockAgentAPI.onGet('/agents').reply(200, {
  data: agentListFake
})

vi.mock('canvas-confetti', () => ({
  default: vi.fn()
}))

describe('useValorantGame Composable test', () => {
  it('Should initialize with the correct values default values', async () => {
    const [result] = withSetup(useValorantGame)

    expect(result.gameStatus.value).toBe(GameStatus.Playing)
    expect(result.isLoading.value).toBe(true)
    expect(result.agentsOptions.value).toEqual([])
    expect(result.randomAgent.value).toBe(undefined)

    await flushPromises()

    expect(result.isLoading.value).toBe(false)
    expect(result.agentsOptions.value.length).toBe(4)
    expect(result.randomAgent.value).toEqual({
      uuid: expect.any(String),
      name: expect.any(String)
    })
  })
  it('Should correctly handle the function getNextRound', async () => {
    const [result] = withSetup(useValorantGame)
    await flushPromises()
    result.gameStatus.value = GameStatus.Won
    // Stimulate
    result.getNextRound(4)
    expect(result.gameStatus.value).toBe(GameStatus.Playing)
    // console.log(result.agentsOptions.value)
    expect(result.agentsOptions.value).toHaveLength(4)
  })
  it('Should correctly handle the function getNextRound and return different agents', async () => {
    const [result] = withSetup(useValorantGame)
    await flushPromises()

    result.gameStatus.value = GameStatus.Won

    // Stimulate
    const firstOptions = [...result.agentsOptions.value].map((item) => item.uuid)
    result.getNextRound()
    const secondsOptions = [...result.agentsOptions.value].map((item) => item.uuid)
    secondsOptions.forEach((agent) => {
      expect(firstOptions).not.toContain(agent.uuid)
    })
  })

  it('Should correctly handle the function checkAnswer when the agent is incorrect', async () => {
    const [result] = withSetup(useValorantGame)
    await flushPromises()

    const { checkAnswer, gameStatus } = result
    expect(gameStatus.value).toBe(GameStatus.Playing)
    checkAnswer('12345678-1234-1234-1234-123456789012')
    expect(gameStatus.value).toBe(GameStatus.Lost)
  })

  it('Should correctly handle the function checkAnswer when the agent is correct', async () => {
    const [result] = withSetup(useValorantGame)
    await flushPromises()

    const { checkAnswer, gameStatus, randomAgent } = result
    expect(gameStatus.value).toBe(GameStatus.Playing)
    checkAnswer(randomAgent.value.uuid)
    expect(confetti).toHaveBeenCalled()
    expect(confetti).toHaveBeenCalledWith({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 }
    })
    expect(gameStatus.value).toBe(GameStatus.Won)
  })
})
