import { describe, it, expect } from 'vitest'

import Validation from '../utils/validation'

describe('Validation', () => {
  it('should validate email correctly', () => {
    const validEmail = 'test@example.com'
    const invalidEmail = 'test@.com'
    const emptyEmail = ''

    expect(Validation.email(validEmail)).toBe('')
    expect(Validation.email(invalidEmail)).toBe('Please enter correct email format')
    expect(Validation.email(emptyEmail)).toBe('')
  })

  it('should validate password correctly', () => {
    const validPassword = 'Password5!'
    const shortPassword = 'pass'
    const noSpecialCharPassword = 'Password1'
    const noNumberPassword = 'Password!'
    const noUpperCasePassword = 'password1!'
    const noLowerCasePassword = 'PASSWORD1!'
    const emptyPassword = ''

    expect(Validation.password(validPassword)).toBe('')
    expect(Validation.password(shortPassword)).toBe('Password must be at least 8 characters long')
    expect(Validation.password(noSpecialCharPassword)).toBe(
      'Password must contain at least one special character (!@#$%^&*)'
    )
    expect(Validation.password(noNumberPassword)).toBe('Password must contain at least one digit')
    expect(Validation.password(noUpperCasePassword)).toBe(
      'Password must contain at least one uppercase letter'
    )
    expect(Validation.password(noLowerCasePassword)).toBe(
      'Password must contain at least one lowercase letter'
    )
    expect(Validation.password(emptyPassword)).toBe('')
  })

  it('should validate names correctly', () => {
    const validName = 'Smith'
    const invalidName = 'Smith777'
    const emptyName = ''

    expect(Validation.name(validName)).toBe('')
    expect(Validation.name(invalidName)).toBe(
      'Name should not contain numbers or special characters'
    )
    expect(Validation.name(emptyName)).toBe('Name must be at least 1 character long')
  })

  it('should validate street correctly', () => {
    const validStreet = 'Baker'
    const emptyStreet = ''

    expect(Validation.street(validStreet)).toBe('')
    expect(Validation.street(emptyStreet)).toBe('Street must contain at least one character')
  })

  it('should validate city correctly', () => {
    const validCity = 'New York'
    const invalidCity = 'New York 777'
    const emptyCity = ''

    expect(Validation.city(validCity)).toBe('')
    expect(Validation.city(invalidCity)).toBe(
      'City should not contain numbers or special characters'
    )
    expect(Validation.city(emptyCity)).toBe('City must contain at least one character')
  })

  it('should validate postal code correctly for Canada', () => {
    const validPostalCodeCA = 'A1B 2C3'
    const invalidPostalCodeCA = '12345'

    expect(Validation.postalCode(validPostalCodeCA, 'Canada')).toBe('')
    expect(Validation.postalCode(invalidPostalCodeCA, 'Canada')).toBe(
      'Invalid postal code format for Canada (e.g. A1B 2C3)'
    )
  })

  it('should validate postal code correctly for the United States', () => {
    const validPostalCodeUS = '12345'
    const invalidPostalCodeUS = 'A1B 2C3'

    expect(Validation.postalCode(validPostalCodeUS, 'United States')).toBe('')
    expect(Validation.postalCode(invalidPostalCodeUS, 'United States')).toBe(
      'Invalid postal code format for the United States (e.g. 12345)'
    )
  })

  it('should validate date of birth correctly', () => {
    const validDate = new Date(2001, 2, 1)
    const invalidDate = new Date()

    expect(Validation.date(validDate)).toBe('')
    expect(Validation.date(invalidDate)).toBe('User must be older than 13')
  })
})
