<script setup lang="ts">
  // import { ctpClient } from '../modules/auth/services/client'
  // import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

  // // Create apiRoot from the imported ClientBuilder and include your Project key
  // const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  //   projectKey: 'ecommerceapplication'
  // })

  // Example call to return Project information
  // This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
  // const getProject = () => {
  //   return apiRoot.get().execute()
  // }

  // console.log(apiRoot.get().execute())

  // Retrieve Project information and output the result to the log
  // getProject().then(console.log).catch(console.error)

  export interface ILoginObject {
    body: {
      email: string
      password: string
    }
  }
  // apiRoot
  //   .login()
  //   .post({
  //     body: {
  //       email: '123@gmail.com',
  //       password: '123'
  //     }
  //   })
  //   .execute()
</script>

<template>
  <main>
    <h1>HOME PAGE</h1>
  </main>
</template>
