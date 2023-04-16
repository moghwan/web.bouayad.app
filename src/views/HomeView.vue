<template>
  <div v-auto-animate="{ duration: 500 }" class="grid grid-cols-12 gap-4">
    <TheDay v-if="data" :data="data" @parent-refreshtheday="refreshTheDay" :selectedCityId="selectedCityId" :class="!showPanel ? 'col-span-12' : 'col-span-4'"/>
      <div class="col-span-7 flex flex-col items-center rounded-lg shadow-lg bg-white h-5/6 p-5" v-if="data && showPanel">
        <RamadanDashboard class="flex w-full h-full" v-if="showRamadanDashboard"/>
        <SalateTimes class="flex w-full h-full" v-if="showSalateTimes"/>
        <Settings class="flex w-full h-full" v-if="showSettings"/>

        <SectionsNav class="mt-auto"/>
      </div>

<!--      <button @click="settingsStore.switchDisplayMode()" class="fixed bottom-10 right-8 bg-gray-50 w-12 h-12 rounded-full drop-shadow-lg flex justify-center items-center hover:drop-shadow-xl">-->
<!--          <IconLayoutCards color="gray"/>-->
<!--      </button>-->
    <spinner class="flex justify-center h-screen items-center col-span-12" v-if="!data"/>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import TheDay from "@/components/TheDay.vue";
import Spinner from "@/components/partials/SpinnerLoader.vue";
import {useCityStore} from "@/stores/city"
import {useSettingsStore} from "@/stores/settings"
import RamadanDashboard from "@/components/sections/RamadanDashboard.vue";
import SalateTimes from "@/components/sections/SalateTimes.vue";
import Settings from "@/components/sections/Settings.vue";
import SectionsNav from "@/components/partials/Nav/SectionsNav.vue";
import { IconLayoutCards } from '@tabler/icons-vue';

const store = useCityStore();
const data = ref(null);
const selectedCityId = ref(store.cityId);
const settingsStore = useSettingsStore();

onMounted(() => {
  fetchData(selectedCityId.value)
})

async function fetchData(cityId) {
  const HOST   = process.env.RA_HOST || import.meta.env.VITE_BOUAYADAPP_API_URL;
  const SECRET = process.env.RA_SECRET || import.meta.env.VITE_BOUAYADAPP_API_SECRET;

  const options = {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": HOST,
      "x-rapidapi-key": SECRET
    }
  };
  const response = await fetch(`https://${HOST}/hikams/${cityId}`, options);
  data.value = await response.json()
  selectedCityId.value = cityId;
}

const refreshTheDay = (cityId) => cityId ? fetchData(cityId) : fetchData(selectedCityId.value)
const showPanel = computed(() => settingsStore.displayMode)
const showRamadanDashboard = computed(() => settingsStore.showRamadanDashboard)
const showSalateTimes = computed(() => settingsStore.showSalateTimes)
const showSettings = computed(() => settingsStore.showSettings)

</script>
