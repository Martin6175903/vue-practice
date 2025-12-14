import type { Directive } from 'vue'

const VFocus: Directive<HTMLElement> = {
  mounted(el: HTMLElement) {
    el.focus();
  },
};

export default {
  name: 'focus',
  directive: VFocus,
};
