<template>
  <div class="navbar">
    <div>Vue 3</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/')">Начальная страница</my-button>
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button @click="$router.push('/about')">О нас</my-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MyButton from '@/components/UI/MyButton.vue'

export default defineComponent({
  components: { MyButton },
})
</script>

<style scoped>
.navbar {
  height: 50px;
  background: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
  display: flex;
  gap: 15px;
}
</style>
