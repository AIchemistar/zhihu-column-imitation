<template>
  <div class="container">
    <global-header :user= "currentUser"></global-header>
    <!-- <home></home> -->
    <login></login>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
const currentUser: UserProps = {
  isLogin: true,
  name: 'Adrian'
}

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    // Home,
    Login
  },
  setup () {
    return {
      currentUser
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0px;
}
</style>
