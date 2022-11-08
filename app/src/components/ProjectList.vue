<script>
  export default {
    name: 'ProjectList',

    data: () => ({
      search: '',
      headers: [
        {
          text: 'Project Name',
          align: 'start',
          filterable: true,
          value: 'name',
        },
        { 
          text: 'Tag in Stack Overflow',
          align: 'start',
          filterable: true,
          value: 'tagStackOverflow'
        },
        { 
          text: 'Link in GitHub',
          align: 'start',
          filterable: false,
          value: 'linkGitHub'
        },
      ],
      projects: [
        { 
          name: "Angular.js", 
          tagStackOverflow: "angularjs", 
          linkGitHub: "github.com/angularjs" 
        },
        { 
          name: "Moment.js", 
          tagStackOverflow: "momentjs", 
          linkGitHub: "github.com/momentjs" 
        },
        { 
          name: "PhantomJS", 
          tagStackOverflow: "phantomjs", 
          linkGitHub: "github.com/phantomjs" 
        },
      ],
    }),

    mounted() {
      const items = []
      for (let i = 0; i < 50; i++) {
        const randomString = this.getRandomString(10)
        items.push({
          name: randomString,
          tagStackOverflow: randomString,
          linkGitHub: "github.com/" + randomString
        })
      }
      this.projects.push(...items)
    },

    methods: {
      getRandomString(length) {
        let randomString = ''
        const caracteres = 'abcdefghijklmnopqrstuvwxyz'
        for (var i = 0; i < length; i++) {
          randomString += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
        }
        return randomString
      },
      changeRoute(element) {
        this.$router.push('/projects/' + element.tagStackOverflow)
      }
    }
  }
</script>

<template>
  <v-container>
    <v-card class="mt-15">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="projects"
        :search="search"
        @click:row="changeRoute($event)"
      ></v-data-table>
    </v-card>
  </v-container>
</template>
