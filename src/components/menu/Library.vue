<template>
  <div class="h-full bg-[#FDFDFB] overflow-y-auto font-serif relative">
    <transition name="fade" mode="out-in">
      <div v-if="!selectedBookshelfId" class="p-12 max-w-7xl mx-auto">
        <div class="mb-14">
          <h1 class="text-4xl text-stone-800 tracking-wide mb-3">The Forbidden Library</h1>
          <p class="text-[10px] text-stone-400 uppercase tracking-[0.3em]">Collection of Ancient Manuscripts</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
  
  <div @click="openCreateModal"
       class="group relative aspect-[4/5] rounded-xl border-2 border-dashed border-stone-300 bg-stone-50/50 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 hover:border-amber-400 hover:bg-amber-50/50 hover:shadow-lg hover:-translate-y-1">
    <span class="text-4xl text-stone-300 transition-all duration-500 group-hover:text-amber-500 group-hover:scale-110">+</span>
    <span class="mt-4 text-[10px] font-bold tracking-[0.2em] text-stone-400 group-hover:text-amber-600 transition-colors duration-500">CONSTRUCT</span>
  </div>

  <div v-for="shelf in bookshelves" :key="shelf.id"
       @click="openBookshelf(shelf.id!)"
       class="group relative aspect-[4/5] rounded-xl cursor-pointer overflow-hidden bg-[#F5F5F0] border border-stone-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.12)]">
       <button @click.stop="confirmDelete(shelf.id!, shelf.name)" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500/10 text-red-500/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white z-30">
            <span class="text-sm">✕</span>
       </button>
    <div class="absolute inset-0 bg-gradient-to-b from-stone-300/30 to-transparent shadow-[inset_0_10px_20px_rgba(0,0,0,0.03)] pointer-events-none"></div>
    
    <div class="absolute bottom-[72px] left-6 right-6 h-1/2 flex items-end justify-center gap-1.5 opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:bottom-[76px]">
      <div class="w-1/4 h-full bg-stone-400 rounded-sm shadow-sm border-l border-white/40"></div>
      <div class="w-1/5 h-[85%] bg-amber-800/80 rounded-sm shadow-sm border-l border-white/40"></div>
      <div class="w-1/6 h-[90%] bg-stone-500 rounded-sm shadow-sm border-l border-white/40"></div>
      <div class="w-1/5 h-[80%] bg-stone-600 rounded-sm shadow-sm border-l border-white/40 transform rotate-6 origin-bottom-left ml-1"></div>
    </div>

    <div class="absolute bottom-16 inset-x-0 h-2 bg-stone-200 shadow-[0_2px_4px_rgba(0,0,0,0.05)] border-t border-white/50 group-hover:bg-amber-100 transition-colors duration-500"></div>

    <div class="absolute bottom-0 inset-x-0 h-16 bg-white flex flex-col justify-center px-5 z-20 group-hover:bg-amber-50/30 transition-colors duration-500">
      <h3 class="text-stone-800 text-sm font-bold tracking-wider truncate">{{ shelf.name }}</h3>
      <span class="text-[9px] text-stone-400 tracking-[0.2em] mt-1">{{ new Date(shelf.createdAt).toLocaleDateString() }}</span>
    </div>
    
  </div>

