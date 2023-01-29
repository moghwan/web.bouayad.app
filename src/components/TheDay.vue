<template>
  <div class="flex justify-center h-screen items-center">
    <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center">
      <!--main layout-->
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <!--app name-->
              <div class="py-3 border-b">
                اليومية العصرية
              </div>

              <!--front page -->
              <table id="day-front" class="min-w-full text-center">
                <!--section 1: hijri/gregorian dates in fr/ar-->
                <tr class="border-b">
                  <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap border-r">
                    {{ data.dates.dateCr.year }}
                    {{ data.dates.dateCr.monthName.ar }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                    {{ data.dates.dateHj.year }}
                    {{ data.dates.dateHj.monthName.ar }}
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap border-r">
                    {{ data.dates.dayName.fr }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                    {{ data.dates.dayName.ar }}
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap border-r">
                    {{ data.dates.dateCr.day }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                    {{ data.dates.dateHj.day }}
                  </td>
                </tr>
                <tr class="bg-white border-b">
                  <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap border-r">
                    {{ data.dates.dateCr.monthName.fr }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                    {{ data.dates.dateHj.monthName.fr }}
                  </td>
                </tr>
                <!--section 2: favourites cites-->
                <tr class="bg-white border-b">
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    Jacob
                  </td>
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    Thornton
                  </td>
                </tr>
                <tr class="bg-white border-b">
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    Jacob
                  </td>
                  <td class="text-sm text-gray-900 font-light py-2 whitespace-nowrap">
                    Thornton
                  </td>
                </tr>
                <!--section 3: filahi date with salate times-->
                <tr class="bg-white">
                  <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap border-r">
                    {{ data.salate_times.fajr }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap border-b">
                    {{ data.dates.dateFl.monthName.ar }}
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap border-r">
                    {{ data.salate_times.chourouq }}
                  </td>
                  <td rowspan="5" class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                    {{ data.dates.dateFl.day }}
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap border-r">
                    {{ data.salate_times.dhuhr }}
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap border-r">
                    {{ data.salate_times.asr }}
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap border-r">
                    {{ data.salate_times.maghrib }}
                  </td>
                </tr>
                <tr class="bg-white border-b">
                  <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap border-r">
                    {{ data.salate_times.ishae }}
                  </td>
                </tr>
                <!--front hikams-->
                <tr class="bg-white">
                  <td colspan="2"
                      class="text-sm text-gray-900 font-light px-6 py-2 text-center">
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

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
