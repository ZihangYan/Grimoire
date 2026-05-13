<script setup lang="ts">
  import { RouterView, useRouter } from 'vue-router'
  // import { onMounted } from 'vue';
  // import { useMageStore } from './stores/mage';
  // import { db } from './db';

  // const mageStore = useMageStore();
  // const router = useRouter();

  // onMounted(async () => {
  //   const currentMage = mageStore.currentMage;
  //   const bufferMageId = localStorage.getItem('activeMageId');
  //   if (!currentMage && bufferMageId) {
  //     const id = Number(bufferMageId);
  //     const user = await db.mageInfo.get(id);
  //     if (user) {
  //       mageStore.login(user);
  //     } else {
  //       router.push('/');
  //     }
  //   }
  // })
</script>

<template>
  <RouterView />
</template>