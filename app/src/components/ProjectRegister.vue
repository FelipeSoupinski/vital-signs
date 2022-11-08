<script>
  export default {
    name: 'ProjectRegister',

    data: () => ({
      valid: true,
      form: {
        name: '',
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
        <v-col cols="8" data-cy="project-name-container">
          <v-text-field
            v-model="form.name"
            :rules="[required]"
            data-cy="project-name"
          >
            <template #label>
              <span>Project Name</span>
              <span class="mandatory">*</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row class="justify-center text-center mt-15">
        <v-col cols="8" data-cy="project-tag-so-container">
          <v-text-field
            v-model="form.tagStackOverflow"
            :rules="[required]"
            data-cy="project-tag-so"
          >
            <template #label>
              <span>Tag in Stack Overflow</span>
              <span class="mandatory">*</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row class="justify-center text-center mt-15">
        <v-col cols="8" data-cy="project-link-gh-container">
          <v-text-field
            v-model="form.linkGitHub"
            :rules="[required]"
            data-cy="project-link-gh"
          >
            <template #label>
              <span>Link in GitHub</span>
              <span class="mandatory">*</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

     <v-row class="justify-center text-center mt-15">
        <v-col cols="8">
          <v-btn
            color="success"
            class="float-right"
            @click="validate"
            data-cy="btn-submit"
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
      .mandatory {
        color: red;
        margin-left: 5px;
      }
    }
  }
</style>
