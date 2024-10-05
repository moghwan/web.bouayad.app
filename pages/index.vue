<template>
  <div v-auto-animate="{ duration: 500 }" class="gap-0">
    <TheDay v-if="data" :data="data" @parent-refreshtheday="refreshTheDay" :selectedCityId="selectedCityId" :class="!showPanel || isTooSmall ? '' : 'hidden xl:flex'" class=" lg:m-10"/>
    <div class="w-full 2xl:w-7/12 h-screen lg:h-5/6 flex flex-col items-center rounded-lg shadow-lg bg-white lg:m-10" v-if="data && showPanel && !isTooSmall">
      <SalateTimes class="flex w-full h-5/6" v-if="showSalateTimes"/>
      <Settings class="flex w-full h-5/6" v-if="showSettings"/>
      <SectionsNav class="mt-10"/>
    </div>

    <button @click="settingsStore.switchDisplayMode()" :class="isTooSmall ? 'hidden' : null" class="fixed bottom-10 right-8 bg-gray-50 w-12 h-12 rounded-full drop-shadow-lg flex justify-center items-center hover:drop-shadow-xl">
      <IconLayoutCards color="gray"/>
    </button>
    <spinner class="flex justify-center h-screen items-center" v-if="!data"/>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import TheDay from "~/components/TheDay.vue";
import Spinner from "~/components/partials/SpinnerLoader.vue";
import {useCityStore} from "~/stores/city"
import {useSettingsStore} from "~/stores/settings"
import SalateTimes from "~/components/sections/SalateTimes.vue";
import Settings from "~/components/sections/Settings.vue";
import SectionsNav from "~/components/partials/Nav/SectionsNav.vue";
import { IconLayoutCards } from '@tabler/icons-vue';
import { vAutoAnimate } from '@formkit/auto-animate'
import {useFetch} from "nuxt/app";
const runtimeConfig = useRuntimeConfig()

const store = useCityStore();
const data = ref(null);
const selectedCityId = ref(store.cityId);
const settingsStore = useSettingsStore();
const windowWidth = ref(window?.innerWidth)

onMounted(() => {
  fetchData(selectedCityId.value)
  window.addEventListener('resize', onResize)
})

async function fetchData(cityId) {
  const HOST   =  runtimeConfig.public.apiHost
  const SECRET = runtimeConfig.apiSecret || ""

  data.value = await useFetch(`${HOST}/hikams/${cityId}`, {
    headers: {
      'x-rapidapi-host': HOST,
      'x-rapidapi-key': SECRET,
    },
    // onRequest({ request, options }) {
    //   // Set the request headers
    //   options.headers = options.headers || {
    //     "x-rapidapi-host": HOST,
    //     "x-rapidapi-key": SECRET
    //   }
    //   // options.headers.authorization = '...'
    // },
  },
  ).then(res => res.data);
  // data.value = await response.json()
  selectedCityId.value = cityId;
}

const onResize = () => windowWidth.value= window.innerWidth
const isTooSmall = computed(() => windowWidth.value <= 500)

const refreshTheDay = (cityId) => cityId ? fetchData(cityId) : fetchData(selectedCityId.value)
const showPanel = computed(() => settingsStore.displayMode)
const showSalateTimes = computed(() => settingsStore.showSalateTimes)
const showSettings = computed(() => settingsStore.showSettings)

</script>
