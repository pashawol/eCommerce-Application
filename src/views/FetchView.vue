<script setup lang="ts">
  import Card from 'primevue/card'
  import { onMounted, ref } from 'vue'

  const API_URL = import.meta.env.VITE_CTP_API_URL
  const PROJECT_KEY = import.meta.env.VITE_CTP_PROJECT_KEY
  const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN

  const responseData = ref()
  const count = ref()
  const dataProducts = ref()

  console.log(API_URL)

  /* const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "••••••");

const raw = "";

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.eu-central-1.aws.commercetools.com/ecommerceapplication/products", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error)); */

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/${PROJECT_KEY}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`
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

<template>
  <h1>Count Of Products: {{ count }}</h1>
  <ul>
    <li v-for="(product, index) in dataProducts" :key="index">
      <Card>
        <template #title>{{ product.masterData.current.name['en-US'] }}</template>
        <template #content>
          <p class="m-0">
            {{ product.masterData.current.description['en-US'] }}
          </p>
        </template>
      </Card>
    </li>
  </ul>
</template>
