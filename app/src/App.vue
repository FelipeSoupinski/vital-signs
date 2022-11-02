<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span>Vital Signs</span>
      </div>

    </v-app-bar>

    <v-main>
      <ProjectRegister/>
    </v-main>
  </v-app>
</template>

<script>
import ProjectRegister from './components/ProjectRegister';

export default {
  name: 'App',

  components: {
    ProjectRegister,
  },

  data: () => ({
    //
  }),
};
</script>
