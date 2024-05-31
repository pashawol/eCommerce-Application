import { describe, it, expect } from 'vitest'

import { getFiltersQuery } from '../services/filtration'

describe('Validation', () => {
  it('should validate password correctly', () => {
    const noFilters = {}
    const oneFilter = {
      size: 'small'
    }
    const twoFilters = {
      size: 'small',
      color: 'red'
    }
    const threeFilters = {
      size: 'small',
      color: 'red',
      price: '19-40'
    }

    expect(getFiltersQuery(noFilters)).toStrictEqual([])
    expect(getFiltersQuery(oneFilter)).toStrictEqual(['variants.attributes.size.label:"small"'])
    expect(getFiltersQuery(twoFilters)).toStrictEqual([
      'variants.attributes.color.label:"red"',
      'variants.attributes.size.label:"small"'
    ])
    expect(getFiltersQuery(threeFilters)).toStrictEqual([
      'variants.attributes.color.label:"red"',
      'variants.attributes.size.label:"small"',
      'variants.price.centAmount:range(1900 to 4000)'
    ])
  })
})
