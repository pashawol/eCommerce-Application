<template>
  <div class="product-page container" v-if="productData">
    <div class="p-grid">
      <div class="p-col-12">
        <!-- <Breadcrumb :home="breadcrumbItems.value[0]" :model="breadcrumbItems.value" /> -->
      </div>
      <Panel>
        <template #header>
          <h1>{{ productData.name['en-US'] }}</h1>
        </template>
        <div class="row">
          <div class="col-auto">
            <div :class="{ 'full-screen': fullScreen === true }">
              <Galleria
                ref="galleria"
                v-model:activeIndex="activeIndex"
                :value="productData.masterVariant.images"
                :numVisible="5"
                :showItemNavigators="true"
                :showItemNavigatorsOnHover="true"
                :circular="true"
                :transitionInterval="3000"
                :responsiveOptions="responsiveOptions"
                containerStyle="max-width: 640px"
                :pt="{
                  root: {
                    class: [{ 'flex flex-column fullScreen-block': fullScreen }]
                  },
                  content: {
                    class: ['relative', { 'flex-1 justify-content-center': fullScreen }]
                  },

                  thumbnailwrapper: ' w-full left-0 bottom-0'
                }"
              >
                <!-- :fullScreen="true" -->

                <!-- :fullScreen="true" -->
                <!-- :style="[
                  { width: !fullScreen ? '100%' : '', display: !fullScreen ? 'block' : '' }
                ]" -->
                <template #header>
                  <div
                    class="flex align-items-center justify-content-end bg-black-alpha-90 text-white absolute r-0 t-0"
                  >
                    <Button
                      :icon="fullScreenIcon"
                      @click="toggleFullScreen"
                      :pt="{
                        root: {
                          class:
                            'border-none border-noround ml-auto hover:bg-white-alpha-10 text-white',
                          style: 'background: transparent'
                        }
                      }"
                    />
                  </div>
                </template>
                <template #item="slotProps">
                  <img
                    @click="toggleFullScreen"
                    :src="slotProps.item.url"
                    :alt="slotProps.item.label"
                    style="width: 100%"
                  />
                </template>
                <template #thumbnail="slotProps">
                  <img :src="slotProps.item.url" :alt="slotProps.item.label" />
                </template>
              </Galleria>
            </div>

            <!-- {{ productData.masterData }} -->
            <!-- <img :src="" alt="Product Image" /> -->
          </div>
          <div class="col">
            <h2>
              Price:
              <Badge
                size="xlarge"
                v-if="productData.masterVariant.prices[0].discounted"
                :value="
                  (productData.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(2)
                "
                severity="success"
              />

              <span :class="{ strike: productData.masterVariant.prices[0].discounted }">
                {{ (productData.masterVariant.prices[0].value.centAmount / 100).toFixed(2) }}
              </span>
            </h2>
            <div class="description">
              <p>{{ productData.description['en-US'] }}</p>
            </div>
            <!-- <h2>Price: {{ productData.masterVariant.prices[0].value.centAmount }}</h2> -->
            <!-- 
              <p>
                <Button label="Add to Cart" icon="pi pi-shopping-cart" />
              </p> -->
          </div>
        </div>
      </Panel>
    </div>
  </div>
  <template v-else> <NotFoundView v-if="(serverAnswer = '404')" /> </template>
</template>

<script setup lang="ts">
  import NotFoundView from '@/views/NotFoundView.vue'
  import Panel from 'primevue/panel'
  import Galleria from 'primevue/galleria'
  import Badge from 'primevue/badge'
  import { ref, watchEffect, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const { id } = route.params as { id: string }
  // const router = useRouter()

  import { useCatalogStore } from '../store/CatalogStore'
  import { useGlobalStore } from '@/store/GlobalStore'
  import { storeToRefs } from 'pinia'

  const catalogStore = useCatalogStore()
  const globalStore = useGlobalStore()

  const { productData, serverAnswer } = storeToRefs(catalogStore)

  onMounted(() => {
    bindDocumentListeners()
  })
  watchEffect(() => {
    if (globalStore.token) {
      catalogStore.fetchProductById(id as string)
    }
  })

  const galleria = ref()
  // const images = ref();
  const activeIndex = ref(0)
  const fullScreen = ref(false)

  // const toggleAutoSlide = () => {
  //   isAutoPlay.value = !isAutoPlay.value
  // }
  // const onThumbnailButtonClick = () => {
  //   showThumbnails.value = !showThumbnails.value
  // }

  const responsiveOptions = ref([
    {
      breakpoint: '1300px',
      numVisible: 4
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ])

  const toggleFullScreen = () => {
    if (fullScreen.value) {
      closeFullScreen()
    } else {
      openFullScreen()
    }
  }
  const onFullScreenChange = () => {
    fullScreen.value = !fullScreen.value
  }
  const openFullScreen = () => {
    let elem = galleria.value.$el

    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen()
    }
  }
  const closeFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else {
      document.exitFullscreen()
    }
  }
  const bindDocumentListeners = () => {
    document.addEventListener('fullscreenchange', onFullScreenChange)
    document.addEventListener('mozfullscreenchange', onFullScreenChange)
    document.addEventListener('webkitfullscreenchange', onFullScreenChange)
    document.addEventListener('msfullscreenchange', onFullScreenChange)
  }
  const unbindDocumentListeners = () => {
    document.removeEventListener('fullscreenchange', onFullScreenChange)
    document.removeEventListener('mozfullscreenchange', onFullScreenChange)
    document.removeEventListener('webkitfullscreenchange', onFullScreenChange)
    document.removeEventListener('msfullscreenchange', onFullScreenChange)
  }

  const fullScreenIcon = computed(() => {
    return `pi ${fullScreen.value ? 'pi-window-minimize' : 'pi-window-maximize'}`
  })
</script>

<style lang="scss">
  @import '../assets/scss/product.scss';
  @import './CatalogView.scss';
</style>
