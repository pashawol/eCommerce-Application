<script setup lang="ts">
</script>

<template>
  <main class="container">
    <div class="home-row">
      <div class="">
        <h1 class="mb-3">Welcome to FashionHub!</h1>
        <p class="mb-4">
          Discover the latest trends and timeless classics at FashionHub. Whether you're looking for
          everyday essentials, statement pieces, or special occasion outfits, we've got you covered.
          Our curated collections cater to every style and occasion, ensuring you always look your
          best.
        </p>
        <router-link to="/catalog">
          <Button>Catalog</Button>
        </router-link>
      </div>
      <div class="">
        <img src="/img/mainPage.webp" alt="404 page" />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  h1 {
    color: var(--additional-green);
    line-height: 1.3;
    font-weight: 600;
  }
  .home-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    justify-items: center;
    align-items: center;
    gap: 30px;
    max-width: 1400px;
    width: 100%;
    margin: auto;
    padding: 20px;
  }
  img {
    max-width: 100%;
    border-radius: var(--border-radius);
  }
</style>
