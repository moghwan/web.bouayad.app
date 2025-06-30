<template>
  <div v-auto-animate="{ duration: 400 }" class="gap-0">
    <TheDay v-if="data" :key="selectedCityId" :data="data" @parent-refreshtheday="refreshTheDay"
            :selectedCityId="selectedCityId" :class="!showPanel || isTooSmall ? '' : 'hidden xl:flex'"
            class=" lg:m-10"/>
    <div class="w-full 2xl:w-7/12 h-screen lg:h-5/6 flex flex-col items-center rounded-lg shadow-lg bg-white lg:m-10"
         v-if="data && showPanel && !isTooSmall">
      <SalateTimes class="flex w-full h-5/6" v-if="showSalateTimes"/>
      <Settings class="flex w-full h-5/6" v-if="showSettings"/>
      <SectionsNav class="mt-10"/>
    </div>

    <button @click="settingsStore.switchDisplayMode()" :class="isTooSmall ? 'hidden' : null"
            class="fixed bottom-10 right-8 bg-gray-50 w-12 h-12 rounded-full drop-shadow-lg flex justify-center items-center hover:drop-shadow-xl">
      <IconLayoutCards color="gray"/>
    </button>
    <SpinnerLoader class="flex justify-center h-screen items-center" v-if="!data && netStatus"/>
    <ExclamationIcon class="flex justify-center h-screen items-center" v-if="!netStatus && !data"/>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useCityStore} from "~/stores/city"
import {useSettingsStore} from "~/stores/settings"
import {useApi} from "~/composables/useApi";
import {IconLayoutCards} from '@tabler/icons-vue';
import {vAutoAnimate} from '@formkit/auto-animate'
import {useNetStatusStore} from '@/stores/netStatus';
import {SCREEN_BREAKPOINTS} from '~/constants';

const store = useCityStore();
const selectedCityId = ref(store.cityId);
const settingsStore = useSettingsStore();
const windowWidth = ref(window?.innerWidth)
const netStatusStore = useNetStatusStore();

// Use the API composable to fetch hikams data
const { 
  data, 
  error, 
  isLoading, 
  refresh: refreshData 
} = useApi(
  computed(() => `/api/hikams/${selectedCityId.value}`),
  {
    immediate: true,
    watch: true,
    transform: (data) => data
  }
);

onMounted(() => {
  window.addEventListener('resize', onResize)
})

// Watch for changes in the network status
watch(() => netStatusStore.status, (newStatus) => {
  if (newStatus) {
    // Force refresh when network comes back online
    refreshData({ force: true });
  }
});

const onResize = () => windowWidth.value = window.innerWidth
const isTooSmall = computed(() => windowWidth.value <= SCREEN_BREAKPOINTS.SMALL)

const refreshTheDay = async (cityId) => {
  if (cityId) {
    selectedCityId.value = cityId;
  }
  // Force refresh when manually triggered
  await refreshData({ force: true });
};

const showPanel = computed(() => settingsStore.displayMode)
const showSalateTimes = computed(() => settingsStore.showSalateTimes)
const showSettings = computed(() => settingsStore.showSettings)
const netStatus = computed(() => netStatusStore.status)
</script>
