export default class Validation {
  public static email(value: string) {
    return validateFieldErrors(value, emailValidations(value))
  }

  public static name = (value: string) => {
    return validateFieldErrors(value, nameValidations(value))
  }

  public static lastName = (value: string) => {
    return validateFieldErrors(value, nameValidations(value))
  }
  public static middleName = (value: string) => {
    return validateFieldErrors(value, nameValidations(value))
  }

  public static street = (value: string) => {
    return validateFieldErrors(value, streetValidations(value))
  }

  public static city = (value: string) => {
    return validateFieldErrors(value, cityValidations(value))
  }

  public static postalCode = (value: string, countryValue: string) => {
    if (countryValue === 'Canada') {
      if (!validatePostalCodeCanada(value)) {
        return 'Invalid postal code format for Canada (e.g. A1B 2C3)'
      }
    } else if (countryValue === 'United States') {
      if (!validatePostalCodeUSA(value)) {
        return 'Invalid postal code format for the United States (e.g. 12345)'
      }
    }

    return ''
  }

  public static date = (value: Date) => {
    return validateFieldErrors(value, validateDOBErros(value))
  }
}

const validateFieldErrors = (
  value: string | Date,
  validations: { condition: boolean; errorMessage: string }[]
) => {
  for (const validation of validations) {
    if (validation.condition) {
      return validation.errorMessage
    }
  }
  return ''
}

const emailValidations = (emailValue: string) => {
  const trimmedEmail: string = emailValue.trim()

  return [
    {
      condition: emailValue === '',
      errorMessage: ''
    },
    {
      condition: trimmedEmail !== emailValue,
      errorMessage: 'Remove spaces'
    },
    {
      condition: /^[а-яА-Я]*$/.test(trimmedEmail),
      errorMessage: 'Use Latin characters'
    },
    {
      condition: !/@/.test(trimmedEmail),
      errorMessage: 'Add @ to correct email format'
    },
    {
      condition: !/\.[a-zA-Z]{2,}$/.test(trimmedEmail.split('@')[1]),
      errorMessage: 'Add domain name after @, e.g., gmail.com'
    },
    {
      condition: !/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail),
      errorMessage: 'Please enter correct email format'
    },
    {
      condition: true,
      errorMessage: ''
    }
  ]
}
const nameValidations = (nameValue: string) => {
  const trimmedName: string = nameValue.trim()

  return [
    {
      condition: trimmedName.length < 1,
      errorMessage: 'Name must be at least 1 character long'
    },
    {
      condition: /[\d!@#$%^&*()_+=[\]{};':"\\|,.<>?]/.test(trimmedName),
      errorMessage: 'Name should not contain numbers or special characters'
    }
  ]
}

const streetValidations = (streetValue: string) => {
  const trimmedStreet: string = streetValue.trim()

  return [
    {
      condition: trimmedStreet.length === 0,
      errorMessage: 'Street must contain at least one character'
    }
  ]
}

const cityValidations = (cityValue: string) => {
  const trimmedCity: string = cityValue.trim()

  return [
    {
      condition: trimmedCity.length === 0,
      errorMessage: 'City must contain at least one character'
    },
    {
      condition: /[\d!@#$%^&*()_+=[\]{};':"\\|,.<>?]/.test(trimmedCity),
      errorMessage: 'City should not contain numbers or special characters'
    }
  ]
}

const validatePostalCodeCanada = (postalCode: string): boolean => {
  const postalCodeRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/
  return postalCodeRegex.test(postalCode)
}

const validatePostalCodeUSA = (postalCode: string): boolean => {
  const postalCodeRegex = /^\d{5}(?:-\d{4})?$/
  return postalCodeRegex.test(postalCode)
}

const validateDOBErros = (dob: Date) => {
  const currentDate = new Date()
  const thirteenYearsAgo = new Date(
    currentDate.getFullYear() - 13,
    currentDate.getMonth(),
    currentDate.getDate()
  )

  return [
    {
      condition: dob > thirteenYearsAgo,
      errorMessage: 'User must be older than 13'
    }
  ]
}
