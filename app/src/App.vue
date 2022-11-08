<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span data-cy="project-title">Vital Signs</span>
      </div>

      <v-spacer></v-spacer>

      <router-link to="/projects">
        <v-btn
          class="ma-1"
          color="white"
          plain
        >
          Projects
        </v-btn>
      </router-link>

      <router-link to="/project-register">
        <v-btn
          class="ma-1"
          color="white"
          plain
        >
          Project Register
        </v-btn>
      </router-link>
      
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
