import { createApp } from 'vue';
import Equal from 'equal-vue';
import 'equal-vue/dist/equal.css';
import './style/tailwind.css';
import './style/fix-equal-buttons.sass';
import App from './App.vue';

createApp(App).use(Equal).mount('#app');

// const vec = reactive(new Vector2(5, 5));
// const vecReadonly = readonly(vec);

// watchEffect(
//     () => {
//         console.log('VEC', vec.toKey());
//     },
//     { flush: 'sync' },
// );

// vec.add(new Vector2(5, 1));

// vecReadonly.add(new Vector2(-10, -10));
