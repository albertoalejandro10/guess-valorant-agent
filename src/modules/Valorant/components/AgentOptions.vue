<template>
  <section class="mt-5 flex flex-col">
    <button
      v-for="{ uuid, name } in agentsOptions"
      @click="$emit('selectedAgent', uuid)"
      :key="uuid"
      :disabled="blockSelection"
      :class="[
        'capitalize',
        {
          correct: uuid === correctAnswer && blockSelection,
          wrong: uuid !== correctAnswer && blockSelection
        }
      ]"
    >
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import type { Agent } from '@/modules/Valorant/interfaces'

interface Props {
  agentsOptions: Agent[]
  blockSelection: boolean
  correctAnswer: string
}

defineProps<Props>()

defineEmits<{
  // Emits the selected agent when clicked
  selectedAgent: [uuid: string]
}>()
</script>

<style scoped>
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all duration-300 ease-in-out hover:bg-gray-100 disabled:cursor-not-allowed;
}

.correct {
  @apply bg-green-500 text-white opacity-100 hover:bg-green-900;
}

.wrong {
  @apply bg-red-100 text-white opacity-50;
}
</style>
