<template>
  <div class="cats">
    <div class="header">
      <h1 class="h1">{{ catStore.current?.name }}</h1>
    </div>
    <div class="area">
      <Item v-for="item in currentItems" :item="item" :key="item.id" />
      <div class="actions">
        <button
          class="btn"
          v-for="cat in catStore.categories"
          :key="cat.id"
          @click="catStore.changeCurrent(cat)"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Item from '@/components/Item.vue';
  import { useCategoriesStore } from '@/stores/categories';
  import { useItemsStore } from '@/stores/items';
  import { computed, watch } from 'vue';

  const itemsStore = useItemsStore();
  const catStore = useCategoriesStore();
  const loadedIds: number[] = [];

  catStore.changeCurrent(catStore.categories?.[0] ?? null);

  const currentItems = computed(() => {
    const items = itemsStore.items;
    const current = catStore.current;
    if(items === null || !current) return [];
    return items.filter(item => item.CategoryId === current.id);
  });

  watch(() => catStore.current, async () => {
    const current = catStore.current;
    if(current === null || loadedIds.includes(current.id)) return;
    await itemsStore.showAll(current.id);
    loadedIds.push(current.id);
  }, { immediate: true });
</script>
<style scoped>
  .cats {
    width: 100vw;
    height: 100vh;
    background: #141414;
    position: relative;
  }

  .area {
    position: relative;
    width: 100%;
    height: calc(100% - 80px);
  }
  .btn {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 4px;
    border: 0;
    font-size: 14px;
    cursor: pointer;
    background: #0236b9;
    color: white;
    text-transform: uppercase;
  }
  .btn:hover {
    background: #022d9b;
  }
  .btn:active {
    background: #012580;
  }

  .btn + .btn {
    margin-left: 10px;
  }
  .actions {
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 100;
    padding: 20px;
    box-sizing: border-box;
  }

  .h1 {
    color: white;
  }

  .header {
    padding: 20px;
  }
</style>
