import type { ComponentOptionsMixin } from 'vue'

export default {
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
  },
  mounted() {

  },
} as ComponentOptionsMixin;
