<template>
  <div class="catalog">
    <h1>Catalog</h1>
    <h1>Count Of Products: {{ count }}</h1>
    <ul class="catalog__list">
      <li v-for="(product, index) in dataProducts" :key="index">
        <Card>
          <template #header>
            <img
              class="card-img"
              alt="card-img"
              :src="product.masterData.current.masterVariant.images[0].url"
            />
            <div class="catalog__prices-wrap">
              <Badge
                v-if="product.masterData.current.masterVariant.prices[0].discounted"
                :value="
                  (
                    product.masterData.current.masterVariant.prices[0].discounted.value.centAmount /
                    100
                  ).toFixed(2)
                "
              >
              </Badge>
              <Badge
                :class="{
                  'original-price': product.masterData.current.masterVariant.prices[0].discounted
                }"
                :value="
                  (
                    product.masterData.current.masterVariant.prices[0].value.centAmount / 100
                  ).toFixed(2)
                "
              >
              </Badge>
            </div>
          </template>
          <template #title>{{ product.masterData.current.name['en-US'] }}</template>
          <template #content>
            <p class="m-0">
              {{ product.masterData.current.description['en-US'] }}
            </p>
          </template>
        </Card>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import Card from 'primevue/card'
  import Badge from 'primevue/badge'
  import { onMounted, ref } from 'vue'
  import { getAnonymousToken } from '../services/getToken'
  import axios from 'axios'

  const API_URL = import.meta.env.VITE_CTP_API_URL
  const PROJECT_KEY = import.meta.env.VITE_CTP_PROJECT_KEY

  const responseData = ref()
  const count = ref()
  const dataProducts = ref()

  const fetchProducts = async () => {
    try {
      const token = await getAnonymousToken()

      const response = await fetch(`${API_URL}/${PROJECT_KEY}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      responseData.value = await response.json()
      count.value = responseData.value.count
      dataProducts.value = responseData.value.results
    } catch (err) {
      console.error('Error fetching data:', err)
      throw err
    }
  }

  onMounted(() => {
    fetchProducts()

    console.log(responseData)
  })
</script>

<style lang="scss">
  @import './CatalogView.scss';
</style>
