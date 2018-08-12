<template>
 <v-layout align-center justify-center fill-height column>
    <v-card class="text-xs-center main">
      <v-layout v-if="!loggedIn" column justify-space-around align-center fill-height class="pa-4">
        <v-avatar class="mb-4 mt-4">
          <v-icon color="green" :size="accountCreated?'128px':'72px'">verified_user</v-icon>
        </v-avatar>
        <h3 v-if="!accountCreated" class="mb-3">Please create your password and store them in a secure place</h3>
        <div class="login-new" v-if="accountCreated && !ensNameSaved">
          <v-spacer/>
          <v-text-field v-model="ensName" solo hide-details placeholder="ENS name" suffix=".dclp.eth" class="mb-3"/>
          <v-text-field v-model="password" solo hide-details placeholder="Password" type="password" class="mb-3"/>
          <h3 v-if="error" class="red--text">Incorrect Password</h3>
          <v-spacer v-else/>
          <v-btn block color="green" class="white--text" @click="login">Login</v-btn>
        </div>
        <div class="signup" v-else-if="!accountCreated && !ensNameSaved">
          <v-text-field v-model="ensName" solo hide-details placeholder="ENS name" suffix=".dclp.eth" class="mb-3"/>
          <v-text-field v-model="password" solo hide-details placeholder="Password" type="password" class="mb-3"/>
          <v-text-field v-model="confirmPassword" solo hide-details placeholder="Confirm password" type="password" class="mb-3"/>
          <h3 v-if="error" class="red--text"> Passwords do not match</h3>
          <v-spacer v-else/>
          <v-btn block color="green" class="white--text" @click="createAccount">Create Account</v-btn>
        </div>
        <div class="login" v-else-if="accountCreated && ensNameSaved">
          <!-- <v-spacer/> -->
          <v-spacer/>
          <v-text-field v-model="password" solo hide-details placeholder="Password" type="password" class="mb-3"/>
          <h3 v-if="error" class="red--text">Incorrect Password</h3>
          <v-spacer v-else/>
          <v-btn block color="green" class="white--text" @click="submit">Submit</v-btn>
        </div>
        
      </v-layout>
      <v-layout v-if="addCredentials" align-center justify-center fill-height>
      <v-modal v-if="addCredentials">      
        <v-card class="pa-3">
          <h2 class="mb-4"> Add new username</h2>
          <v-text-field class="mb-2" solo v-model="credUsername" placeholder="username/email"/>
          <v-text-field class="mb-3" solo v-model="credPassword" placeholder="password"/>
          <v-btn block color="green" @click="addCredentials=false"> Add </v-btn>
        </v-card>
        </v-modal>
      </v-layout>
    <v-layout v-if="!addCredentials && loggedIn" row wrap fill-height>
        <v-flex>
          <v-layout column fill-height>
            <v-toolbar>
              <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title><span class="ml-5">Accounts</span></v-toolbar-title>
            </v-toolbar>
            <v-card-text class="grey lighten-5">
              <v-list>
              <v-list-tile v-for="item in items" :key="item.title">
                <v-list-tile-content>
                  <v-btn flat block>{{item.title}}</v-btn>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            </v-card-text>
            <v-card-text style="height: 100px; position: relative">
            <v-btn absolute dark fab top right color="green" @click="addCredentials=true">
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn class="mt-5" bottom color="green" block @click="logout">Log out</v-btn>
          </v-card-text>
          </v-layout>          
        </v-flex>
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script>
import store from "store2"

export default {
  data () {
    return {
      addCredentials: false,
      credUsername: null,
      credPassword: null,
      ensName: store('ensName')?store('ensName'):null,
      accountCreated:store("accountCreated"),
      confirmPassword: null,
      password: null,
      heading: null,
      error: false,
      loggedIn: store("loggedIn"),
      items: [
          {  title: 'Amazon'},
          { title: 'Google' },
          { title: 'Github' },
          { title: 'Google' },
          { title: 'Github' }
        ]
    }
  },
  computed: {
    ensNameSaved(){
      return Boolean(store('ensName'))
    },
    url(){
      this.$route
    }
  },
  methods: {
    submit () {
      if(this.password === store("password")){
        store("loggedIn",true)
        this.reset()
      } else{
        this.error = true
      }
    },
    login(){
      if(this.password === store("password")){
        console.log("logged in")
        store("ensName",this.ensName)
        store("loggedIn",true)
        this.reset()
      }
      else{
        this.error = true
      }
    },
    createAccount(){
      if(this.confirmPassword !== this.password || this.password === ""){
        this.error = true
      }
      else {
        console.log(window)
        store("accountCreated",true)
        store("ensName", this.ensName)
        store("password",this.password)
        store("web3PrivateKey", window.web3Helpers.generateWeb3AccountFromusernameAndPassword(this.ensName, this.password).privateKey)
        store("web3Address", window.web3Helpers.generateWeb3AccountFromusernameAndPassword(this.ensName, this.password).address)
        store("encryptionKey", window.web3Helpers.generateEncryptionKeyFromUsernameAndPassword(this.ensName, this.password))
        store("loggedIn",true)
        this.reset()
      }
    },
    logout(){
      store("loggedIn",false)
      this.reset()
    },
    reset() {
      this.error = false
      this.password = null
      this.confirmPassword = null
      this.accountCreated = store("accountCreated")
      this.loggedIn = store("loggedIn")
      this.ensName = store("ensName")
    },
    async storeCredentials(applicationName, applicationUsername, applicationPassword, applicationUrl, userEncryptionKey, userWeb3PrivateKey, userPassword, userWeb3Address) {
      var box = window.encryptionHelpers.encrypt(`{ applicationName, applicationUsername, applicationPassword, applicationUrl }`, userEncryptionKey)
      // var ipfsHash = await window.ipfs.add(box)
      // window.web3Helpers.set(applicationName, userPassword, ipfsHash, userWeb3PrivateKey, userAddress)
    },
    async getCredentials(application, userWeb3PrivateKey, userPassword) {
      window.web3Helpers.get(application, userPassword).then(async (ipfsHash) => {
        var box = await window.ipfs.get(ipfshash)
        var open = window.encryptionHelpers.decrypt(box, userEncryptionKey)
        return open 
      })
    },
    getUrl(tab){
      this.url = tab.url
    }
  },
  mounted(){
    window.chrome.tabs.getSelected(null, function(tab) {
      console.log(tab.url)
      // if(/https:\/\/github\.com\/login.*/.test(tab.url)) {
      //   console.log('injecting crets')
      //   document.getElementById('login_field').value = "user"
      //   document.getElementById('password').value = "pass"
      //   document.getElementsByTagName('form').submit();
      // }
    })
  }
}
</script>

<style>
.main {
  width: 300px !important;
  height: 440px !important;
}
</style>
