const validateFieldErrors = (value: string, validations: { condition: boolean; errorMessage: string }[]) => {
  for (const validation of validations) {
    if (validation.condition) {
      return validation.errorMessage;
    }
  }
  return '';
};

export const validateEmailErrors = (value: string) => {
  return validateFieldErrors(value, emailValidations(value));
};

export const validatePasswordErrors = (value: string) => {
  return validateFieldErrors(value, passwordValidations(value));
};

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


const passwordValidations = (passwordValue: string) => {
  const trimmedPassword: string = passwordValue.trim()
  return [
    {
      condition: passwordValue === '',
      errorMessage: ''
    },
    {
      condition: trimmedPassword !== passwordValue,
      errorMessage: 'Remove spaces'
    },
    {
      condition: /^[а-яА-Я]*$/.test(trimmedPassword),
      errorMessage: 'Use Latin characters'
    },
    {
      condition: trimmedPassword.length < 8,
      errorMessage: 'Password must be at least 8 characters long'
    },
    {
      condition: !/[a-z]/.test(trimmedPassword),
      errorMessage: 'Password must contain at least one lowercase letter'
    },
    {
      condition: !/[A-Z]/.test(trimmedPassword),
      errorMessage: 'Password must contain at least one uppercase letter'
    },
    {
      condition: !/\d/.test(trimmedPassword),
      errorMessage: 'Password must contain at least one digit'
    },
    {
      condition: !/[\W_]/.test(trimmedPassword),
      errorMessage: 'Password must contain at least one special character (!@#$%^&*)'
    },
    {
      condition: true,
      errorMessage: ''
    }
  ]
}
