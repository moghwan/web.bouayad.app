<template>
  <div>
    <div class="w-full overflow-x-auto">
      <table class="w-full whitespace-no-wrap">
        <thead class="sticky top-0 bg-gray-100">
        <tr class="border-b border-gray-200 hover:bg-gray-100">
          <th class="font-light px-4 py-3 text-center" colspan="9">مواقيت الصلوات</th>
        </tr>
        <tr class="text-center">
          <th class="font-light xl:px-7 md:px-6 py-3">العشاء</th>
          <th class="font-light xl:px-7 md:px-6 py-3">المغرب</th>
          <th class="font-light xl:px-7 md:px-6 py-3">العصر</th>
          <th class="font-light xl:px-7 md:px-6 py-3">الظهر</th>
          <th class="font-light xl:px-7 md:px-6 py-3">الشروق</th>
          <th class="font-light xl:px-7 md:px-6 py-3">الصبح</th>
          <th class="font-light xl:px-7 md:px-6 py-3">{{ salawates ? salawates[0].monthName : null }}</th>
          <th class="font-light xl:px-7 md:px-6 py-3">{{ salawates ? salawates[0].monthNameHij : null }}</th>
          <th class="font-light xl:px-7 md:px-6 py-3">الأيام</th>
        </tr>
        </thead>
        <tbody>
        <tr :key="salawate.key" v-for="salawate in salawates"
            v-memo="[salawate.day, salawate.month, isToday(salawate)]"
            class="text-center text-gray-700 border-b border-gray-200 hover:bg-gray-100"
            :class="isToday(salawate) ? 'bg-gray-100 text-black' : null">
          <td class="md:py-2 py-1">{{ salawate.ishae }}</td>
          <td class="md:py-2 py-1">{{ salawate.maghrib }}</td>
          <td class="md:py-2 py-1">{{ salawate.asr }}</td>
          <td class="md:py-2 py-1">{{ salawate.dhuhr }}</td>
          <td class="md:py-2 py-1">{{ salawate.chourouq }}</td>
          <td class="md:py-2 py-1">{{ salawate.fajr }}</td>
          <td class="md:py-2 py-1 font-bold">{{ salawate.day === 1 ? salawate.monthName : salawate.day }}</td>
          <td class="md:py-2 py-1 font-bold">{{ salawate.dayHij }}</td>
          <td class="md:py-2 py-1 bg-gray-100">{{ salawate.dayNameHij }}</td>
        </tr>
        <!-- More rows here -->
        </tbody>
      </table>
    </div>
  </div>

</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useCityStore } from "~/stores/city";
import { useApi } from "~/composables/useApi";

const store = useCityStore();
const selectedCityId = ref(store.cityId);

// Use the API composable to fetch prayer times
const { data: apiData, error, isLoading } = useApi(
  computed(() => `/api/salates/calendar/${selectedCityId.value}`),
  {
    immediate: true,
    watch: true,
    transform: (data) => data
  }
);

// Extract salawates from the API response
const salawates = computed(() => apiData.value?.data || null);

// Watch for changes in the selected city ID
watch(() => store.cityId, (newCityId) => {
  selectedCityId.value = newCityId;
});

const isToday = (salawate) => {
  let today = new Date()
  return today.getDate() === salawate.day && today.getMonth() + 1 === salawate.month
}
</script>
