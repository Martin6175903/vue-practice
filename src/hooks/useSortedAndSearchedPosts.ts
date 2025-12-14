import type { Post } from '@/types/types.ts'
import { computed, type ComputedRef, ref } from 'vue'

export const useSortedAndSearchedPosts = (sortedPosts: ComputedRef<Post[]>) => {
  const searchQuery = ref('');

  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter((post) => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
  });

  return {
    searchQuery,
    sortedAndSearchedPosts,
  }
}
