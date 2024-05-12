<template>
  <FormPage v-bind="params">
    <form action="" class="mb-3">
      <div class="flex flex-column gap-2 mb-1">
        <label for="username">Email</label>
        <InputText
          id="email"
          v-model="email"
          aria-describedby="email-help"
          @input="validateEmail"
        />
        <small class="p-error" id="email-help">{{ emailErrorMessage }}</small>
      </div>

      <div class="flex flex-column gap-2 mb-1">
        <label for="password">Password</label>
        <Password
          id="password"
          v-model="password"
          aria-describedby="password-help"
          :feedback="false"
          toggleMask
          @input="validatePassword"
        />
        <small class="p-error" id="password-help">{{ passwordErrorMessage }}</small>
      </div>
    </form>
  </FormPage>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import FormPage from '@/components/layouts/FormPage/FormPage.vue'
  import InputText from 'primevue/inputtext'
  import Password from 'primevue/password'

  const params = {
    title: 'Login',
    btnName: 'Submit',
    linkName: 'Registration',
    linkUrl: '/registration',
    linkText: 'Don’t have an account?'
  }

  const email = ref('')
  const password = ref('')
  const emailErrorMessage = ref('')
  const passwordErrorMessage = ref('')

  const validateEmail = () => {
    const trimmedEmail: string = email.value.trim()
    const emailValidations = [
      {
        condition: email.value === '',
        errorMessage: ''
      },
      {
        condition: trimmedEmail !== email.value,
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

    emailErrorMessage.value = ''

    for (const validation of emailValidations) {
      if (validation.condition) {
        emailErrorMessage.value = validation.errorMessage
        break
      }
    }
  }

  const validatePassword = () => {
    const trimmedPassword: string = password.value.trim()
    const passwordValidations = [
      {
        condition: password.value === '',
        errorMessage: ''
      },
      {
        condition: trimmedPassword !== password.value,
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

    passwordErrorMessage.value = ''

    for (const validation of passwordValidations) {
      if (validation.condition) {
        passwordErrorMessage.value = validation.errorMessage
        break
      }
    }
  }
</script>
