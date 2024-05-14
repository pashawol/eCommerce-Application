<template>
  <FormPage v-bind="params">
    <form action="" class="mb-3">
      <div class="flex flex-column gap-2 mb-1">
        <label for="username">Email</label>
        <InputText
          id="email"
          v-model="dataForm.email"
          aria-describedby="email-help"
          @input="validateEmail"
          required
        />
        <small class="p-error" id="email-help">{{ errorsForm.email }}</small>
      </div>

      <div class="flex flex-column gap-2 mb-1">
        <label for="password">Password</label>
        <Password
          id="password"
          v-model="dataForm.password"
          aria-describedby="password-help"
          :feedback="false"
          toggleMask
          @input="validatePassword"
          required
        />
        <small class="p-error" id="password-help">{{ errorsForm.password }}</small>
      </div>
      <div class="mb-4">
        <Button type="submit" :disabled="!isFilledForm()" label="Submit" />
      </div>
    </form>
  </FormPage>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import FormPage from '@/components/layouts/FormPage/FormPage.vue'
  import InputText from 'primevue/inputtext'
  import Password from 'primevue/password'
  import Validation from '@/components/utils/validation'

  const dataForm = ref({
    email: '',
    password: ''
  })

  const errorsForm = ref({
    email: '',
    password: ''
  })

  const params = ref({
    title: 'Login',
    btnName: 'Submit',
    linkName: 'Registration',
    linkUrl: '/registration',
    linkText: 'Don’t have an account?'
  })

  const validateEmail = () => {
    const emailValue: string = dataForm.value.email
    errorsForm.value.email = ''

    const errors = Validation.email(emailValue)
    errorsForm.value.email = errors
  }

  const validatePassword = () => {
    const passwordValue: string = dataForm.value.password
    errorsForm.value.password = ''

    const errors = Validation.password(passwordValue)
    errorsForm.value.password = errors
  }

  const isFilledForm = (data = dataForm.value, errors = errorsForm.value) => {
    const isEmptyErrors = Object.values(errors).every((item) => item === '')
    const isNotEmptyData = Object.values(data).every((item) => item !== '')

    return isEmptyErrors && isNotEmptyData
  }
</script>
