<template>
  <div class="flex justify-center h-screen items-center">
    <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center" :class="!isTooSmall ? 'w-96' : 'w-80'">
      <!--main layout-->
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full sm:px-6 lg:px-8 overflow-y-hidden" :class="!isTooSmall ? 'pt-2' : 'py-2'">
            <div class="overflow-hidden" v-auto-animate>
              <!--app name-->
              <div @click="switchPage" class="pb-1 border-b ff-arabic-style text-3xl cursor-pointer">
                اليومية العصرية
              </div>

              <!--back page-->
              <table v-if="showBack" id="day-back" class="h-96 min-w-full">
                <tr class="h-7">
                  <td class="py-2 text-center">
                    <p :class="!isTooSmall ? 'text-lg' : null">مقولة اليوم</p>
                  </td>
                </tr>
                <tr>
                  <td v-auto-animate>
                    <p class="px-5 font-light leading-7"
                       :class="!isTooSmall ? 'text-lg' : null"
                       v-if="(countHikamsBack === 2 && showFirstHikma) || countHikamsBack === 1">{{ firstHikmaB }}</p>
                    <p class="px-5 font-light leading-7"
                       :class="!isTooSmall ? 'text-lg' : null"
                       v-if="countHikamsBack === 2 && !showFirstHikma">{{ secondHikmaB }}</p>
                  </td>
                </tr>
              </table>

              <!--front page -->
              <table v-if="!showBack" id="day-front" class="h-96 min-w-full" :class="!isTooSmall ? 'text-lg' : null">
                <!--section 1: hijri/gregorian dates in fr/ar-->
                <!--month/year row-->
                <tr class="border-b">
                  <td colspan="2" class="font-light py-2 border-r">
                    {{ data.dates.dateCr.year }}
                    {{ data.dates.dateCr.monthName.ar }}
                  </td>
                  <td colspan="2" class="font-light py-2">
                    {{ data.dates.dateHj.year }}
                    {{ data.dates.dateHj.monthName.ar }}
                  </td>
                </tr>
                <!--day name row-->
                <tr>
                  <td colspan="2" class="font-light py-2 border-r">
                    {{ data.dates.dayName.fr }}
                  </td>
                  <td colspan="2" class="font-light py-2">
                    {{ data.dates.dayName.ar }}
                  </td>
                </tr>
                <!--day number row-->
                <tr>
                  <td colspan="2" :class="!isTooSmall ? 'text-8xl' : 'text-7xl'" class="font-light py-2 border-r">
                    {{ data.dates.dateCr.day }}
                  </td>
                  <td colspan="2" :class="!isTooSmall ? 'text-8xl' : 'text-7xl'" class="font-light py-2">
                    {{ data.dates.dateHj.day }}
                  </td>
                </tr>
                <!--month name-->
                <tr class="border-b">
                  <td colspan="2" class="font-light py-2 border-r">
                    {{ data.dates.dateCr.monthName.fr }}
                  </td>
                  <td colspan="2" class="font-light py-2">
                    {{ data.dates.dateHj.monthName.fr }}
                  </td>
                </tr>
                <!--section 2: cites-->
                <tr class="border-b" v-auto-animate>
                  <td @click="getByCity(city)"
                      :class="[
                        !isTooSmall ? 'text-base' : 'text-sm', 
                        selectedCityId === city.id ? 'font-semibold bg-gray-50 dark:bg-gray-800': ''
                      ]"
                      class="font-light py-2 cursor-pointer hover:bg-gray-100 transition-all"
                      v-for="city in RTLCities.slice(4, 8)" :key="city.id">
                    {{ city.name_ar }}
                  </td>
                </tr>
                <tr class="border-b" v-auto-animate>
                  <td @click="getByCity(city)"
                      :class="[
                        !isTooSmall ? 'text-base' : 'text-sm', 
                        selectedCityId === city.id ? 'font-semibold bg-gray-50 dark:bg-gray-800': ''
                      ]"
                      class="font-light py-2 cursor-pointer hover:bg-gray-100 transition-all"
                      v-for="city in RTLCities.slice(0, 4)" :key="city.id">
                    {{ city.name_ar }}
                  </td>
                </tr>
                <!--section 3: filahi date with salate times-->
                <tr :class="!isTooSmall ? 'text-lg' : null">
                  <salate-element :salate="salateTimesMorning[0]"/>
                  <td colspan="2" class="font-light">
                    {{ data.dates.dateFl.monthName.ar }}
                  </td>
                </tr>
                <tr :class="!isTooSmall ? 'text-lg' : null">
                  <salate-element :salate="salateTimesMorning[1]"/>
                  <td rowspan="5" colspan="2" class="font-light" :class="!isTooSmall ? 'text-8xl' : 'text-7xl'">
                    {{ data.dates.dateFl.day }}
                  </td>
                </tr>
                <tr :class="!isTooSmall ? 'text-lg' : null" v-for="salate in salateTimes" :key="salate.name">
                  <salate-element :salate="salate"/>
                </tr>
                <!--front hikams-->
                <tr class="border-t">
                  <td colspan="4"
                      class="font-light py-2 text-center"
                      v-auto-animate
                  >
                    <p v-if="(countHikamsFront === 2 && showFirstHikma) || countHikamsFront === 1">{{ firstHikmaF }}</p>
                    <p v-if="countHikamsFront === 2 && !showFirstHikma">{{ secondHikmaF }}</p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, toRefs, onMounted} from "vue";
