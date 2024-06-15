<template class="">
  <div class="catalog container">
    <Breadcrumb :model="breadcrumbItems">
      <template #item="{ item }">
        <a class="p-menuitem-link" href="#" @click.prevent="handleBreadcrumbClick(item)">
          <span class="p-menuitem-text">{{ item.label }}</span>
        </a>
      </template>
    </Breadcrumb>
    <div class="catalog__filters catalog__search">
      <label>
        Search:
        <input
          type="text"
          v-model="catalogStore.searchQuery"
          @keyup.enter="catalogStore.setFilters"
          placeholder="Search products..."
        />
      </label>
      <span class="pi pi-search" @click="catalogStore.setFilters"></span>
    </div>

    <div class="catalog__filters-navigation">
      <div class="catalog__wrap">
        <label>
          Color:
          <select v-model="catalogStore.filters.color" @change="catalogStore.setFilters">
            <option value="">All</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
            <option value="white">White</option>
          </select>
        </label>
        <label>
          Size:
          <select v-model="catalogStore.filters.size" @change="catalogStore.setFilters">
            <option value="">All</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
        <label>
          Price, $:
          <select v-model="catalogStore.filters.price" @change="catalogStore.setFilters">
            <option value="">All</option>
            <option value="less19">less 19</option>
            <option value="19-40">19-40</option>
            <option value="more40">more 40</option>
          </select>
        </label>
        <Button severity="contrast" @click="catalogStore.resetFilters">Reset Filters</Button>
      </div>
      <div class="catalog__wrap">
        <label>
          Sort:
          <select v-model="catalogStore.sort" @change="catalogStore.applySort">
            <option value="price asc">Price: Low to High</option>
            <option value="price desc">Price: High to Low</option>
            <option value="name.en-US asc">Name: A to Z</option>
            <option value="name.en-US desc">Name: Z to A</option>
          </select>
        </label>
      </div>
    </div>

    <div class="CategoriesView">
      <div
        class="CategoriesView__main-category"
        v-for="category in catalogStore.categories"
        :key="category.id"
      >
        <button @click="toggleSubcategories(category)">
          {{ category.name['en-US'] }}
        </button>
        <div class="CategoriesView__subcategories" v-if="isSubcategoriesVisible(category)">
          <div>
            <button @click="selectCategory(category)" class="all">View All</button>
          </div>
          <div v-for="subcategory in category.subcategories" :key="subcategory.id">
            <button @click="selectSubcategory(category, subcategory)">
              {{ subcategory.name['en-US'] }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <ul class="catalog__list">
      <li v-for="(product, index) in catalogStore.products" :key="index">
        <Card>
          <template #header>
            <RouterLink :to="`/catalog/${product.id}`">
              <img class="card-img" alt="card-img" :src="product.masterVariant.images[0].url" />
            </RouterLink>
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
          <template #title
            ><RouterLink :to="`/catalog/${product.id}`">{{
              product.name['en-US']
            }}</RouterLink></template
          >
          <template #content>
            <p>
              {{ product.description['en-US'] }}
            </p>
            <ButtonAddToCart
              :productData="{
                sku: product.masterVariant.sku,
                quantity: 1
              }"
            />
          </template>
        </Card>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import Card from 'primevue/card'
  import Badge from 'primevue/badge'
  import Breadcrumb from 'primevue/breadcrumb'
  import { ref, watchEffect } from 'vue'
  import { type Category } from '../interfaces/category'
  import type { MenuItem } from 'primevue/menuitem'
  import { useCatalogStore } from '../store/CatalogStore'
  import { useGlobalStore } from '@/store/GlobalStore'
  import ButtonAddToCart from '@modules/cart/components/ButtonAddToCart.vue'

  const catalogStore = useCatalogStore()
  const globalStore = useGlobalStore()
  const openCategories = ref(new Set())
  const breadcrumbItems = ref([
    { label: 'Catalog', command: async () => await catalogStore.fetchProducts() }
  ])

  // import { useCartStore } from '@/modules/cart/store/CartStore'
  // const CartStore = useCartStore()
  // CartStore.fetchCart()

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

  const selectCategory = (category: Category): void => {
    openCategories.value.clear()

    if (category.subcategories.length > 0) {
      toggleSubcategories(category)
    }

    breadcrumbItems.value = [
      { label: 'Catalog', command: () => catalogStore.fetchProducts() },
      {
        label: category.name['en-US'],
        command: async () => await catalogStore.fetchCategoryProducts(category.id)
      }
    ]
    catalogStore.fetchCategoryProducts(category.id)
  }

  const selectSubcategory = (category: Category, subcategory: Category) => {
    openCategories.value.clear()

    breadcrumbItems.value = [
      { label: 'Catalog', command: async () => await catalogStore.fetchProducts() },
      {
        label: category.name['en-US'],
        command: async () => await catalogStore.fetchCategoryProducts(category.id)
      },
      {
        label: subcategory.name['en-US'],
        command: async () => await catalogStore.fetchCategoryProducts(subcategory.id)
      }
    ]
    catalogStore.fetchCategoryProducts(subcategory.id)
  }

  const handleBreadcrumbClick = (item: MenuItem): void => {
    const index = breadcrumbItems.value.findIndex((breadcrumb) => breadcrumb.label === item.label)
    breadcrumbItems.value = breadcrumbItems.value.slice(0, index + 1)
    const clickedItem = breadcrumbItems.value[index]
    clickedItem.command()
  }

  watchEffect(() => {
    if (globalStore.token) {
      catalogStore.fetchCategories()
      catalogStore.fetchProducts()
    }
  })
</script>

<style lang="scss">
  @import '../components/CategoryView.scss';
  @import './CatalogView.scss';
</style>
