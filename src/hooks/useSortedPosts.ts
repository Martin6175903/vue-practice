import type { Post } from '@/types/types.ts'
import { computed, type Ref, ref } from 'vue'

export const useSortedPosts = (posts: Ref<Post[]>) => {
  const selectedSort = ref('' as keyof Omit<Post, 'id' | 'userId'>);
  const sortedPosts = computed(() => {
    if (!selectedSort.value) return posts.value;

    return [...posts.value].sort((post1, post2) => {
      return post1[selectedSort.value].localeCompare(post2[selectedSort.value]);
    });
  })

  return {
    selectedSort,
    sortedPosts,
  };
}
