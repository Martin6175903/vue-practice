<template>
  <div class="post">
    <div>
      <div>
        <strong>Название:</strong>
        {{ post.title }}
      </div>
      <div>
        <strong>Описание:</strong>
        {{ post.body }}
      </div>
    </div>
    <div class="post__btns">
      <my-button @click="$emit('remove', post)">Удалить</my-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, type PropType} from 'vue'

  export default defineComponent({
    props: {
      post: {
        type: Object as PropType<{ id?:number, title: string, body: string }>,
        required: true,
      }
    }
  })


</script>

<style scoped>
  .post {
    padding: 15px;
    border: 2px solid teal;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    &:not(:first-child) {
      margin-top: 15px;
    }
  }
</style>
