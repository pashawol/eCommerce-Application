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
  import { validateEmailErrors, validatePasswordErrors } from '@/components/utils/validation'

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
    const emailValue: string = email.value

    emailErrorMessage.value = ''

    const errors = validateEmailErrors(emailValue)
    emailErrorMessage.value = errors
  }

  const validatePassword = () => {
    const passwordValue: string = password.value

    passwordErrorMessage.value = ''

    const errors = validatePasswordErrors(passwordValue)
    passwordErrorMessage.value = errors
  }

</script>
