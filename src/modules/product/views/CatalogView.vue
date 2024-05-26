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
  import axios from 'axios'

  const API_URL = import.meta.env.VITE_CTP_API_URL
  const AUTH_URL = import.meta.env.VITE_CTP_AUTH_URL
  const PROJECT_KEY = import.meta.env.VITE_CTP_PROJECT_KEY
  const PROJECT_ID = import.meta.env.VITE_CTP_CLIENT_ID
  const PROJECT_SECRET = import.meta.env.VITE_CTP_CLIENT_SECRET

  const responseData = ref()
  const count = ref()
  const dataProducts = ref()

  const getAnonymousToken = async () => {
    const authString = btoa(`${PROJECT_ID}:${PROJECT_SECRET}`)

    const response = await fetch(
      `${AUTH_URL}/oauth/ecommerceapplication/anonymous/token?grant_type=client_credentials`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch token')
    }

    const data = await response.json()
    return data.access_token
  }

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
  .p-card {
    cursor: pointer;
    height: 100%;
    border: 1px solid var(--gray-500);
    transition: all 0.3s;
    background: var(--gray-800);
    overflow: hidden;
    img {
      transition: all 0.3s;
    }
    &:hover {
      box-shadow: 0 -9px 20px -3px var(--blue-500);
      img {
        transform: scale(1.12);
      }
    }
  }
  .p-card-header {
    display: flex;
    position: relative;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    justify-content: center;
    background: var(--color-background);
  }
  .p-card-body {
    color: var(--gray-200);
    padding: 10px 20px 0px 20px;
  }
  .p-card-content {
    padding-top: 10px;
    p {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .catalog {
    &__prices-wrap {
      position: absolute;
      right: 10px;
      top: 10px;
      display: flex;
      flex-direction: column;
    }
    .original-price {
      text-decoration: line-through;
      background: transparent;
      color: var(--gray-400);
    }
    &__list {
      list-style-type: none;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      padding: 20px;
      .card-img {
        height: auto;
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
      }
    }
  }
</style>
