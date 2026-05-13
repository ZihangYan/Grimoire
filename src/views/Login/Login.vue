<template>
    <div v-if="hasAccount" class="min-h-screen flex flex-col items-center justify-center gap-4">
        <div class="text-4xl mb-4">Select Your Mage</div>
        <div class="flex gap-6 flex-wrap justify-center max-w-2xl min-h-[160px] content-start">
            <div v-for="account in paginatedAccounts" :key="account.id" @click="jumpMageSpace(account)" 
                class="flex flex-col items-center cursor-pointer p-4 border border-transparent rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-all group">
                <img :src="getPfpUrl(account.pfp)" class="w-20 h-20 rounded-full object-cover mb-2 border-2 border-gray-200 group-hover:border-yellow-400 transition-all" alt="Avatar">
                <span class="text-lg font-medium text-gray-700">{{ account.mageName }}</span>
            </div>
        </div>
        <div v-if="totalPages > 1" class="flex items-center gap-4 mt-2">
            <button @click="prevPage" :disabled="currentPage === 1" 
                class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                Prev
            </button>
            <span class="text-gray-600">{{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" 
                class="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                Next
            </button>
        </div>

        <div class="mt-8 text-gray-400 hover:text-gray-700 cursor-pointer underline transition-colors" @click="jumpRegister">
            instantiate a New Mage
        </div>
    </div>
    <div v-else class="min-h-screen flex flex-col items-center justify-center">
        <div class="text-5xl">Grimoire</div>
        <div class="mt-4 border hover:bg-yellow-200 cursor-pointer" 
            @click="jumpRegister">
            Start Your Adventure
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { db, type MageInfo } from '@/db'
    import { useMageStore } from '@/stores/mage' 

    const hasAccount = ref(false)
    const accountList = ref<MageInfo[]>([])
    const router = useRouter()
    const currentPage = ref(1)
    const pageSize = 8 
    const mageStore = useMageStore()

    function jumpRegister() {
        router.push('/register')
    }

    async function inferHasAccount() {
        const accounts = await db.mageInfo.toArray()
        if (accounts.length > 0) {
            accountList.value = accounts
            hasAccount.value = true
        }
    }

    const totalPages = computed(() => Math.ceil(accountList.value.length / pageSize))

    const paginatedAccounts = computed(() => {
        const start = (currentPage.value - 1) * pageSize
        const end = start + pageSize
        return accountList.value.slice(start, end)
    })

    function prevPage() {
        if (currentPage.value > 1) currentPage.value--
    }

    function nextPage() {
        if (currentPage.value < totalPages.value) currentPage.value++
    }

    const getPfpUrl = (pfp: string | File) => {
        if (typeof pfp === 'string') return pfp
        return URL.createObjectURL(pfp)
    }

    function jumpMageSpace(account: MageInfo) {
        mageStore.login(account)
        router.push('/library')
    }

    onMounted(() => {
        inferHasAccount()
    })
</script>
    
