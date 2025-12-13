import { createApp } from 'vue'
import App from "./App.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MySelect from '@/components/UI/MySelect.vue'

const app = createApp(App);

app.component('my-button', MyButton);
app.component('my-input', MyInput);
app.component('my-dialog', MyDialog);
app.component('my-select', MySelect);

app.mount('#app');
