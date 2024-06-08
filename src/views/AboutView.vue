<template>
  <div class="about container">
    <h1>This is an about page</h1>
    <div class="about__footer">
      <h2>Special thanks to<br /><span>🏆 The Rolling Scopes School: 🏆</span></h2>
      <a title="click me" target="_blank" href="https://rs.school/">
        <img src="/img/logo__rs_school.svg" alt="Logo of the Rolling Scopes School" />
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .about {
    &__footer {
      max-width: 400px;
      margin: auto;
      h2 {
        text-align: center;
        span {
          color: var(--yellow-500);
          font-weight: 700;
        }
        margin-bottom: 50px;
      }
      img {
        padding: 20px;
        background: var(--yellow-600);
        border-radius: 10px;
      }
    }
  }
</style>
