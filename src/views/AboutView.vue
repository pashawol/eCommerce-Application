<script setup lang="ts">
  import Avatar from 'primevue/avatar'
  import TabView from 'primevue/tabview'
  import TabPanel from 'primevue/tabpanel'
  import { teamMembers } from '@/components/utils/teamMembers'
</script>

<template>
  <div class="about container">
    <div class="about__header">
      <h1>Our MegaFrontTeam</h1>
      <p>
        The team collaborated effectively by leveraging each member's strengths and maintaining
        clear communication throughout the project. Regular meetings, detailed task management, and
        a shared commitment to the project's goals ensured a seamless workflow and a successful
        outcome.
      </p>
      <p>----</p>
    </div>
    <div class="about__content">
      <div
        v-for="(member, index) in teamMembers"
        :key="index"
        :class="['team-member', member.additionalClass]"
      >
        <Avatar :image="`/img/${member.photoUrl}.jpg`" shape="circle" />
        <div class="team-member__info">
          <h2 class="team-member__name">✨ {{ member.name }}</h2>
          <p class="team-member__role">{{ member.role }}</p>

          <TabView>
            <TabPanel header="Contributions">
              <p v-for="(paragraph, idx) in member.contribution" :key="idx">{{ paragraph }}</p>
            </TabPanel>
            <TabPanel header="Bio">
              <div v-for="(paragraph, idx) in member.bio" :key="idx">
                <p>{{ paragraph }}</p>
              </div>
            </TabPanel>
          </TabView>

          <a target="_blank" :href="member.githubUrl" class="team-member__github">GitHub Profile</a>
        </div>
      </div>
    </div>

    <div class="about__footer">
      <p class="text-center">----</p>
      <h2>Special thanks to<br /><span>🏆 The Rolling Scopes School: 🏆</span></h2>
      <a title="click me" target="_blank" href="https://rs.school/">
        <img src="/img/logo__rs_school.svg" alt="Logo of the Rolling Scopes School" />
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
  h1 {
    color: var(--color-heading);
    font-weight: 600;
    margin-bottom: 10px;
  }
  .p-tabview {
    --body-bg: transparent;
    --body-color: var(--color-text);
    --font-family: var(--font-family);
    --light-color-5: var(--color-text);
  }

  .team-member {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 700px;
    align-items: center;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: start;
    }

    &__name {
      color: var(--color-heading);
      font-weight: 600;
      @media (max-width: 768px) {
        text-align: center;
      }
    }

    &__role {
      color: var(--yellow-600);
      @media (max-width: 768px) {
        text-align: center;
      }
    }

    &_right {
      @media (min-width: 768px) {
        flex-direction: row-reverse;
        text-align: right;
        align-self: flex-end;
      }
    }

    .p-tabview-panels p:not(:last-child) {
      margin-bottom: 10px;
    }

    .p-avatar {
      flex-shrink: 0;
      width: 150px;
      height: 150px;
    }
  }

  .about {
    padding: 50px 20px;

    &__header {
      text-align: center;
      margin: auto;
      margin-bottom: 40px;
      max-width: 500px;
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 30px;
      margin-bottom: 50px;
    }

    &__footer {
      max-width: 400px;
      margin: auto;
      margin-bottom: 70px;
      h2 {
        text-align: center;
        span {
          color: var(--yellow-500);
          font-weight: 700;
        }
        margin-bottom: 30px;
      }
      img {
        padding: 20px;
        background: var(--yellow-600);
        border-radius: 10px;
      }
    }
  }
</style>
