import { defineStore } from 'pinia';
import type { Post } from '@/types/types.ts';
import axios from 'axios'

export const usePostsStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],
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
  }),
  getters: {
    sortedPosts(): Post[] {
      if (!this.selectedSort) return this.posts

      return [...this.posts].sort((a, b) =>
        a[this.selectedSort].localeCompare(b[this.selectedSort])
      )
    },

    sortedAndSearchedPosts(): Post[] {
      return this.sortedPosts.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
  },
  actions: {
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
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Ошибка получения данных!');
      }
    },
  },
})
