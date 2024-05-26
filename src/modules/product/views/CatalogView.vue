<template>
  <div class="catalog">
    <h1>Catalog</h1>
    <h1>Count Of Products: {{ count }}</h1>
    <div class="CategoriesView">
      <div
        class="CategoriesView__main-category"
        v-for="category in classificatedCategories"
        :key="category.id"
      >
        <button @click="toggleSubcategories(category)">
          {{ category.name['en-US'] }}
        </button>
        <div class="CategoriesView__subcategories" v-if="isSubcategoriesVisible(category)">
          <div>
            <button @click="fetchCategoryProducts(category.id)" class="all">View All</button>
          </div>
          <div v-for="subcategory in category.subcategories" :key="subcategory.id">
            <button @click="fetchCategoryProducts(subcategory.id)">
              {{ subcategory.name['en-US'] }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <ul class="catalog__list">
      <li v-for="(product, index) in dataProducts" :key="index">
        <Card>
          <template #header>
            <img class="card-img" alt="card-img" :src="product.masterVariant.images[0].url" />
            <div class="catalog__prices-wrap">
              <Badge
                v-if="product.masterVariant.prices[0].discounted"
                :value="
                  (product.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(2)
                "
              >
              </Badge>
              <Badge
                :class="{
                  'original-price': product.masterVariant.prices[0].discounted
                }"
                :value="(product.masterVariant.prices[0].value.centAmount / 100).toFixed(2)"
              >
              </Badge>
            </div>
          </template>
          <template #title>{{ product.name['en-US'] }}</template>
          <template #content>
            <p class="m-0">
              {{ product.description['en-US'] }}
            </p>
          </template>
        </Card>
      </li>
      <!-- <li v-for="(product, index) in dataProducts" :key="index">
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
      </li> -->
    </ul>
  </div>
</template>

<script setup lang="ts">
  import Card from 'primevue/card'
  import Badge from 'primevue/badge'
  import { onMounted, ref } from 'vue'
  import { getAnonymousToken } from '../services/getToken'
  import { type Category } from '../interfaces/category'
  import { type Product } from '../interfaces/product'
  import { organizeCategories } from '../services/categorization'
  import axios from 'axios'

  const API_URL = import.meta.env.VITE_CTP_API_URL
  const PROJECT_KEY = import.meta.env.VITE_CTP_PROJECT_KEY

  const responseData = ref()
  const count = ref()
  const dataProducts = ref<Product[]>([])
  const dataCategories = ref<Category[]>([])
  const classificatedCategories = ref()
  const openCategories = ref(new Set())

  const fetchCategories = async () => {
    try {
      const token = await getAnonymousToken()

      const response = await fetch(`${API_URL}/${PROJECT_KEY}/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }

      responseData.value = await response.json()
      dataCategories.value = responseData.value.results
      classificatedCategories.value = organizeCategories(dataCategories.value)
    } catch (err) {
      console.error('Error fetching data:', err)
      throw err
    }
  }

  const isSubcategoriesVisible = (category: Category) => {
    return openCategories.value.has(category.id)
  }

  const toggleSubcategories = (category: Category) => {
    if (openCategories.value.has(category.id)) {
      openCategories.value.delete(category.id)
    } else {
      openCategories.value.add(category.id)
    }
  }

  const fetchCategoryProducts = async (categoryId) => {
    try {
      const token = await getAnonymousToken()

      const response = await fetch(
        `${API_URL}/${PROJECT_KEY}/product-projections/search?filter=categories.id:subtree("${categoryId}")`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      responseData.value = await response.json()
      dataProducts.value = responseData.value.results
    } catch (err) {
      console.error('Error fetching data:', err)
      throw err
    }
  }

  const fetchProducts = async () => {
    try {
      const token = await getAnonymousToken()

      const response = await fetch(`${API_URL}/${PROJECT_KEY}/product-projections/search`, {
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
    fetchCategories()
    fetchProducts()

    console.log(dataProducts)
  })
</script>

<style lang="scss">
  @import '../components/CategoryView.scss';
  @import './CatalogView.scss';
</style>
