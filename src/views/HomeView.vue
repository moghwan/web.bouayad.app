<template>
  <div v-auto-animate="{ duration: 500 }" class="grid grid-cols-8 gap-4">
    <TheDay v-if="data" :data="data" @parent-refreshtheday="refreshTheDay" :selectedCityId="selectedCityId" :class="!showPanel ? 'col-span-8' : 'col-span-2'"/>
    <div class="col-span-5 text-center  block rounded-lg shadow-lg bg-white h-5/6" v-if="data && showPanel">
        <RamadanDashboard v-if="showRamadanDashboard"/>
        <SalateTimes v-if="showSalateTimes"/>
    </div>
    <spinner class="flex justify-center h-screen items-center col-span-8" v-if="!data"/>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import TheDay from "@/components/TheDay.vue";
import Spinner from "@/components/partials/SpinnerLoader.vue";
import {useCityStore} from "@/stores/city"
import {useDisplayModeStore, useRamadanModeStore, useSalateTimesStore} from "@/stores/settings"
import RamadanDashboard from "@/components/RamadanDashboard.vue";
import SalateTimes from "@/components/SalateTimes.vue";

const store = useCityStore();
const data = ref(null);
const selectedCityId = ref(store.cityId);
const settingsDisplay = useDisplayModeStore();
const settingsRamadan = useRamadanModeStore();
const settingsSalateTimes = useSalateTimesStore();

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
const showPanel = computed(() => settingsDisplay.displayMode)
const showRamadanDashboard = computed(() => settingsRamadan.showRamadanDashboard)
const showSalateTimes = computed(() => settingsSalateTimes.showSalateTimes)

</script>