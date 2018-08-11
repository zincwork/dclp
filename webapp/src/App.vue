<template>
 <v-layout align-center justify-center fill-height column class="bg">
    <v-card class="pa-4 text-xs-center" @keyup.enter="submit">
      <v-avatar class="mb-4 mt-4">
        <v-icon color="green" size="72px">verified_user</v-icon>
      </v-avatar>
      <div v-if="error" class="red--text mt-5">Username and Password incorrect</div>
      <v-text-field v-model="username" solo hide-details placeholder="Username" class="mb-3 mt-2"/>
      <v-text-field v-model="password" solo hide-details placeholder="Password" type="password" class="mb-3"/>
      <v-btn color="green" class="white--text" @click="submit">Submit</v-btn>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      username: null,
      password: null,
      heading: null,
      error: false
    }
  },
  methods: {
    submit () {
      this.error = true
      console.log('Here!!')
      // this.heading = 'Success! You have logged in'
    }
  }
}
</script>