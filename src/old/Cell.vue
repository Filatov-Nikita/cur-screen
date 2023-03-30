<template>
  <div
    class="cell"
    :class="{ 'visible': visible }"
    :style="styles"
  >
    <Item />
  </div>
</template>

<script setup lang="ts">
  import { inject, computed } from 'vue';
  import { ScreenWKey, ScreenHKey, ColsKey } from '@/symbols';
  import Item from '@/components/Item2.vue';

  const w = inject(ScreenWKey) ?? 0;
  const h = inject(ScreenHKey) ?? 0;
  const cols = inject(ColsKey) ?? 24;

  const props = defineProps<{
    cols: number,
    rows: number,
    visible: boolean,
    row: number,
    col: number,
  }>();

  const colWidth = w / cols;
  const rowlWidth = h / cols;

  const styles = computed(() => {
    return {
      width: (colWidth * props.cols) + 'px',
      height: (rowlWidth * props.rows) + 'px',
      top: (rowlWidth * props.row) + 'px',
      left: (colWidth * props.col) + 'px',
    }
  });
</script>
<style scoped>
  .cell {
    z-index: 5;
    position: absolute;
    box-sizing: border-box;
    border: 1px solid red;
    padding: 20px;
    transition: transform 300ms;
  }
  .visible {
    z-index: 15 !important;
  }
</style>
