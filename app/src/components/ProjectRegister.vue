<script>
  export default {
    name: 'ProjectRegister',

    data: () => ({
      valid: true,
      form: {
        tagStackOverflow: null,
        linkGitHub: null,
      }
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      required: (v) => !!v || 'This field is required'
    }
  }
</script>

<template>
  <v-container class="form-container">
    <v-form 
      ref="form"
      v-model="valid"
      class="form"
      lazy-validation
    >

      <v-row class="justify-center text-center">
        <v-col cols="8">
          <h2>Submit a new Project</h2>
        </v-col>
      </v-row>

      <v-row class="justify-center text-center mt-15">
        <v-col cols="8">
          <v-text-field
            v-model="form.tagStackOverflow"
            label="Tag in Stack Overflow"
            :rules="[required]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="justify-center text-center mt-15">
        <v-col cols="8">
          <v-text-field
            v-model="form.linkGitHub"
            label="Link in GitHub"
            :rules="[required]"
          ></v-text-field>
        </v-col>
      </v-row>

     <v-row class="justify-center text-center mt-15">
        <v-col cols="8">
          <v-btn
            color="success"
            class="float-right"
            @click="validate"
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>

    </v-form>
  </v-container>
</template>

<style lang="scss" scoped>
  .form-container {
    height: 100%;
    .form {
      margin-top: 5%;
    }
  }
</style>
