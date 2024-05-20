<template>
  <Toast />
  <FormPage v-bind="params">
    <form @submit.prevent="sumbit()" class="mb-3">
      <div class="flex flex-column gap-2 mb-1">
        <label for="username">Email</label>
        <InputText
          id="email"
          v-model="authStore.dataForm.email"
          aria-describedby="email-help"
          @input="authStore.validateEmail"
          required
        />
        <small class="p-error" id="email-help">{{ authStore.errorsForm.email }}</small>
      </div>

      <div class="flex flex-column gap-2 mb-1">
        <label for="password">Password</label>
        <Password
          id="password"
          v-model="authStore.dataForm.password"
          aria-describedby="password-help"
          :feedback="false"
          toggleMask
          @input="authStore.validatePassword"
          required
        />
        <small class="p-error" id="password-help">{{ authStore.errorsForm.password }}</small>
      </div>
      <div class="mb-4">
        <Button type="submit" :disabled="!authStore.isFilledForm()" label="Submit" />
      </div>
    </form>
  </FormPage>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthStore } from '../store/AuthStore'
  import FormPage from '../components/FormPage/FormPage.vue'
  import InputText from 'primevue/inputtext'
  import Password from 'primevue/password'
  import Toast from 'primevue/toast'
  import { useToast } from 'primevue/usetoast'

  const toast = useToast()
  const authStore = useAuthStore()
  const params = ref({
    title: 'Login',
    btnName: 'Submit',
    linkName: 'Registration',
    linkUrl: '/registration',
    linkText: 'Don’t have an account?'
  })
  const sumbit = () => {
    authStore.logIn().then(() => {
      toast.add({
        severity: authStore.toast.severity,
        summary: authStore.toast.summary,
        detail: authStore.toast.detail,
        life: 3000
      })
    })
  }
</script>
