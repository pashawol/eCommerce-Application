<script setup lang="ts">
  import { defineProps, defineAsyncComponent } from 'vue'

  const props = defineProps({
    name: {
      type: String
    }
  })

  const icon = defineAsyncComponent(() => import(`@assets/svg/${props.name}.svg`))
</script>

<template>
  <component :is="icon" class="fill-current" />
</template>
