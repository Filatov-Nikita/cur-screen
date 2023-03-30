<template>
  <div class="item" :class="itemClass" :style="coords">
    <div class="item__name">{{ item.name ?? '-' }}</div>
    <div class="item__value">
      <p>{{ item.value ?? '-' }}</p>
      <p>{{ item.title ?? '-' }}</p>
      <div class="trend" :class="trendClass"></div>
    </div>
    <div class="item__period">
      <p>{{ item.period ?? '-' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Item } from '@/types/items';
  import { computed } from 'vue';

  const props = defineProps<{
    item: Item
  }>();

  const coords = computed(() => {
    const y = props.item.y ?? 0;
    const x = props.item.x ?? 0;

    return {
      top: y + 'px',
      left: x + 'px',
    }
  });

  const trendClass = computed(() => {
    return {
      'trend--positive': props.item.trend === true,
      'trend--negative': props.item.trend === false,
    }
  });

  const itemClass = computed(() => {
    return {
      [ `item--${props.item.size ?? 'md'}` ]: true
    };
  });
</script>
<style scoped>
  .item {
    position: absolute;
    border-radius: 6px;
    background: #e9e9e9;
    width: 170px;
    padding: 12px;
  }

  .item--sm {
    width: 150px;
    padding: 10px;
  }

  .item--md {
    width: 180px;
    padding: 12px;
  }

  .item--lg {
    width: 200px;
    padding: 14px;
  }

  .item--xl {
    width: 220px;
    padding: 16px;
  }

  .item__name {
    font-weight: 600;
    margin-bottom: 10px;
    color: #303030;
    font-size: 20px;
  }

  .item__value {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .item__value p {
    color: #303030;
    font-size: 14px;
  }
  .item__value p + p {
    margin-left: 6px;
  }

  .item__period {
    font-size: 12px;
  }

  .trend {
    margin-left: 4px;
    width: 0;
    height: 0;
    border-bottom: solid 5px transparent;
    border-top: solid 5px var(--color);
    border-left: solid 5px transparent;
    border-right: solid 5px transparent;
  }

  .trend--positive {
    --color: green;
    transform: rotate(180deg);
  }
  .trend--negative {
    --color: red;
  }
</style>
