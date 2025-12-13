<template>
  <div class="dialog" v-if="isShow" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  export default defineComponent({
    name: "my-dialog",
    props: {
      isShow: {
        type: Boolean,
        default: false,
      }
    },
    methods: {
      hideDialog() {
        this.$emit('update:isShow', false);
      }
    }
  })
</script>

<style scoped>
  .dialog {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
  }
  .dialog__content {
    margin: auto;
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 15px 30px;
  }
</style>
