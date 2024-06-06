<template>
  <div class="404-page">
    <div class="error-page-row row">
      <div>
        <img src="/img/404.gif" alt="404 page" />
      </div>
      <div>
        <h1 class="mb-1">404 Error: Page Not Found</h1>
        <p class="mb-4">
          Oops! It seems like the page you're looking for has gone on a vacation. Don't worry, our
          team of digital detectives is on the case, scouring every corner of the internet to track
          it down.
        </p>
        <router-link to="/">
          <Button>Home Page</Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .error-page-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    justify-items: center;
    align-items: center;
    gap: 40px;
    max-width: 1400px;
    width: 100%;
    margin: auto;
    padding: 100px 20px 20px 20px;
  }
</style>
