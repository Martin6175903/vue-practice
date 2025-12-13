<template>
  <div v-if="posts.length > 0">
    <h3>Список постов:</h3>
    <transition-group name="posts-list">
      <post-list-item
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 style="color: red" v-else>
    Список постов пуст...
  </h2>
</template>

<script lang="ts">
  import { defineComponent, type PropType } from 'vue'
  import PostListItem from "@/components/PostListItem.vue";
  import type { Post } from "@/types/types.ts";

  export default defineComponent({
    components: {PostListItem},
    props: {
      posts: {
        type: Array as PropType<Post[]>,
        required: true,
      }
    }
  })
</script>

<style scoped>
  .posts-list-move,
  .posts-list-enter-active,
  .posts-list-leave-active {
    transition: all 0.3s ease;
  }
  .posts-list-enter-from,
  .posts-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  .posts-list-leave-active {
    position: absolute;
  }
</style>
