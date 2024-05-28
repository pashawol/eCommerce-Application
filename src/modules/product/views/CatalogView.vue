<template>
  <div class="catalog">
    <Breadcrumb :model="breadcrumbItems">
      <template #item="{ item }">
        <a class="p-menuitem-link" href="#" @click.prevent="handleBreadcrumbClick(item)">
          <span class="p-menuitem-text">{{ item.label }}</span>
        </a>
      </template>
    </Breadcrumb>
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
    </ul>
  </div>
</template>

<script setup lang="ts">
  import Card from 'primevue/card'
  import Badge from 'primevue/badge'
  import Breadcrumb from 'primevue/breadcrumb'
  import { onMounted, ref } from 'vue'
  import { type Category } from '../interfaces/category'
  import type { MenuItem } from 'primevue/menuitem'
  import { useCatalogStore } from '../store/CatalogStore'

  const catalogStore = useCatalogStore()
  const openCategories = ref(new Set())
  const breadcrumbItems = ref([{ label: 'Catalog', command: () => catalogStore.fetchProducts() }])

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
        command: () => catalogStore.fetchCategoryProducts(category.id)
      }
    ]
    catalogStore.fetchCategoryProducts(category.id)
  }

  const selectSubcategory = (category: Category, subcategory: Category) => {
    openCategories.value.clear()

    breadcrumbItems.value = [
      { label: 'Catalog', command: () => catalogStore.fetchProducts() },
      {
        label: category.name['en-US'],
        command: () => catalogStore.fetchCategoryProducts(category.id)
      },
      {
        label: subcategory.name['en-US'],
        command: () => catalogStore.fetchCategoryProducts(subcategory.id)
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

  onMounted(() => {
    catalogStore.fetchCategories()
    catalogStore.fetchProducts()
  })
</script>

<style lang="scss">
  @import '../components/CategoryView.scss';
  @import './CatalogView.scss';
</style>
