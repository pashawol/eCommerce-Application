import { type Category } from '../interfaces/category'

export const organizeCategories = (categories: Category[]): Category[] => {
  const categoryMap: { [id: string]: Category } = {}

  categories.forEach((category) => {
    categoryMap[category.id] = { ...category, subcategories: [] }
  })

  const rootCategories: Category[] = []

  categories.forEach((category) => {
    if (category.parent) {
      categoryMap[category.parent.id].subcategories.push(categoryMap[category.id])
    } else {
      rootCategories.push(categoryMap[category.id])
    }
  })

  return rootCategories
}
