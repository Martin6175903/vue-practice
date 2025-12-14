import { createApp } from 'vue'
import App from "./App.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MySelect from '@/components/UI/MySelect.vue'
import router from '@/router/router.ts'
import directives from '@/directives'

const app = createApp(App);

app.component('my-button', MyButton);
app.component('my-input', MyInput);
app.component('my-dialog', MyDialog);
app.component('my-select', MySelect);

directives.forEach(({ name, directive }) => {
  app.directive(name, directive);
})

app
  .use(router)
  .mount('#app');