</div>
      </div>

      <div v-else class="p-12 max-w-7xl mx-auto">
        <div class="flex items-center gap-3 mb-10 cursor-pointer w-max group" @click="selectedBookshelfId = undefined">
          <div class="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 group-hover:border-amber-400 group-hover:text-amber-500 group-hover:bg-amber-50 transition-all duration-300">
            <span class="text-sm -ml-0.5">←</span>
          </div>
          <span class="text-[10px] font-bold tracking-[0.2em] text-stone-400 group-hover:text-amber-600 transition-colors">RETURN TO LIBRARY</span>
        </div>
        
        <div class="border-t border-stone-100 pt-8">
            <h2 class="text-2xl text-stone-800 tracking-wide">Inner Sanctum (ID: {{ selectedBookshelfId }})</h2>
            <p class="text-stone-400 mt-4 text-sm">Books list will be rendered here...</p>
        </div>
      </div>
    </transition>

    <Teleport to="body">
      <transition name="modal">
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center font-serif">
          <div class="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" @click="closeModal"></div>
          
          <div class="relative bg-[#FDFDFB] w-full max-w-md p-8 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-amber-900/10 transform transition-all">
            <h3 class="text-2xl text-stone-800 mb-2">Summon Bookshelf</h3>
            <p class="text-xs text-stone-400 tracking-wider mb-6">INJECT A TRUE NAME FOR YOUR NEW COLLECTION</p>
            
            <input 
              v-model="newShelfName" 
              @keyup.enter="confirmCreate"
              type="text" 
              placeholder="e.g. Forbidden Spells..."
              class="w-full bg-transparent border-b-2 border-stone-200 py-2 text-stone-700 text-lg focus:outline-none focus:border-amber-400 transition-colors placeholder:text-stone-300 mb-8"
              ref="shelfInput"
            >
            
            <div class="flex justify-end gap-4">
              <button @click="closeModal" class="px-5 py-2 text-sm text-stone-500 hover:text-stone-800 transition-colors tracking-widest">
                CANCEL
              </button>
              <button @click="confirmCreate" :disabled="!newShelfName.trim()" class="px-5 py-2 text-sm bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors tracking-widest disabled:opacity-50 disabled:cursor-not-allowed">
                CONSTRUCT
              </button>
            </div>
          </div>
        </div>
      </transition>
      <transition name="modal">
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center font-serif">
            <div class="absolute inset-0 bg-stone-900/600 backdrop-blur-sm" @click="cancelDelete"></div>
            <div class="relative bg-[#FDFDF8] w-full max-w-md p-8 rounded-2xl shadow-[0_20px_60px_rgba(220,38,38,0.15)] border border-red-900/10 transform transition-all">
                <div class="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                    <span class="text-2xl text-red-500">!</span>
                </div>
                <h3 class="text-2xl text-stone-500 mb-6 leading-relaxed">Shatter Bookshelf?</h3>
                <p class="text-sm text-stone-500 mb-6 leading-relaxed">
                    Are you absolutely certain you wish to destroy <strong class="text-stone-800">"{{ bookshelfToDelete?.name }}"</strong>?<br/>
                    <span class="text-red-500 text-xs tracking-wider uppercase mt-2 block">All enclosed spells will be lost forever.</span>
                </p>
                <div class="flex justify-end gap-4 mt-8 border-t border-stone-100 pt-6">
                    <button @click="cancelDelete" class="px-5 py-2 text-sm text-stone-500 hover:text-stone-800 transition-colors tracking-widest">
                        PRESERVE
                    </button>
                    <button @click="executeDelete" class="px-5 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md shadow-red-500/20 transition-all tracking-widest">
                        DESTROY
                    </button>
                </div>
            </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
    import { ref, toRef, nextTick } from 'vue'
    import { useBookShelves } from '@/hooks/useLibrary'

    const props = defineProps<{
    mageId?: number
    }>()

    const mageIdRef = toRef(props, 'mageId')

    const { bookshelves, addBookshelf, deleteBookshelf } = useBookShelves(mageIdRef)

    const selectedBookshelfId = ref<number | undefined>(undefined)

    const showModal = ref(false)
    const newShelfName = ref('')
    const shelfInput = ref<HTMLInputElement | null>(null)

    const openCreateModal = async () => {
        showModal.value = true
        await nextTick()
        shelfInput.value?.focus()
    }

    const closeModal = () => {
        showModal.value = false
        newShelfName.value = ''
    }

    const confirmCreate = async () => {
        if (newShelfName.value.trim()) {
            await addBookshelf(newShelfName.value.trim(), 'default')
            closeModal()
        }
    }

    const openBookshelf = (id: number) => {
        selectedBookshelfId.value = id
    }

    const showDeleteModal = ref(false)
    const bookshelfToDelete = ref<{id: number, name: string} | null>(null)

    const confirmDelete = (id: number, name: string) => {
        bookshelfToDelete.value = {id, name}
        showDeleteModal.value = true
    }

    const cancelDelete = () => {
        showDeleteModal.value = false
        bookshelfToDelete.value = null
    }

    const executeDelete = async () => {
        if(bookshelfToDelete.value) {
            await deleteBookshelf(bookshelfToDelete.value.id)
            cancelDelete()
        }
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

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* 回弹特效 */
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95) translateY(-10px);
}
</style>