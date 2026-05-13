<template>
    <div class="flex flex-col items-center justify-center min-h-screen gap-4">
        <div class="flex">
            <div class="flex flex-col items-end mr-2">
                <span>mage-name:</span>
            </div>
            <div class="flex flex-col gap-1">
                <div class="flex relative">
                    <input type="text" class="w-56 border rounded hover:bg-gray-200" v-model="mageName" @input="hasName = false">
                    <div v-show="hasName" class="text-red-500 absolute left-full ml-2 whitespace-nowrap">Please enter your mage-name!</div>
                </div>
            </div>
        </div>
        <input type="file" id="pfp-upload" class="hidden" accept="image/*" @change="onFileChange">
        <label for="pfp-upload" class="relative overflow-hidden flex flex-col items-center justify-center w-32 h-32 border border-dashed  border-gray-300 rounded-full hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300 cursor-pointer group">
            <div v-if="!previewUrl" class="text-gray-400 group-hover:text-yellow-600 text-center">
                <span text-3xl>+</span>
                <p class="text-xs mt-1">Mage Portrait</p>
            </div>
            <template v-else>
                <img :src="previewUrl" class="w-full h-full object-cover" alt="">
                <div class="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    change
                </div>
            </template>
        </label>
        <div class="flex gap-3 mt-2">
          <div v-for="(url, index) in defaultPfp" :key="index"
            @click="selectPreset(url)"
            class="w-12 h-12 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 border-2"
            :class="[
              previewUrl === url ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-transparent'
            ]"
          >
            <img :src="url" class="w-full h-full rounded-full object-cover" alt="Preset">
          </div>
        </div>
        <div class="border rounded hover:bg-green-200 cursor-pointer" @click="checkMageInfo">register</div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { db, type MageInfo } from '@/db'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const mageName = ref('')
    const hasName = ref(false)
    const showPassword = ref(false)
    const defaultPfp = [
        new URL('@/assets/pfp/default/IMG_1.jpg', import.meta.url).href,
        new URL('@/assets/pfp/default/IMG_2.jpg', import.meta.url).href,
        new URL('@/assets/pfp/default/IMG_3.jpg', import.meta.url).href,
        new URL('@/assets/pfp/default/IMG_4.jpg', import.meta.url).href,
        new URL('@/assets/pfp/default/IMG_5.jpg', import.meta.url).href,
        new URL('@/assets/pfp/default/IMG_6.jpg', import.meta.url).href,
        new URL('@/assets/pfp/default/IMG_7.jpg', import.meta.url).href,
    ]
    const previewUrl = ref('')
    const selectedFile = ref<File | null>(null)

    const onFileChange = (e: Event) => {
        const target = e.target as HTMLInputElement
        if(target.files && target.files[0]) {
            const file = target.files[0]
            selectedFile.value = file
            previewUrl.value = URL.createObjectURL(file)   
        }
    }

    const selectPreset = (url: string) => {
       selectedFile.value = null
       previewUrl.value = url
    }

     const register = async () => {
        const userInfo: MageInfo = {
            mageName: mageName.value,
            pfp: selectedFile.value || previewUrl.value || defaultPfp[0]!
        }
        const newID =  await db.mageInfo.add(userInfo)
    }

    async function checkMageInfo() {
        if(!mageName.value) {
            hasName.value = true
        }
        if(mageName.value) {
            await register()
            router.replace('/')
        }
    }
</script>
