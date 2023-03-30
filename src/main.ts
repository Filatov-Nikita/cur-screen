import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useCategoriesStore } from '@/stores/categories';
import { useItemsStore } from '@/stores/items';
import type { Item } from './types/items';
import type { Category } from './types/categories';
import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';
import 'virtual:svg-icons-register';
import './css/fonts.css';
import './css/app.css';
const app = createApp(App);
const router = createRouter({ history: createWebHashHistory(), routes });

app.use(createPinia());
app.use(router);

const categoriesStore = useCategoriesStore();
const itemsStore = useItemsStore();

const sse = new EventSource(`${import.meta.env.VITE_API_HOST}/sse-stream`);

sse.addEventListener('create:item', (e) => {
  const item = JSON.parse(e.data) as Item;
  itemsStore.create(item);
});

sse.addEventListener('remove:item', (e) => {
  const id = JSON.parse(e.data) as number;
  itemsStore.remove(id);
});

sse.addEventListener('update:item', (e) => {
  const item = JSON.parse(e.data) as Partial<Item>;
  itemsStore.update(item);
});

sse.addEventListener('change:category', (e) => {
  const cat = JSON.parse(e.data) as Category;
  categoriesStore.changeCurrent(cat);
});

sse.addEventListener('remove:cat', (e) => {
  const id = JSON.parse(e.data) as number;
  categoriesStore.remove(id);
});

Promise.all([
  categoriesStore.showAll(),
  itemsStore.showAll()
])
.then(() => {
  categoriesStore.changeCurrent(categoriesStore.categories?.[0] ?? null);
  app.mount('#app');
}).catch(() => {
  alert('Не удалось загрузить данные')
});
