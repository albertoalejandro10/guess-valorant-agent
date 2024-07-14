<template>
  <section
    v-if="isLoading || randomAgent?.uuid === null"
    class="flex flex-col items-center justify-center h-screen w-screen"
  >
    <h1 class="text-5xl font-bold text-red-900">Valorant Agent Game</h1>
    <h2 class="mt-3 text-3xl font-bold text-red-700 opacity-20 animate-pulse">
      Loading the game...
    </h2>
  </section>
  <section v-else class="flex flex-col items-center justify-center h-screen w-screen">
    <h1 class="text-3xl font-bold text-red-900">Who is this Valorant Agent?</h1>
    <div class="h-20">
      <button
        v-if="gameStatus !== GameStatus.Playing"
        @click="getNextRound(4)"
        class="bg-red-500 text-white p-2 rounded-md hover:bg-red-700 transition-all"
        data-test-id="new-game-button"
      >
        ¿Jugar de nuevo?
      </button>
    </div>
    <!-- Picture of Valorant Agent  -->
    <AgentPicture :agent-uuid="randomAgent.uuid" :show-agent="gameStatus !== GameStatus.Playing" />
    <!-- List of possible agents -->
    <AgentOptions
      :agents-options="agentsOptions"
      :block-selection="gameStatus !== GameStatus.Playing"
      :correct-answer="randomAgent.uuid"
      @selected-agent="checkAnswer"
    />
  </section>
</template>

<script setup lang="ts">
import AgentPicture from '@Valorant/components/AgentPicture.vue'
import AgentOptions from '@Valorant/components/AgentOptions.vue'

import { GameStatus } from '@Valorant/interfaces'

import { useValorantGame } from '@Valorant/composables/useValorantGame'

const {
  randomAgent,
  isLoading,
  gameStatus,
  agentsOptions,
  checkAnswer,
  // blockSelection,
  getNextRound
} = useValorantGame()
</script>
