import { defineStore } from 'pinia';
import type { Item } from '@/types/items';

interface State {
  items: Item[] | null
}

export const useItemsStore = defineStore('itemsStore', {
  state: (): State => ({
    items: null
  }),
  actions: {
    async showAll() {
      const res = await fetch(`${import.meta.env.VITE_API_HOST}/items`);
      const json = await res.json() as Item[];
      this.items = json;
    },
    async update(item: Partial<Item>) {
      if(this.items === null || !item.id) return;
      const ind = this.items.findIndex(i => i.id === item.id);
      if(ind === -1) return;
      this.items[ind] = { ...this.items[ind], ...item };
    },
    async remove(id: number) {
      if(this.items === null) return;
      this.items = this.items.filter(i => i.id !== id);
    },
    async create(item: Item) {
      if(this.items === null) return;
      this.items.push(item);
    }
  }
});
