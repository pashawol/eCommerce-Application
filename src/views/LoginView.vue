<template>
  <FormPage v-bind="params">
    <form action="">
      <div class="flex flex-column gap-2 mb-4">
        <label for="username">Email</label>
        <InputText id="email" v-model="value" aria-describedby="email-help" />
      </div>

      <div class="flex flex-column gap-2 mb-4">
        <div class="flex">
          <label for="password">Password</label>
        </div>
        <Password id="password" v-model="password" aria-describedby="password-help" toggleMask />
      </div>

      <div class="mb-4">
        <Button type="submit" :label="params.btnName" />
      </div>
      <div class="mb-3 text-center">
        Don’t have an account?
        <router-link to="/registration" class="text-primary">Registration</router-link>
      </div>
    </form>
  </FormPage>
</template>

<script setup>
  import { ref } from 'vue'
  import FormPage from '@/components/layouts/FormPage/FormPage.vue'
  import InputText from 'primevue/inputtext'
  import Password from 'primevue/password'
  const params = {
    title: 'Login',
    btnName: 'Submit'
  }

  // const value = ref('')
  const password = ref()
</script>

<style lang="scss">
  /* Your component's styles go here */
</style>
