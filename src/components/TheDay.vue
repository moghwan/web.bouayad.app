<template>
  <div class="flex justify-center h-screen items-center">
    <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center w-80">
      <!--main layout-->
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <!--app name-->
              <div @click="switchPage" class="py-3 border-b">
                اليومية العصرية
              </div>

              <!--back page-->
              <table v-if="showBack" id="day-back" class="h-96 min-w-full">
                <tr class="bg-white h-7">
                  <td class="py-2 text-center">
                    <p>مقولة اليوم</p>
                  </td>
                </tr>
                <tr class="bg-white">
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
                <tr class="bg-white">
                  <td colspan="2" class="font-light py-2 border-r">
                    {{ data.dates.dayName.fr }}
                  </td>
                  <td colspan="2" class="font-light py-2">
                    {{ data.dates.dayName.ar }}
                  </td>
                </tr>
                <!--day number row-->
                <tr class="bg-white">
                  <td colspan="2" class="text-7xl font-light py-2 border-r">
                    {{ data.dates.dateCr.day }}
                  </td>
                  <td colspan="2" class="text-7xl font-light py-2">
                    {{ data.dates.dateHj.day }}
                  </td>
                </tr>
                <!--month name-->
                <tr class="bg-white border-b">
                  <td colspan="2" class="font-light py-2 border-r">
                    {{ data.dates.dateCr.monthName.fr }}
                  </td>
                  <td colspan="2" class="font-light py-2">
                    {{ data.dates.dateHj.monthName.fr }}
                  </td>
                </tr>
                <!--section 2: favourites cites-->
                <tr class="bg-white border-b">
                  <td class="font-light py-1 text-sm">
                    وجدة
                  </td>
                  <td class="font-light py-1 text-sm">
                    فاس
                  </td>
                  <td class="font-light py-1 text-sm">
                    مكناس
                  </td>
                  <td class="font-light py-1 text-sm">
                    الرباط
                  </td>
                </tr>
                <tr class="bg-white border-b">
                  <td class="font-light py-1 text-sm">
                    البيضاء
                  </td>
                  <td class="font-light py-1 text-sm">
                    مراكش
                  </td>
                  <td class="font-light py-1 text-sm">
                    أغادير
                  </td>
                  <td class="font-light py-1 text-sm">
                    العيون
                  </td>
                </tr>
                <!--section 3: filahi date with salate times-->
                <tr class="bg-white">
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
                <tr class="bg-white">
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
                <tr class="bg-white">
                  <td class="font-light text-sm">
                    {{ data.salate_times.dhuhr }}
                  </td>
                  <td class="font-light  border-r">
                    الظهر
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="font-light text-sm">
                    {{ data.salate_times.asr }}
                  </td>
                  <td class="font-light  border-r">
                    العصر
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="font-light text-sm">
                    {{ data.salate_times.maghrib }}
                  </td>
                  <td class="font-light  border-r">
                    المغرب
                  </td>
                </tr>
                <tr class="bg-white border-b">
                  <td class="font-light text-sm">
                    {{ data.salate_times.ishae }}
                  </td>
                  <td class="font-light  border-r">
                    العشاء
                  </td>
                </tr>
                <!--front hikams-->
                <tr class="bg-white">
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
import {ref} from "vue";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const showBack = ref(false);

const switchPage = () => {
  showBack.value = !showBack.value
}
</script>
