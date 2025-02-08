<template>
  <div
      v-if="showStatusBar"
      :class="[
      'fixed top-0 left-0 w-full h-auto text-center py-1 text-white text-sm font-bold',
      online ? 'bg-green-400' : 'bg-red-400',
    ]"
  >
    <p v-if="online">تم الاتصال بالإنترنت</p>
    <p v-if="!online">تم فقدان الاتصال بالإنترنت</p>
  </div>
</template>

<script setup>
import {useOnline} from '@vueuse/core'
import {ref, watch} from 'vue'

const online = useOnline()
const showStatusBar = ref(false)
const emit = defineEmits(['parent-refreshtheday'])

// check online status on mounted and show only if offline
onMounted(() => {
  if (!online.value) {
    showStatusBar.value = true
  }
})

watch(online, () => {
  showStatusBar.value = true // Show the status bar
  if (online.value) {
    setTimeout(() => {
      showStatusBar.value = false // Hide the status bar after 3 seconds
    }, 3000)

    emit('parent-refreshtheday')
    console.info('emit sent')
  }
})
</script>