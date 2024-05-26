<!-- <template>
  <ul>
    <li v-for="category in categories" :key="category.id">
      <button @click="toggleSubcategories(category.id)">
        {{ category.name['en-US'] }}
      </button>
      <CategoryList
        v-if="category.subcategories.length && isSubcategoryVisible(category.id)"
        :categories="category.subcategories"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { ref, PropType } from 'vue';
import {type  Category } from '../interfaces/category';

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  // setup() {
  //   const visibleSubcategories = ref<{ [key: string]: boolean }>({});

  //   const toggleSubcategories = (categoryId: string) => {
  //     visibleSubcategories.value[categoryId] = !visibleSubcategories.value[categoryId];
  //   };

  //   const isSubcategoryVisible = (categoryId: string) => {
  //     return visibleSubcategories.value[categoryId];
  //   };

  //   return {
  //     toggleSubcategories,
  //     isSubcategoryVisible,
  //   };
  // },
});
</script> -->
