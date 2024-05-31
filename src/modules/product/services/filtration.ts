interface filters {
  color?: string
  size?: string
  price?: string
}

export const getFiltersQuery = (filters: filters) => {
  const combinedFilters = []
  if (filters.color) {
    combinedFilters.push(`variants.attributes.color.label:"${filters.color}"`)
  }
  if (filters.size) {
    combinedFilters.push(`variants.attributes.size.label:"${filters.size}"`)
  }
  switch (filters.price) {
    case 'less19':
      combinedFilters.push('variants.price.centAmount:range(* to 1899)')
      break
    case '19-40':
      combinedFilters.push('variants.price.centAmount:range(1900 to 4000)')
      break
    case 'more40':
      combinedFilters.push('variants.price.centAmount:range(4001 to *)')
      break
    default:
      break
  }

  return combinedFilters
}
