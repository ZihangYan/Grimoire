<template>
    <div v-if="mage">{{ mage.mageName }}</div>
    <div v-else>Loading...</div>
</template>

<script setup lang="ts">
    import { ref,  onMounted } from 'vue'
    import { db, type MageInfo } from '@/db'

    const mage = ref<MageInfo | null> (null)
    onMounted(async () => {
        const id = localStorage.getItem('activeMageId')
        if (id) {
            mage.value = (await db.mageInfo.get(Number(id))) || null
        }
    })
</script>