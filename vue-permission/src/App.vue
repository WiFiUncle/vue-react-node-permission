<template>
  <div id="app">
    <Login></Login>
    <router-view/>
  </div>
</template>

<script>
import Login from '@/views/Login'
export default {
  name: 'App',
  components: {Login}
}
</script>

<style>
#app {
}
</style>
