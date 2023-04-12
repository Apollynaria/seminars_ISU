<template>
  <div id="app" class="mt-3">
    <navbar/>
    <router-view />
  </div>
</template>

<script>
    import Navbar from './components/Navbar.vue'

    export default {
        name: 'App',
        components: {
            navbar: Navbar
        }
    }
</script>

<!--определение стилей-->
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    /* height: 100%; */
  }
</style>
