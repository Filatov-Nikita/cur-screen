<template>
  <div class="app">
    <div class="item" :class="{ visible: item.visible }"
      v-for="(item, index) in items"
      :style="{
        width: item.width,
        height: item.height,
        'transform': `translate3d(${item.left},${item.top},0)`
      }"
    >
      <div class="inner">{{ index }}</div>
    </div>
    <div class="overlay"></div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  const items = reactive([]);
  const w = window.innerWidth;
  const h = window.innerHeight;

  const cols = 24;
  const colWidth = w / cols;
  const rowlWidth = h / cols;

  let map = makeMap();
  console.log(map);

  init();

  function createItem(rows, cols) {
    return {
      width: colWidth * cols + 'px',
      height: rowlWidth * rows + 'px',
      top: '0px',
      left: '0px',
      cols,
      rows,
      visible: false
    }
  }

  function makeMap() {
    const map = [];

    for (let i = 0; i < cols; i++) {
      map[i] = [];
      for (let j = 0; j < cols; j++) {
        map[i][j] = 0;
      }
    }

    return map;
  };

  function setItem(item, row, col) {
    item.top = rowlWidth * row + 'px';
    item.left = colWidth * col + 'px';

    const fromRow = row - 1;
    const fromCol = col - 1;

    for (let i = fromRow; i < fromRow + item.rows; i++) {
      for (let j = fromCol; j < fromCol + item.cols; j++) {
        map[i][j] = 1;
      }
    }
  }

  function canSet(item, row, col) {
    if(row + item.rows > cols) return false;
    if(col + item.cols > cols) return false;
    const fromRow = row - 1;
    const fromCol = col - 1;

    let can = true;

    for (let i = fromRow; i < fromRow + item.rows; i++) {
      for (let j = fromCol; j < fromCol + item.cols; j++) {
        if(map[i][j] === 1) can = false;
      }
    }

    return can;
  }

  function getRandom() {
    return Math.floor(Math.random() * 23 + 1);
  }

  function init() {
    for (let i = 0; i < 20; i++) {
      const itemCols = 3;
      const itemRows = 4;
      const item = createItem(itemRows, itemCols);
      render(item);
      items.push(item);
    }
  }

  function render(item) {
    let row, col, max = 0;
      do {
        if(max > 200) return;
        row = getRandom();
        col = getRandom();
        max++;
      } while(!canSet(item, row, col));

      setItem(item, row, col);

      item.visible = Math.random() > 0.5;
  }

  window.render = () => {
    map = makeMap();
    items.forEach(item => {
      render(item);
    })
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

  .visible {
    z-index: 15 !important;
  }
  .item {
    z-index: 5;
    position: absolute;
    box-sizing: border-box;
    border: 1px solid red;
    padding: 20px;
    transition: transform 300ms;
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
