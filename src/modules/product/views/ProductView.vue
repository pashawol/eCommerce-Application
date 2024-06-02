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
        <Card>
          <div class="row">
            <div class="col-auto">
              <Galleria :value="productData.masterVariant.images" :numVisible="5">
                <template #item="slotProps">
                  <img :src="slotProps.item.url" :alt="slotProps.item.label" style="width: 100%" />
                </template>
                <template #thumbnail="slotProps">
                  <img :src="slotProps.item.url" :alt="slotProps.item.label" />
                </template>
              </Galleria>

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
                    (productData.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(
                      2
                    )
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
        </Card>
      </Panel>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Panel from 'primevue/panel'
  import Galleria from 'primevue/galleria'
  import Badge from 'primevue/badge'
  import { ref, onMounted, watchEffect } from 'vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const id = route.params.id

  import { useCatalogStore } from '../store/CatalogStore'
  import { useGlobalStore } from '@/store/GlobalStore'
  import { storeToRefs } from 'pinia'

  const catalogStore = useCatalogStore()
  const globalStore = useGlobalStore()

  const { productData } = storeToRefs(catalogStore)

  watchEffect(() => {
    if (globalStore.token) {
      catalogStore.fetchProductById(id as string)
    }
  })
</script>

<style lang="scss">
  @import '../assets/scss/product.scss';
  @import './CatalogView.scss';
</style>
