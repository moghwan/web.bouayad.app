<template>
  <div class="flex justify-center h-screen items-center">
    <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center w-1/2">
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
              <table v-if="showBack" id="day-back" class="min-w-full text-center">
                <tr class="bg-white border-b">
                  <td colspan="2"
                      class="font-light py-2 text-center text-gray-900 text-base mb-4">
                    <p class="font-medium">مقولة اليوم</p>
                    <p v-for="hikma in data.events.hikams_back" :key="hikma.key">{{ hikma }}</p>
                  </td>
                </tr>
              </table>

              <!--front page -->
              <table v-if="!showBack" id="day-front" class="min-w-full text-center">
                <!--section 1: hijri/gregorian dates in fr/ar-->
                <tr class="border-b">
                  <td colspan="2" class="text-sm text-gray-900 font-light py-2 whitespace-nowrap border-r">
                    {{ data.dates.dateCr.year }}
                    {{ data.dates.dateCr.monthName.ar }}
                  </td>
                  <td colspan="2" class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    {{ data.dates.dateHj.year }}
                    {{ data.dates.dateHj.monthName.ar }}
                  </td>
                </tr>
                <tr class="bg-white">
                  <td colspan="2" class="text-sm text-gray-900 font-light py-2 whitespace-nowrap border-r">
                    {{ data.dates.dayName.fr }}
                  </td>
                  <td colspan="2" class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    {{ data.dates.dayName.ar }}
                  </td>
                </tr>
                <tr class="bg-white">
                  <td colspan="2" class="text-sm text-gray-900 font-light py-2 whitespace-nowrap border-r">
                    {{ data.dates.dateCr.day }}
                  </td>
                  <td colspan="2" class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    {{ data.dates.dateHj.day }}
                  </td>
                </tr>
                <tr class="bg-white border-b">
                  <td colspan="2" class="text-sm text-gray-900 font-light py-2 whitespace-nowrap border-r">
                    {{ data.dates.dateCr.monthName.fr }}
                  </td>
                  <td colspan="2" class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    {{ data.dates.dateHj.monthName.fr }}
                  </td>
                </tr>
                <!--section 2: favourites cites-->
                <tr class="bg-white border-b">
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    وجدة
                  </td>
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    فاس
                  </td>
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    مكناس
                  </td>
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    الرباط
                  </td>
                </tr>
                <tr class="bg-white border-b">
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    البيضاء
                  </td>
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    مراكش
                  </td>
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    أغادير
                  </td>
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    العيون
                  </td>
                </tr>
                <!--section 3: filahi date with salate times-->
                <tr class="bg-white">
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    {{ data.salate_times.fajr }}
                  </td>
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap border-r">
                    الفجر
                  </td>
                  <td colspan="2" class="text-sm text-gray-900 font-light py-2 whitespace-nowrap border-b">
                    {{ data.dates.dateFl.monthName.ar }}
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    {{ data.salate_times.chourouq }}
                  </td>
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap border-r">
                   الشروق
                  </td>
                  <td rowspan="5" colspan="2" class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    {{ data.dates.dateFl.day }}
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    {{ data.salate_times.dhuhr }}
                  </td>
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap border-r">
                     الظهر
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    {{ data.salate_times.asr }}
                  </td>
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap border-r">
                    العصر
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    {{ data.salate_times.maghrib }}
                  </td>
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap border-r">
                    المغرب
                  </td>
                </tr>
                <tr class="bg-white border-b">
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    {{ data.salate_times.ishae }} 
                  </td>
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap border-r">
                    العشاء
                  </td>
                </tr>
                <!--front hikams-->
                <tr class="bg-white">
                  <td colspan="4"
                      class="text-sm text-gray-900 font-light py-2 text-center">
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
