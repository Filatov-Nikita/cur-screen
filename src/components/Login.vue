<template>
  <div class="board">
    <div class="form">
      <h1 class="h1">Вход</h1>
      <form @submit.prevent="submit">
        <label for="username" class="label">Логин</label>
        <input required id="username" class="input" type="text" v-model="form.username">
        <label for="password" class="label">Пароль</label>
        <input required id="password" class="input" type="password" v-model="form.password">
        <button class="btn" type="submit">Войти</button>
      </form>
      <div v-if="error" class="error">
        Неправильный логин или пароль
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';

  const store = useUserStore();
  const router = useRouter();

  const form = reactive({
    username: '',
    password: '',
  });

  const error = ref(false);

  async function submit() {
    try {
      await store.login(form);
      router.push({ name: 'main' });
    } catch(e) {
      console.log(e);
      error.value = true;
    }
  }
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

  .form {
    padding-top: 800px;
    max-width: 1000px;
    margin: 0 auto;
  }

  .h1 {
    font-size: 90px;
    color: white;
    margin-bottom: 60px;
  }

  .label {
    font-size: 36px;
    color: white;
    margin-bottom: 20px;
    display: inline-block;
  }
  .input {
    height: 80px;
    width: 100%;
    display: block;
    margin-bottom: 40px;
    background: #e3e3e3;
    font-size: 36px;
    padding: 0 20px;
    border-radius: 10px;
  }

  .btn {
    width: 200px;
    display: block;
    height: 70px;
    font-size: 36px;
    border-radius: 10px;
    font-weight: 500;
    background: white;
  }

  .error {
    font-size: 36px;
    color: red;
    margin-top: 30px;
  }
</style>
