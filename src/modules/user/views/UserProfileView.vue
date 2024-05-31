<template>
  <div class="sUserProfileView">
    <div class="container">
      <h1 class="sUserProfileView__title">Your profile info</h1>
      <div class="row">
        <div class="col">
          <div class="sUserProfileView__wrap">
            <span>Name, Surname, LastName</span>
            {{ globalStore.userData.firstName }} {{ globalStore.userData.middleName }}
            {{ globalStore.userData.lastName }}
          </div>
          <div class="sUserProfileView__wrap">
            <span>Birthday</span>
            {{ globalStore.userData.dateOfBirth }}
          </div>
          <div class="sUserProfileView__wrap">
            <span>Email</span>
            {{ globalStore.userData.email }}
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="container">
      {{ globalStore.userData }}
    </div> -->
  </div>
</template>

<style>
  @import url('../scss/sUserProfileView.scss');
</style>

<script setup lang="ts">
  import { useGlobalStore } from '@/store/GlobalStore'

  const globalStore = useGlobalStore()
</script>
