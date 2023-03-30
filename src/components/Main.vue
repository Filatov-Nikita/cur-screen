<template>
  <main class="board">
    <aside class="aside">
      <div class="title">{{ catsStore.current?.name ?? '-' }}</div>
    </aside>

    <Item v-for="item in itemsStore.items" :key="item.id" :item="item" />

    <Controls />
  </main>
</template>

<script setup lang="ts">
  import { useItemsStore } from '@/stores/items';
  import { useCategoriesStore } from '@/stores/categories';
  import Item from './Item.vue';
  import Controls from './Controls.vue';

  const itemsStore = useItemsStore();
  const catsStore = useCategoriesStore();
</script>
<style scoped>
  .board {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background-image: url(@/assets/cover.png), radial-gradient(58.31% 58.31% at 50% 50%, #6F6F6F 0%, #393939 100%);
    background-size: cover;
    background-repeat: no-repeat;
  }

  .aside {
    width: 240px;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(111, 110, 106, 0.68);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 0px 58.8113px rgba(91, 70, 68, 0.07), 0px 0px 33.6064px rgba(91, 70, 68, 0.07), 0px 0px 19.6038px rgba(91, 70, 68, 0.07), 0px 0px 9.80188px rgba(91, 70, 68, 0.07), 0px 0px 2.80054px rgba(91, 70, 68, 0.07);
    backdrop-filter: blur(9px);
    border-radius: 0px 48px 48px 0px;
    z-index: 50;
  }

  .title {
    position: absolute;
    width: 1500px;
    font-weight: 700;
    font-size: 99px;
    line-height: 1;
    text-transform: uppercase;
    color: var(--gray);
    transform: rotate(-90deg) translate(-1249px, -631px);
  }
</style>
