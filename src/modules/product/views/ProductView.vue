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
              <p>{{ productData.description['en-US'] }}</p>
              <!-- 
              <h2>Price: {{ productData.value.price }}</h2>
              <Badge :value="productData.value.stock" severity="success" />
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
