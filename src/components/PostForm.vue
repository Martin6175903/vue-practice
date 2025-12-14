<template>
  <form class="form" @submit.prevent>
    <h4>Создание поста</h4>
    <my-input v-focus v-model="post.title" placeholder="Название поста"></my-input>
    <my-input v-model="post.body" placeholder="Описание поста"></my-input>
    <my-button style="align-self: flex-end" class="btn" @click="createPost">Создать пост</my-button>
  </form>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import type { Post } from "@/types/types.ts";

  export default defineComponent({
    data() {
      return {
        post: {
          title: '',
          body: '',
        } as Post
      }
    },
    methods: {
      createPost() {
        this.post.id = Date.now();
        this.$emit('create', this.post);
        this.post = {
          title: '',
          body: '',
        };
      },
    }
  })
</script>

<style scoped>
  .form {
    display: flex;
    flex-direction: column;
  }


</style>
