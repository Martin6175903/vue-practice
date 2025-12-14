import type { Directive } from 'vue'

const VIntersection: Directive<HTMLElement, () => void> = {
  mounted (el: HTMLElement, binding) {
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      if (entries[0]?.isIntersecting) {
        binding.value();
      }
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  }
};

export default {
  name: 'intersection',
  directive: VIntersection,
};
