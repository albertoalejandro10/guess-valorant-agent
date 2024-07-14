import { computed, onMounted, ref } from 'vue'

import { GameStatus, type Agent, type AgentListResponse } from '@/modules/Valorant/interfaces'
import { agentValorantApi } from '../API/AgentValorant'

import confetti from 'canvas-confetti'

export const useValorantGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing)
  const agents = ref<Agent[]>([])
  const agentsOptions = ref<Agent[]>([])

  // const blockSelection = ref(false)

  const randomAgent = computed(() => {
    const randomIndex = Math.floor(Math.random() * agentsOptions.value.length)
    return agentsOptions.value[randomIndex]
  })

  const isLoading = computed(() => agents.value.length === 0)

  const getAgents = async (): Promise<Agent[]> => {
    const response = await agentValorantApi.get<AgentListResponse>('/agents')

    // Manejo de errores basado en el status de la respuesta
    if (response.status !== 200) {
      throw new Error(`Error fetching agents: ${response.statusText}`)
    }

    // Filtrar si los agentes son jugables
    const findIsPlayableCharacter = response.data.data.filter((agent) => agent.isPlayableCharacter)

    // Mapeo simplificado utilizando desestructuración en el parámetro del callback
    const valorantAgentsArray = findIsPlayableCharacter.map(({ uuid, displayName: name }) => ({
      uuid,
      name
    }))

    return valorantAgentsArray.sort(() => Math.random() - 0.5)
  }

  const getNextRound = async (howMany: number = 4) => {
    if (agents.value.length === 4) {
      agents.value = await getAgents()
    }
    gameStatus.value = GameStatus.Playing
    agentsOptions.value = agents.value.slice(0, howMany)
    agents.value = agents.value.slice(howMany)
  }

  const checkAnswer = (uuid: string) => {
    // blockSelection.value = true
    const hasWon = uuid === randomAgent.value.uuid
    if (hasWon) {
      gameStatus.value = GameStatus.Won
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.5 }
      })
      return
    }
    gameStatus.value = GameStatus.Lost
  }

  onMounted(async () => {
    agents.value = await getAgents()
    getNextRound()
  })

  return {
    gameStatus,
    isLoading,
    agentsOptions,
    randomAgent,
    // blockSelection,

    // Methods
    getNextRound,
    checkAnswer
  }
}
