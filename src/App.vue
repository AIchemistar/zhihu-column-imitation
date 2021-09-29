<template>
  <div class="container">
    <global-header :user= "currentUser"></global-header>
    <loader v-if="isLoading" text="拼命加载中" background='rgba(0,0,0, 0.8'></loader>
    <router-view></router-view>
    <!-- <home></home> -->
    <!-- <login></login> -->
  </div>

  <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2021 知乎专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from 'vuex'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import Loader from './components/Loader.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
// const currentUser: UserProps = {
//   isLogin: false,
//   name: 'Adrian'
// }

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
    // Home,
    // Login
  },
  setup () {
    const store = useStore()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    return {
      currentUser,
      isLoading
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
