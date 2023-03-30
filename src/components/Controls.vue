<template>
  <div class="controls">
    <div
      class="btn"
      v-for="cat in catsStore.categories" :key="cat.id"
      @click="catsStore.changeCurrent(cat)"
    >
      <div
        class="item"
        :class="{ 'item-active': cat.id === catsStore.current?.id }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useCategoriesStore } from '@/stores/categories';

  const catsStore = useCategoriesStore();
</script>

<style scoped>
  .btn {
    padding: 12px;
    cursor: pointer;
  }
  .item {
    width: 24px;
    height: 24px;
    position: relative;
    cursor: pointer;
  }

  .item::after {
    content: "";
    position: absolute;
    width: 90px;
    height: 90px;
    background-image: url(@/assets/star.png);
    background-position: -59px 83px;
    z-index: -1;
    cursor: default;
  }

  .item-active::after {
    background-image: url(@/assets/star-active.png);
    background-position: -128px 165px;
    left: -94px;
    top: -65px;
    width: 484px;
    height: 484px;
  }

  .controls {
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    bottom: 59px;
    display: flex;
    z-index: 100;
  }
</style>
