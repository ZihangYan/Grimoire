<template>
  <div class="flex h-screen w-full bg-[#FDFDFB] overflow-hidden">
    <aside class="w-80 h-screen bg-[#FBFBFA] border-r border-stone-100 flex flex-col z-30 relative font-serif">
      <div class="p-8">
        <div class="group relative bg-white p-4 rounded-2xl border border-stone-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(212,175,55,0.08)]">
          <div class="flex items-center gap-4">
            <div class="relative">
              <img :src="mage?.pfp" 
                   class="w-12 h-12 rounded-full object-cover border border-stone-100 transition-transform duration-500 group-hover:scale-110">
              <div class="absolute -inset-1 rounded-full border border-amber-400/20 animate-pulse"></div>
            </div>
            
            <div class="flex flex-col">
              <span class="text-stone-800 font-bold tracking-widest text-sm">{{ mage?.mageName || 'Loading...' }}</span>
              <span class="text-[10px] text-stone-400 uppercase tracking-[0.2em] mt-1">Junior Archmage</span>
            </div>
          </div>
        </div>
      </div>
  
      <nav class="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        <div v-for="item in menuItems" :key="item.name"
             class="group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-sm">
          <div class="flex items-center gap-4">
            <div class="w-1 h-1 rounded-full bg-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <span class="text-stone-500 group-hover:text-stone-800 text-sm tracking-widest transition-colors">{{ item.name }}</span>
          </div>
        </div>
      </nav>
  
      <div class="p-8 border-t border-stone-50">
        <div class="flex items-center justify-between text-stone-400">
           <IconSettings />
           <span class="text-[10px] tracking-[0.2em]">VERSION 1.0.0</span>
        </div>
      </div>
    </aside>
    <main class="flex-1 h-full relative overflow-hidden">
      <Library :mage-id="mage?.id" />
    </main>
  </div>
</template>


<script setup lang="ts">
    import { ref,  onMounted } from 'vue'
    import { db, type MageInfo } from '@/db'
    import { IconSettings } from '@/components/icons'
    import Library from '@/components/menu/Library.vue'

    const mage = ref<MageInfo | null> (null)
    const menuItems = ref([
        {name: 'Library',},
        {},
        {},
        {},
    ])
    onMounted(async () => {
        const id = localStorage.getItem('activeMageId')
        if (id) {
            mage.value = (await db.mageInfo.get(Number(id))) || null
        }
    })
</script>