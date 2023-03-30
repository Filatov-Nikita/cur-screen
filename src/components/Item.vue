<template>
  <article ref="itemRef" class="item" :class="{ 'item-blured': isPrev }">
    <div class="content">
      <div class="header">
        <div class="icon">
          <svg v-if="item.icon"><use :xlink:href="`#icon-${item.icon}`"></use></svg>
        </div>
        <div class="title" v-html="item.name ?? '-'"></div>
      </div>
      <div class="numbers">
        <div class="value">{{ item.value ?? '-' }}</div>
        <div class="value2" v-html="item.title ?? '-'"></div>
      </div>
      <div class="footer">
        <div class="period" v-if="item.period">{{ item.period }}</div>
        <IconTrend
          v-if="item.trend !== null"
          width="48"
          height="48"
          :value="item.trend"
        />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
  import type { Item } from '@/types/items';
  import IconTrend from './IconTrend.vue';
  import { computed, ref, onMounted, watch } from 'vue';
  import { useCategoriesStore } from '@/stores/categories';
  import gsap, { Power2 } from 'gsap';

  const catsStore = useCategoriesStore();
  const props = defineProps<{ item: Item }>();
  const itemRef = ref<HTMLElement | null>(null);

  const scales = {
    xs: 0.5,
    sm: 0.6,
    md: 0.7,
    lg: 0.8,
    xl: 1,
  };

  const w = window.innerWidth;
  const h = window.innerHeight;

  const isCurrent = computed(() => catsStore.current?.id === props.item.CategoryId);
  const isPrev = computed(() => catsStore.prev?.id === props.item.CategoryId);

  const randomPos = { x: getRand(w, w) , y: getRand(h, h) };

  const pos = computed(() => {
    if(isCurrent.value || isPrev.value) {
      return { x: props.item.x ?? 0, y: props.item.y ?? 0 };
    }

    return randomPos;
  });

  const delay = Math.random() * 4;

  onMounted(() => {
    if(itemRef.value === null) return;

    gsap.set(itemRef.value, {
      scale: scales[props.item.size ?? 'md'],
      x: pos.value.x,
      y: pos.value.y,
      z: 0
    });
  });

  watch(() => catsStore.current, (cat) => {
    if(itemRef.value === null) return;

    gsap.to(itemRef.value, {
      duration: 1.5,
      ease: Power2.easeOut,
      x: pos.value.x,
      y: pos.value.y,
      z: 0
    });
  });

  watch([
    () => props.item.x,
    () => props.item.y,
  ], () => {
    if(itemRef.value === null) return;
    gsap.set(itemRef.value, {
      x: pos.value.x,
      y: pos.value.y,
      z: 0
    });
  }, { immediate: true });

  watch(() => props.item.size, () => {
    if(itemRef.value === null) return;
    gsap.set(itemRef.value, {
      scale: scales[props.item.size ?? 'md'],
    });
  });

  function getRand(from: number, to: number) {
    const mul = Math.random() > 0.5 ? 1 : -1;
    return Math.floor(Math.random() * to + from) * mul;
  }
</script>
<style scoped>
  .item {
    position: absolute;
    left: 0;
    top: 0;
    width: 1200px;
    height: 1200px;
    background-image: url(@/assets/item.svg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: filter 0.8s, opacity 0.8s;
    z-index: 20;
  }

  .item-blured {
    filter: blur(20px);
    opacity: 0.3;
    z-index: 10;
  }

  .content {
    width: 100%;
    height: 100%;
    padding: 191px 191px;
  }

  .header {
    text-align: center;
    padding: 0 100px;
    padding-top: 50px;
  }

  .numbers {
    margin-top: 20px;
    text-align: center;
  }

  .value {
    font-size: 150px;
    font-weight: 700;
    line-height: 1;
    color: var(--gray);
  }

  .value2 {
    margin-top: 20px;
    font-size: 48px;
    font-weight: 500;
    line-height: 1;
    color: var(--gold);
    padding: 0 60px;
    height: 120px;
  }

  .icon {
    width: 120px;
    height: 120px;
    display: inline-block;
  }

  .icon svg {
    width: 100%;
    height: 100%;
  }
  .title {
    font-size: 40px;
    font-weight: 500;
    color: var(--gray);
    margin-top: 12px;
    min-height: 120px;
    line-height: 1.3;
  }

  .period {
    color: var(--gold);
    font-weight: 500;
    font-size: 30px;
    line-height: 1;
    margin-bottom: 12px;
  }

  .footer {
    height: 120px;
    bottom: 200px;
    position: absolute;
    left: 0;
    text-align: center;
    width: 100%;
    padding: 0 400px;
  }
</style>