import {useCityStore} from "~/stores/city"
import {useSettingsStore} from "~/stores/settings";
import {vAutoAnimate} from '@formkit/auto-animate';
import {HIKAM_ROTATION_INTERVAL, SCREEN_BREAKPOINTS} from '~/constants';

const settingsStore = useSettingsStore();
const store = useCityStore();
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  selectedCityId: {required: true},
});

// const data = toRefs(props.data);
const {data} = toRefs(props);
// const data = ref(props.data);

const windowWidth = ref(window.innerWidth)
const emit = defineEmits(['parent-refreshtheday'])
const currentTime = ref(new Date());
const showBack = ref(false);
const showFirstHikma = ref(true);
const defaultCities = ref([
  {id: 1, name_ar: "الرباط"},
  {id: 99, name_ar: "مكناس"},
  {id: 81, name_ar: "فاس"},
  {id: 31, name_ar: "وجدة"},
  {id: 156, name_ar: "العيون"},
  {id: 117, name_ar: "أغادير"},
  {id: 107, name_ar: "مراكش"},
  {id: 58, name_ar: "البيضاء"},
])
const selectedCities = ref(settingsStore.selectedCities)

const RTLCities = computed(() => {
  return selectedCities.value.length > 0
      ? selectedCities.value.slice(0).reverse()
      : defaultCities.value.slice(0).reverse()
})
const countHikamsFront = computed(() => data.value.events.hikams_front.length)
const firstHikmaF = computed(() => data.value.events.hikams_front[0])
const secondHikmaF = computed(() => data.value.events.hikams_front[1])

const countHikamsBack = computed(() => data.value.events.hikams_back.length)
const firstHikmaB = computed(() => data.value.events.hikams_back[0])
const secondHikmaB = computed(() => data.value.events.hikams_back[1])

const salateTimesMorning = computed(() => {
  let {fajr, chourouq} = data.value.salate_times;

  let salateTimes = [
    {name: "fajr", name_ar: "الفجر", time: fajr},
    {name: "chourouq", name_ar: "الشروق", time: chourouq},
  ];

  return getSalatesWithClasses(salateTimes)
})

const salateTimes = computed(() => {
  let {dhuhr, asr, maghrib, ishae} = data.value.salate_times;

  let salateTimes = [
    {name: "dhuhr", name_ar: "الظهر", time: dhuhr},
    {name: "asr", name_ar: "العصر", time: asr},
    {name: "maghrib", name_ar: "المغرب", time: maghrib},
    {name: "ishae", name_ar: "العشاء", time: ishae},
  ];

  return getSalatesWithClasses(salateTimes)
})

const switchPage = () => showBack.value = !showBack.value;

const getByCity = (city) => {
  store.update(city)
  emit('parent-refreshtheday', city.id)
}

const getSalatesWithClasses = (salawates) => {
  for (let i = 0; i < salawates.length; i++) {
    let salate = salawates[i];
    let [hours, minutes] = salate.time.split(":").map(Number);

    let comparisonTime = new Date();
    comparisonTime.setHours(hours, minutes);

    const comparisonTime1hB = new Date();
    comparisonTime1hB.setHours(hours - 1, minutes);

    const comparisonTime20mnA = new Date();
    comparisonTime20mnA.setHours(hours, minutes + 20);

    if (
        currentTime.value.getTime() >= comparisonTime.getTime() &&
        currentTime.value.getTime() < comparisonTime20mnA.getTime()
    ) {
      salate.result = "current";
      salate.class = "bg-red-50 text-red-900"
    } else if (currentTime.value.getTime() > comparisonTime.getTime()) {
      salate.result = "passed";
      salate.class = "bg-gray-50 text-gray-600";
    } else if (currentTime.value.getTime() < comparisonTime.getTime() && comparisonTime1hB < currentTime.value.getTime()) {
      salate.result = "next";
      salate.class = "bg-gray-200";
    } else if (currentTime.value.getTime() < comparisonTime.getTime()) {
      salate.result = "later";
      salate.class = "text-gray-500";
    } else {
      salate.result = "default";
    }

    salawates[i] = salate;
  }

  return salawates;
}

const onResize = () => {
  windowWidth.value = window.innerWidth
}
const isTooSmall = computed(() => windowWidth.value <= SCREEN_BREAKPOINTS.SMALL)

onMounted(() => {
  window.addEventListener('resize', onResize);

  setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
  if (countHikamsFront.value > 1) {
    setInterval(() => {
      showFirstHikma.value = !showFirstHikma.value;
    }, HIKAM_ROTATION_INTERVAL)
  }
})

</script>
