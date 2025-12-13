<template>
  <select :value="modelValue" @change="changeOption">
    <option disabled value="">Выберите из списка</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Option } from '@/types/types.ts'

export default defineComponent({
  name: 'my-select',
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array as PropType<Option[]>,
      default: () => [],
    },
  },
  methods: {
    changeOption(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.$emit('update:modelValue', target.value);
    }
  }
})
</script>

<style scoped></style>
