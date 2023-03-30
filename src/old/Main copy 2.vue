<template>
  <div class="app">
    <Cell
      v-for="cell in cells"
      :cols="cell.cols"
      :rows="cell.rows"
      :row="cell.row"
      :col="cell.col"
      :visible="cell.CategoryId === catsStore.current"
    />
    <!-- <div class="overlay"></div> -->
  </div>
</template>

<script setup lang="ts">
  import { reactive, provide, computed } from 'vue';
  import type { Item } from '@/types/items';
  import { ScreenWKey, ScreenHKey, ColsKey } from '@/symbols';
  import Cell from '@/components/Cell.vue';
  import { useItemsStore } from '@/stores/items';
  import { useCategoriesStore } from '@/stores/categories';

  const catsStore = useCategoriesStore();
  const itemsStore = useItemsStore();

  type Row = number;
  type Col = number;

  interface Cell extends Item {
    rows: number,
    cols: number,
    row: Row,
    col: Col,
  }

  const w = window.innerWidth;
  const h = window.innerHeight;

  const cols = 24;

  provide(ScreenWKey, w);
  provide(ScreenHKey, h);
  provide(ColsKey, cols);

  let map = makeMap();

  type Map = number[][];

  const cells: Cell[] = reactive(initCells());

  function initCells() {
    if(itemsStore.items === null) return [];
    return itemsStore.items.map(createCell);
  }

  function createCell(item: Item) {
    const cell = {
      ...item,
      cols: 5,
      rows: 7,
      col: 0,
      row: 0
    }

    const { row, col } = getPos(cell);

    cell.col = col;
    cell.row = row;

    setItem(cell, row, col);

    return cell;
  }

  function makeMap(): Map {
    const map: any = [];

    for (let i = 0; i < cols; i++) {
      map[i] = [];
      for (let j = 0; j < cols; j++) {
        map[i][j] = 0;
      }
    }

    return map;
  };

  function setItem(cell: Cell, row: Row, col: Col) {
    const fromRow = row - 1;
    const fromCol = col - 1;

    for (let i = fromRow; i < fromRow + cell.rows; i++) {
      for (let j = fromCol; j < fromCol + cell.cols; j++) {
        map[i][j] = 1;
      }
    }
  }

  function canSet(cell: Cell, row: Row, col: Col) {
    if(row + cell.rows > cols) return false;
    if(col + cell.cols > cols) return false;
    const fromRow = row - 1;
    const fromCol = col - 1;

    let can = true;

    for (let i = fromRow; i < fromRow + cell.rows; i++) {
      for (let j = fromCol; j < fromCol + cell.cols; j++) {
        if(map[i][j] === 1) can = false;
      }
    }

    return can;
  }

  function getRandom() {
    return Math.floor(Math.random() * (cols - 1) + 1);
  }

  function getPos(cell: Cell) {
    let row: Row, col: Col, max = 0;

    do {
      if(max > 200) throw new Error();
      row = getRandom();
      col = getRandom();
      max++;
    } while(!canSet(cell, row, col));

    return { row, col };
  }
</script>
<style>
  body {
    padding: 0;
    margin: 0;
    background: #3b3b3b;
  }
</style>
<style scoped>
  .app {
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  .inner {
    background: yellow;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    font-size: 50px;
    text-align: center;
    padding-top: 100px;
    box-sizing: border-box;
  }
  .overlay {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    backdrop-filter: blur(12px);
    background: rgba(62, 62, 62, 0.8);
    z-index: 10;
  }
</style>
