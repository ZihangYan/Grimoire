// stores/userStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type MageInfo } from '@/db'


export const useMageStore = defineStore('user', () => {
  const currentMage = ref<MageInfo | null>(null)

  function login(user: MageInfo) {
    currentMage.value = user
    localStorage.setItem('activeMageId', String(user.id))
  }

  return { currentMage, login }
})