<template>
  <FormPage v-bind="params">
    <form action="">
      <div class="flex flex-column gap-2 mb-4">
        <label for="username">Email</label>
        <InputText
          id="email"
          v-model="email"
          aria-describedby="email-help"
          @input="validateEmail"
        />
        <small class="p-error" id="email-help">{{ emailErrorMessage }}</small>
      </div>

      <div class="flex flex-column gap-2 mb-4">
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

    const validationRules = {
      format: {
        rule: !/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)
      },
      spaces: {
        rule: trimmedEmail !== email.value
      },
      domain: {
        rule: !/\.[a-zA-Z]{2,}$/.test(trimmedEmail.split('@')[1])
      },
      atSymbol: {
        rule: !/@/.test(trimmedEmail)
      }
    }
  }

  const validatePassword = () => {
    const trimmedPassword: string = password.value.trim()

    const validationRules = {
      spaces: {
        rule: trimmedPassword !== password.value
      },
      special: {
        rule: !/[\W_]/.test(trimmedPassword)
      },
      digit: {
        rule: !/\d/.test(trimmedPassword)
      },
      uppercase: {
        rule: !/[A-Z]/.test(trimmedPassword)
      },
      lowercase: {
        rule: !/[a-z]/.test(trimmedPassword)
      },
      length: {
        rule: trimmedPassword.length < 8
      }
    }
  }
</script>
