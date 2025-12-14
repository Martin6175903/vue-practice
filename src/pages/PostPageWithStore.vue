<template>
  <div class="app">
        <h1>Страница с постами</h1>
        <my-input v-focus v-model="postsStore.searchQuery" placeholder="Поиск..." name="search-query-input" />
        <div class="app_btns">
          <my-button @click="showDialog">Создать пост</my-button>
          <my-select v-model="postsStore.selectedSort" :options="postsStore.sortOptions" />
        </div>
        <my-dialog v-model:isShow="dialogVisible">
          <post-form @create="createPost" />
        </my-dialog>
        <post-list :posts="postsStore.sortedAndSearchedPosts" @remove="removePost" v-if="!postsStore.isPostsLoading" />
        <div v-else>Идёт загрузка...</div>
        <div v-intersection="postsStore.loadMorePosts" class="observer" />
  </div>
</template>

<script lang="ts">
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import type { Post } from '@/types/types.ts'
import { usePostsStore } from '@/store/post.ts'

export default {
  components: { PostList, PostForm },
  data() {
    return {
      dialogVisible: false,
    };
  },
  computed: {
    postsStore() {
      return usePostsStore();
    }
  },
  methods: {
    createPost(post: Post) {
      this.postsStore.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post: Post) {
      this.postsStore.posts = this.postsStore.posts.filter((currentPost) => currentPost.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    hideDialog() {
      this.dialogVisible = false
    },
  },
  mounted() {
    this.postsStore.fetchPosts();
  },
}
</script>

<style>
  .app_btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    align-items: stretch;
  }

  .observer {
    height: 30px;
    background: green;
  }
</style>
