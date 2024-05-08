<template>
  <div class="FormPage">
    <div class="FormPage__main">
      <div class="FormPage__body">
        <div class="text-center">
          <h1 class="FormPage__title">{{ title }}</h1>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      default: ''
    }
  })
</script>

<style lang="scss">
  @import '@/assets/scss/_common.scss';
  @import './FormPage.scss';
</style>
