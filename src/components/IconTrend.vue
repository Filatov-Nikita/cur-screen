<template>
  <div class="trend-block">
    <svg class="trend" :class="{ down: value === false }" :width="width" :height="height" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.0843 16.4556C28.4626 10.8185 26.6517 8 24 8C21.3483 8 19.5374 10.8185 15.9157 16.4556L10.9867 24.1273C7.04178 30.2673 5.06931 33.3374 6.42788 35.6687C7.78644 38 11.548 38 19.0711 38L28.929 38C36.452 38 40.2136 38 41.5721 35.6687C42.9307 33.3374 40.9582 30.2673 37.0133 24.1273L32.0843 16.4556Z" />
    </svg>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    value: boolean | null
    width: string
    height: string
  }>();
</script>

<style scoped>
  .trend-block {
    display: inline-block;
  }
  .trend {
    fill: #20D472;
  }
  .down {
    transform: rotate(180deg);
    fill: #FC7B53;
  }
</style>
