import { defineStore } from 'pinia';

interface Cred { username: string, password: string };
interface Success { token: string };

export const useUserStore = defineStore('userStore', {
  state: ()=> ({

  }),
  actions: {
    async login(cred: Cred) {
      const res = await fetch(
        `${import.meta.env.VITE_API_HOST}/login`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(cred)
        }
      );
      if(res.status !== 200) throw new Error();
      const data = await res.json() as Success;
      window.localStorage.setItem('token', data.token);
      return data;
    }
  }
});
