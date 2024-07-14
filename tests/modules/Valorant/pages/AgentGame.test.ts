import AgentGame from '@Valorant/views/AgentGame.vue'
import { mount } from '@vue/test-utils'

import { useValorantGame } from '@Valorant/composables/useValorantGame'
import type { Mock } from 'vitest'
import { GameStatus } from '@/modules/Valorant/interfaces'

vi.mock('@Valorant/composables/useValorantGame', () => ({
  useValorantGame: vi.fn()
}))

const valorantAgentsFake = [
  {
    uuid: 'e370fa57-4757-3604-3648-499e1f642d3f',
    name: 'Gekko'
  },
  {
    uuid: 'dade69b4-4f5a-8528-247b-219e5a1facd6',
    name: 'Fade'
  },
  {
    uuid: '5f8d3a7f-467b-97f3-062c-13acf203c006',
    name: 'Breach'
  },
  {
    uuid: 'cc8b64c8-4b25-4ff9-6e7f-37b4da43d235',
    name: 'Deadlock'
  }
]

describe('AgentGame Page Tests', () => {
  it('Should initialize with default values', async () => {
    ;(useValorantGame as Mock).mockReturnValue({
      randomAgent: null,
      isLoading: true,
      gameStatus: GameStatus.Playing,
      agentsOptions: [],
      checkAnswer: vi.fn(),
      getNextRound: vi.fn()
    })
    const wrapper = mount(AgentGame)

    expect(wrapper.get('h1').text()).toBe('Valorant Agent Game')
    expect(wrapper.get('h1').classes()).toEqual(['text-5xl', 'font-bold', 'text-red-900'])

    expect(wrapper.get('h2').text()).toBe('Loading the game...')
    expect(wrapper.get('h2').classes()).toEqual([
      'mt-3',
      'text-3xl',
      'font-bold',
      'text-red-700',
      'opacity-20',
      'animate-pulse'
    ])
  })

  it('Should render the game when the random agent is not null', async () => {
    ;(useValorantGame as Mock).mockReturnValue({
      randomAgent: valorantAgentsFake.at(0),
      isLoading: false,
      gameStatus: GameStatus.Playing,
      agentsOptions: valorantAgentsFake,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn()
    })
    const wrapper = mount(AgentGame)

    expect(wrapper.get('h1').text()).toBe('Who is this Valorant Agent?')
    expect(wrapper.get('h1').classes()).toEqual(['text-3xl', 'font-bold', 'text-red-900'])
  })

  it('Should render <AgentPicture /> and <AgentOptions /> when the random agent is not null', async () => {
    ;(useValorantGame as Mock).mockReturnValue({
      randomAgent: valorantAgentsFake.at(0),
      isLoading: false,
      gameStatus: GameStatus.Playing,
      agentsOptions: valorantAgentsFake,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn()
    })
    const wrapper = mount(AgentGame)
    const imagenUrl =
      'https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/fullportrait.png'
    expect(wrapper.find('img').attributes('src')).toBe(imagenUrl)

    const agents = valorantAgentsFake.map((agent) => agent.name)
    const buttons = wrapper.findAll('button')

    expect(buttons.length).toBe(agents.length)
    buttons.forEach((button) => {
      expect(agents).toContain(button.text())
    })
  })
  it('Should render button for a new game', async () => {
    ;(useValorantGame as Mock).mockReturnValue({
      randomAgent: valorantAgentsFake.at(0),
      isLoading: false,
      gameStatus: GameStatus.Won || GameStatus.Lost,
      agentsOptions: valorantAgentsFake,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn()
    })
    const wrapper = mount(AgentGame)

    const button = wrapper.find('[data-test-id="new-game-button"]')
    expect(button.text()).toBe('¿Jugar de nuevo?')
  })
  it('Should call the getNextRound function when the button is clicked', async () => {
    const spyGetNextRound = vi.fn()

    ;(useValorantGame as Mock).mockReturnValue({
      randomAgent: valorantAgentsFake.at(0),
      isLoading: false,
      gameStatus: GameStatus.Won || GameStatus.Lost,
      agentsOptions: valorantAgentsFake,
      checkAnswer: vi.fn(),
      getNextRound: spyGetNextRound
    })
    const wrapper = mount(AgentGame)
    const button = wrapper.find('[data-test-id="new-game-button"]')
    await button.trigger('click')

    expect(spyGetNextRound).toHaveBeenCalledWith(4)
  })
})
