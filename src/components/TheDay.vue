<template>
  <div class="flex justify-center h-screen items-center">
    <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center w-80">
      <!--main layout-->
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <!--app name-->
              <div @click="switchPage" class="pb-1 border-b ff-arabic-style text-3xl">
                اليومية العصرية
              </div>

              <!--back page-->
              <table v-if="showBack" id="day-back" class="h-96 min-w-full">
                <tr class=" h-7">
                  <td class="py-2 text-center">
                    <p>مقولة اليوم</p>
                  </td>
                </tr>
                <tr class="">
                  <td>
                    <p class="px-5 font-light leading-7" v-for="hikma in data.events.hikams_back" :key="hikma.key">{{ hikma }}</p>
                  </td>
                </tr>
              </table>

              <!--front page -->
              <table v-if="!showBack" id="day-front" class="h-96 min-w-full">
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
                <tr class="">
                  <td colspan="2" class="font-light py-2 border-r">
                    {{ data.dates.dayName.fr }}
                  </td>
                  <td colspan="2" class="font-light py-2">
                    {{ data.dates.dayName.ar }}
                  </td>
                </tr>
                <!--day number row-->
                <tr class="">
                  <td colspan="2" class="text-7xl font-light py-2 border-r">
                    {{ data.dates.dateCr.day }}
                  </td>
                  <td colspan="2" class="text-7xl font-light py-2">
                    {{ data.dates.dateHj.day }}
                  </td>
                </tr>
                <!--month name-->
                <tr class=" border-b">
                  <td colspan="2" class="font-light py-2 border-r">
                    {{ data.dates.dateCr.monthName.fr }}
                  </td>
                  <td colspan="2" class="font-light py-2">
                    {{ data.dates.dateHj.monthName.fr }}
                  </td>
                </tr>
                <!--section 2: cites-->
                <tr class=" border-b">
                  <td @click="getByCities(city.id)" class="font-light py-2 text-sm" v-for="city in RTLCities.slice(4, 8)" :key="city.id">
                    {{ city.name }}
                  </td>
                </tr>
                <tr class=" border-b">
                  <td @click="getByCities(city.id)" class="font-light py-2 text-sm" v-for="city in RTLCities.slice(0, 4)" :key="city.id">
                    {{ city.name }}
                  </td>
                </tr>
                <!--section 3: filahi date with salate times-->
                <tr class="">
                  <td class="font-light text-sm">
                    {{ data.salate_times.fajr }}
                  </td>
                  <td class="font-light  border-r">
                    الفجر
                  </td>
                  <td colspan="2" class="font-light">
                    {{ data.dates.dateFl.monthName.ar }}
                  </td>
                </tr>
                <tr class="">
                  <td class="font-light text-sm">
                    {{ data.salate_times.chourouq }}
                  </td>
                  <td class="font-light  border-r">
                    الشروق
                  </td>
                  <td rowspan="5" colspan="2" class="font-light text-7xl">
                    {{ data.dates.dateFl.day }}
                  </td>
                </tr>
                <tr class="">
                  <td class="font-light text-sm">
                    {{ data.salate_times.dhuhr }}
                  </td>
                  <td class="font-light  border-r">
                    الظهر
                  </td>
                </tr>
                <tr class="">
                  <td class="font-light text-sm">
                    {{ data.salate_times.asr }}
                  </td>
                  <td class="font-light  border-r">
                    العصر
                  </td>
                </tr>
                <tr class="">
                  <td class="font-light text-sm">
                    {{ data.salate_times.maghrib }}
                  </td>
                  <td class="font-light  border-r">
                    المغرب
                  </td>
                </tr>
                <tr class=" border-b">
                  <td class="font-light text-sm">
                    {{ data.salate_times.ishae }}
                  </td>
                  <td class="font-light  border-r">
                    العشاء
                  </td>
                </tr>
                <!--front hikams-->
                <tr class="">
                  <td colspan="4"
                      class="font-light py-2 text-center">
                    <p v-for="hikma in data.events.hikams_front" :key="hikma.key">{{ hikma }}</p>
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
import { ref, computed } from "vue";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const showBack = ref(false);
const cities = ref([
  { id: 1, name: "الرباط"},
  { id: 99, name: "مكناس"},
  { id: 81, name: "فاس"},
  { id: 31, name: "وجدة"},
  { id: 156, name: "العيون"},
  { id: 117, name: "أغادير"},
  { id: 107, name: "مراكش"},
  { id: 58, name: "البيضاء"},
])

const RTLCities = computed(() => {
  return cities.value.slice(0).reverse()
})

const switchPage = () => {
  showBack.value = !showBack.value
}

const getByCities = (cityId) => {
  console.info(cityId)
}


</script>
