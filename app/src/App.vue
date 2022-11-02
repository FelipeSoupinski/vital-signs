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

      <router-link to="/project-register">
        <v-btn
          class="ma-1"
          color="white"
          plain
        >
          Project Register
        </v-btn>
      </router-link>

      <router-link to="/about">
        <v-btn
          class="ma-1"
          color="white"
          plain
        >
          about
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
