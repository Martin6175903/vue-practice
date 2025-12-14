import axios from 'axios'
import { onMounted, ref } from 'vue'
import type { Post } from '@/types/types.ts'

export const usePosts = (limit: number) => {
  const posts = ref([] as Post[]);
  const totalPages = ref(0);
  const isPostsLoading = ref(false);
  const page = ref(1);

  const fetchingData = async () => {
    try {
      isPostsLoading.value = true;

      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: page.value,
          _limit: limit,
        }
      });
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
      posts.value = [...posts.value, ...response.data];
    } catch (e) {
      alert('Ошибка получения данных!');
    } finally {
      isPostsLoading.value = false;
    }
  }

  const loadMorePosts = async () => {
    if (isPostsLoading.value || page.value >= totalPages.value) return;

    try {
      page.value += 1;

      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: page.value,
          _limit: limit,
        }
      });
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
      posts.value = [...posts.value, ...response.data];
    } catch (e) {
      alert('Ошибка получения данных!');
    }
  }

  return {
    page,
    posts,
    isPostsLoading,
    totalPages,
    loadMorePosts,
    fetchingData,
  };
}
