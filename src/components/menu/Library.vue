<template>
  <div class="h-full bg-[#FDFDFB] overflow-y-auto font-serif relative">
    <transition name="fade" mode="out-in">
      <div v-if="!selectedBookshelfId" class="p-12 max-w-7xl mx-auto">
        <div class="mb-14">
          <h1 class="text-4xl text-stone-800 tracking-wide mb-3">The Forbidden Library</h1>
          <p class="text-[10px] text-stone-400 uppercase tracking-[0.3em]">Collection of Ancient Manuscripts</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
          
          <div @click="handleCreate"
               class="group relative aspect-[3/4] rounded-xl border-2 border-dashed border-stone-300 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 hover:border-amber-400 hover:bg-amber-50/30">
            <span class="text-4xl text-stone-300 transition-all duration-500 group-hover:text-amber-500 group-hover:scale-110 group-hover:rotate-90">+</span>
            <span class="mt-4 text-[10px] font-bold tracking-[0.2em] text-stone-400 group-hover:text-amber-600 transition-colors duration-500">CONSTRUCT</span>
            <div class="absolute inset-0 rounded-xl bg-amber-400/0 group-hover:bg-amber-400/5 transition-colors duration-700 pointer-events-none"></div>
          </div>

          <div v-for="shelf in bookshelves" :key="shelf.id"
               @click="openBookshelf(shelf.id!)"
               class="group relative aspect-[3/4] rounded-xl cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] shadow-md">
            
            <div class="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900 transition-transform duration-1000 group-hover:scale-110"></div>
            
            <div class="absolute top-4 right-4 w-8 h-8 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                <div class="w-full h-full border border-white rounded-full"></div>
            </div>

            <div class="absolute left-0 top-0 bottom-0 w-4 bg-black/30 border-r border-white/10 z-10 shadow-[inset_-2px_0_10px_rgba(0,0,0,0.5)]"></div>
            
            <div class="absolute inset-x-0 bottom-0 h-1/3 bg-white/10 backdrop-blur-md border-t border-white/20 p-5 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h3 class="text-white text-lg font-bold tracking-wider truncate drop-shadow-md">{{ shelf.name }}</h3>
              <span class="text-[9px] text-stone-300 tracking-[0.2em] mt-2 opacity-80">{{ new Date(shelf.createdAt).toLocaleDateString() }}</span>
            </div>
            
            <div class="absolute inset-0 rounded-xl border border-white/10 transition-colors duration-500 group-hover:border-amber-400/40 z-20 pointer-events-none"></div>
          </div>

        </div>
      </div>

      <div v-else class="p-12 max-w-7xl mx-auto">
        <div class="flex items-center gap-3 mb-10 cursor-pointer w-max group" @click="selectedBookshelfId = undefined">
          <div class="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 group-hover:border-amber-400 group-hover:text-amber-500 group-hover:bg-amber-50 transition-all duration-300">
            <span class="text-sm -ml-0.5">←</span>
          </div>
          <span class="text-[10px] font-bold tracking-[0.2em] text-stone-400 group-hover:text-amber-600 transition-colors">RETURN TO HALL</span>
        </div>
        
        <div class="border-t border-stone-100 pt-8">
            <h2 class="text-2xl text-stone-800 tracking-wide">Inner Sanctum (ID: {{ selectedBookshelfId }})</h2>
            <p class="text-stone-400 mt-4 text-sm">Books list will be rendered here...</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue'
import { useBookShelves } from '@/hooks/useLibrary'


const props = defineProps<{
  mageId?: number
}>()


const mageIdRef = toRef(props, 'mageId')


const { bookshelves, addBookshelf } = useBookShelves(mageIdRef)


const selectedBookshelfId = ref<number | undefined>(undefined)


const handleCreate = async () => {
  const name = prompt('为新书架注入一个真名：')
  if (name && name.trim()) {
    await addBookshelf(name.trim(), 'default')
  }
}

const openBookshelf = (id: number) => {
  selectedBookshelfId.value = id
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>