<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-input
      v-model="searchQuery"
      placeholder="Поиск..."
      name="search-query-input"
    />
    <div class="app_btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select
        v-model="selectedSort"
        :options="sortOptions"
      />
    </div>
    <my-dialog v-model:isShow="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading" />
    <div v-else>Идёт загрузка...</div>
    <div ref="observer" class="observer"/>
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--        class="page"-->
    <!--        v-for="pageNum in totalPages"-->
    <!--        :key="pageNum"-->
    <!--        :class="{-->
    <!--          'current-page': page === pageNum,-->
    <!--        }"-->
    <!--        @click="changePage(pageNum)"-->
    <!--      >-->
    <!--        {{ pageNum }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts">
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import type { Post } from '@/types/types.ts'
import axios from 'axios'

export default {
  components: { PostList, PostForm },
  data() {
    return {
      posts: [] as Post[],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '' as keyof Omit<Post, 'id' | 'userId'>,
      sortOptions: [
        { value: 'title', name: 'По названию', },
        { value: 'body', name: 'По описанию', },
      ],
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
    };
  },
  methods: {
    createPost(post: Post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post: Post) {
      this.posts = this.posts.filter((currentPost) => currentPost.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    hideDialog() {
      this.dialogVisible = false
    },
    // changePage(pageNum: number) {
    //   this.page = pageNum;
    //   this.fetchPosts();
    // },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        alert('Ошибка получения данных!');
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        // this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Ошибка получения данных!');
      }
    },
  },
  mounted() {
    this.fetchPosts();

    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };

    const callback: IntersectionObserverCallback = (entries, observer) => {
      if (entries[0]?.isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts();
      }
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer as HTMLDivElement);
  },
  computed: {
    sortedPosts() {
      if (!this.selectedSort) return this.posts;

      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort].localeCompare(post2[this.selectedSort]);
      });
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
  },
  // watch: {
  //   page() {
  //     this.fetchPosts();
  //   }
  // }
}
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
