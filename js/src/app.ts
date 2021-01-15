import { createApp } from 'vue';
import Equal from 'equal-vue';
import 'equal-vue/dist/equal.css';
import './style/tailwind.css';
import './style/fix-equal-buttons.sass';
import App from './App.vue';

createApp(App).use(Equal).mount('#app');
