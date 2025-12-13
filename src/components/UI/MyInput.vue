<template>
  <input class="input" type="text" :value="modelValue" @input="updateInputValue">
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'my-input',
    props: {
      modelValue: [String, Number],
    },
    methods: {
      updateInputValue(event: InputEvent) {
        this.$emit('update:modelValue', (event.target as HTMLInputElement).value);
      }
    }
  })
</script>

<style scoped>
  .input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
  }
</style>
