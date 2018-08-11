<template>
  <v-app>
    <v-layout align-center justify-center fill-height>
      <v-card class="pa-5 text-xs-center">
        <v-avatar class="mb-4 mt-4">
        <v-icon color="green" size="72px">computer</v-icon>
      </v-avatar>
      <h1>This is the website</h1>
      </v-card>
    </v-layout>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'bubble_chart', title: 'Inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    }
  }
</script>
