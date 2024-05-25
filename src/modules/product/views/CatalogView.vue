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
  import { onMounted, ref } from 'vue'
  // import axios from 'axios'

  const API_URL = import.meta.env.VITE_CTP_API_URL
  const PROJECT_KEY = import.meta.env.VITE_CTP_PROJECT_KEY
  // const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN

  const responseData = ref()
  const count = ref()
  const dataProducts = ref()

  console.log(API_URL)

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/${PROJECT_KEY}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ieUcEJ0yUIhyRY2itTZg7Y9kp862S5hJ`
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
    img {
      transition: all 0.3s;
    }
    &:hover {
      box-shadow: 0 -9px 20px -3px var(--blue-500);
      img {
        transform: scale(1.1);
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
  .p-card-content {
    p {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .catalog {
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
