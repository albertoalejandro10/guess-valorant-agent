<template>
  <section>
    <img v-if="!showAgent" :src="agentImage" alt="Valorant Agent" class="h-[300px] brightness-0" />
    <img v-else :src="agentImage" alt="Valorant Agent" class="fade-in h-[300px]" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  agentUuid: string
  showAgent: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showAgent: false
})

const agentImage = computed(() => {
  return `https://media.valorant-api.com/agents/${props.agentUuid}/fullportrait.png`
})
</script>

<style scoped>
img {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
}
</style>
