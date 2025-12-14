<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск..." name="search-query-input" />
    <div class="app_btns">
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:isShow="dialogVisible"> </my-dialog>
    <post-list :posts="sortedAndSearchedPosts" v-if="!isPostsLoading" />
    <div v-else>Идёт загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer" />
  </div>
</template>

<script lang="ts">
import PostList from '@/components/PostList.vue'
import { usePosts } from '@/hooks/usePosts.ts'
import { useSortedPosts } from '@/hooks/useSortedPosts.ts'
import { useSortedAndSearchedPosts } from '@/hooks/useSortedAndSearchedPosts.ts'

export default {
  components: { PostList },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По описанию' },
      ],
    }
  },
  setup() {
    const LIMIT_POSTS = 10
    const { posts, isPostsLoading, totalPages, page, loadMorePosts, fetchingData } =
      usePosts(LIMIT_POSTS)
    const { sortedPosts, selectedSort } = useSortedPosts(posts)
    const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts)

    return {
      page,
      posts,
      isPostsLoading,
      totalPages,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
      loadMorePosts,
      fetchingData,
    }
  },
  mounted() {
    this.fetchingData();
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

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}
</style>
