<template>
  <app-navbar/>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import AppNavbar from '@/components/AppNavbar.vue'

  export default defineComponent({
    components: { AppNavbar }
  })
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app {
  padding: 20px;
}
</style>
