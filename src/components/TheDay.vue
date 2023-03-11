<template>
  <div class="flex justify-center h-screen items-center">
    <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center sm:w-96 w-9/12">
      <!--main layout-->
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8 overflow-y-hidden">
            <div class="overflow-hidden" v-auto-animate>
              <!--app name-->
              <div @click="switchPage" class="pb-1 border-b ff-arabic-style text-3xl cursor-pointer">
                اليومية العصرية
              </div>

              <!--back page-->
              <table v-if="showBack" id="day-back" class="h-96 min-w-full w-10">
                <tr class="h-7">
                  <td class="py-2 text-center">
                    <p class="text-lg">مقولة اليوم</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p class="px-5 text-lg font-light leading-7" v-for="hikma in data.events.hikams_back" :key="hikma.key">
                      {{ hikma }}
                    </p>
                  </td>
                </tr>
              </table>

              <!--front page -->
              <table v-if="!showBack" id="day-front" class="text-lg h-96 min-w-full w-10">
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
                  <td colspan="2" class="text-8xl font-light py-2 border-r">
                    {{ data.dates.dateCr.day }}
                  </td>
                  <td colspan="2" class="text-8xl font-light py-2">
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
                <tr class="border-b">
                  <td @click="getByCity(city)"
                      :class="selectedCityId === city.id ? 'bg-gray-50': ''"
                      class="font-light py-2 text-base cursor-pointer hover:bg-gray-100 transition-all"
                      v-for="city in RTLCities.slice(4, 8)" :key="city.id">
                    {{ city.name }}
                  </td>
                </tr>
                <tr class="border-b">
                  <td @click="getByCity(city)"
                      :class="selectedCityId === city.id ? 'bg-gray-100': ''"
                      class="font-light py-2 text-base cursor-pointer hover:bg-gray-50 transition-all"
                      v-for="city in RTLCities.slice(0, 4)" :key="city.id">
                    {{ city.name }}
                  </td>
                </tr>
                <!--section 3: filahi date with salate times-->
                <tr>
                  <salate-element :salate="salateTimesMorning[0]"/>
                  <td colspan="2" class="font-light">
                    {{ data.dates.dateFl.monthName.ar }}
                  </td>
                </tr>
                <tr>
                  <salate-element :salate="salateTimesMorning[1]"/>
                  <td rowspan="5" colspan="2" class="font-light text-8xl">
                    {{ data.dates.dateFl.day }}
                  </td>
                </tr>
                <tr v-for="salate in salateTimes" :key="salate.name">
                  <salate-element :salate="salate"/>
                </tr>
                <!--front hikams-->
                <tr class="border-t">
                  <td colspan="4"
                      class="font-light py-2 text-center"
                      v-auto-animate
                  >
                    <p v-if="(countHikamsFront === 2 && showFirstHikma) || countHikamsFront === 1">{{ firstHikma }}</p>
                    <p v-if="countHikamsFront === 2 && !showFirstHikma">{{ secondHikma }}</p>
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
import SalateElement from "@/components/partials/salateElement.vue";
import { useCityStore } from "@/stores/city"

const store = useCityStore();
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  selectedCityId: { required: true },
});

const { data } = toRefs(props);
const emit = defineEmits(['parent-refreshtheday'])
const currentTime = ref(new Date());
const showBack = ref(false);
const showFirstHikma = ref(true);
const defaultCities = ref([
  {id: 1, name: "الرباط"},
  {id: 99, name: "مكناس"},
  {id: 81, name: "فاس"},
  {id: 31, name: "وجدة"},
  {id: 156, name: "العيون"},
  {id: 117, name: "أغادير"},
  {id: 107, name: "مراكش"},
  {id: 58, name: "البيضاء"},
])

const RTLCities = computed(() => defaultCities.value.slice(0).reverse())

const countHikamsFront = computed(() => data.value.events.hikams_front.length)
const firstHikma = computed(() => data.value.events.hikams_front[0])
const secondHikma = computed(() => data.value.events.hikams_front[1])

const salateTimesMorning = computed(() => {
  let { fajr, chourouq } = data.value.salate_times;

  let salateTimes = [
    { name: "fajr", name_ar: "الفجر", time: fajr },
    { name: "chourouq", name_ar: "الشروق", time: chourouq },
  ];

  return getSalatesWithClasses(salateTimes)
})

const salateTimes = computed(() => {
  let { dhuhr, asr, maghrib, ishae } = data.value.salate_times;

  let salateTimes = [
    { name: "dhuhr", name_ar: "الظهر", time: dhuhr },
    { name: "asr", name_ar: "العصر", time: asr },
    { name: "maghrib", name_ar: "المغرب", time: maghrib },
    { name: "ishae", name_ar: "العشاء", time: ishae },
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

onMounted(() =>{
  setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
  setInterval(() => {
    showFirstHikma.value = !showFirstHikma.value;
  }, 3000)
})

</script>
