<template>
  <div class="FormPage">
    <div class="FormPage__main">
      <div class="FormPage__body">
        <div class="text-center">
          <h1 class="FormPage__title">{{ title }}</h1>
        </div>
        <slot></slot>

        <div class="mb-3 text-center" v-if="linkText">
          {{ linkText }}
          <router-link :to="linkUrl" class="text-primary">{{ linkName }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    linkName: {
      type: String,
      default: ''
    },
    linkUrl: {
      type: String,
      default: ''
    },
    linkText: {
      type: String,
      default: ''
    }
  })
</script>

<style lang="scss">
  @import '@/assets/scss/_common.scss';
  @import './FormPage.scss';
</style>
