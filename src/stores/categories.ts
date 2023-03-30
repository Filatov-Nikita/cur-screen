import { defineStore } from 'pinia';
import type { Category } from '@/types/categories';

interface State {
  categories: Category[] | null,
  current: Category | null,
  prev: Category | null,
}

export const useCategoriesStore = defineStore('categoriesStore', {
  state: (): State => ({
    categories: null,
    current: null,
    prev: null,
  }),
  actions: {
    changeCurrent(cat: Category | null) {
      if(this.current?.id === cat?.id) return;
      this.prev = this.current;
      this.current = cat;
    },
    async showAll() {
      const res = await fetch(`${import.meta.env.VITE_API_HOST}/categories`);
      const json = await res.json() as Category[];
      this.categories = json;
    },
    async remove(id: number) {
      if(this.categories === null) return;
      this.categories = this.categories.filter(cat => cat.id !== id);
    },
  }
});
