<script setup lang="ts">
  import Avatar from 'primevue/avatar'
  import TabView from 'primevue/tabview'
  import TabPanel from 'primevue/tabpanel'

  const teamMembers = [
    {
      name: 'Janis Paberzs',
      role: 'Junior Frontend Developer 🧑‍💻',
      contribution: [
        'Janis was responsible for setting up the commerce tools and managing user authentication, ensuring that the backend was robust and secure.',
        "He took charge of the user profile management, making sure that user data was handled efficiently and securely, which was crucial for the application's credibility and user trust."
      ],
      bio: [
        'I am a 22-year-old junior frontend developer with a passion for creating visually appealing and user-friendly web interfaces.',
        'I am skilled in HTML, CSS, and JavaScript, and has a keen eye for detail. My enthusiasm for learning new technologies and frameworks drives me to continually improve my skill set. I enjoys collaborating with design teams to bring creative ideas to life, ensuring a seamless user experience.',
        'Outside of coding, I am an avid problem solver and enjoys tackling new challenges.'
      ],
      githubUrl: 'https://github.com/jpaberzs',
      photoUrl: 'member-1'
    },
    {
      name: 'Iuliia Barinova',
      role: 'Junior Frontend Developer 🎨',
      contribution: [
        'Iuliia took the lead in organizing the workflow within Jira, ensuring that all tasks were well-coordinated and deadlines were met.',
        'She played a crucial role in adding products to the commerce tools and displaying the product catalog in the application, making sure that the application was both functional and user-friendly.',
        "As the inspiration behind the idea of the clothing store, Iuliia's vision and passion for fashion drove the project's direction and success."
      ],
      bio: [
        "I'm a Junior Frontend Developer with a deep enthusiasm for web development. My journey into programming started about a year ago when I made a decision to leave my previous job as an accountant and fully immerse myself in the world of web design and development.",
        "I studied at St Petersburg University where I earned my master's degree in economics and when I got a chance to try myself in programming I truly found my calling."
      ],
      githubUrl: 'https://github.com/JulietBrn',
      photoUrl: 'member-2',
      additionalClass: 'team-member_right'
    },
    {
      name: 'Pavel Khalunin',
      role: 'Frontend Developer, freelancer 💻',
      contribution: [
        'Pavel has been instrumental in setting up the project and organizing the workflow with Vue. His expertise ensured the smooth integration of various project components.',
        "One of Pavel's key contributions was the implementation of the product card display within the application, which significantly enhanced the user experience."
      ],
      bio: [
        'I was born and grew up in Belarus, in the city of Svetlogorsk. Since childhood I was fascinated by computers and the internet, and dreamed of creating my own websites. I started learning HTML and CSS in 2012 on my own, with the help of online courses, books and articles. I did different projects for myself and for my friends, and gradually gained experience and confidence in my skills.',
        'In 2017, I got a job at a small web studio where I did website layout for different clients. I worked in a team with other developers, designers and managers and I loved what I was doing. I learnt new technologies such as Bootstrap, Sass, jQuery and others and tried to do my work qualitatively and on time.',
        'After I continued working as a layout designer as a freelancer, where I got more interesting and challenging assignments',
        'In 2023 I moved to Poland, to the city of Warsaw. I also started learning JavaScript, because I realised that it is an important and in-demand programming language that allows you to create dynamic and interactive websites. I wanted to expand my capabilities and become a full-fledged web developer, not just a layout designer.'
      ],
      githubUrl: 'https://github.com/pashawol',
      photoUrl: 'member-3'
    }
  ]
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
