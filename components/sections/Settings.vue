<template>
  <div class="p-5 bg-gray-100 flex flex-col">
      <div class="flex flex-row justify-center p-5 pt-0">
          الإعدادات
      </div>
      <div class="flex flex-col bg-white h-full rounded-lg p-12">
        <div class="flex flex-row align-middle justify-between">
          <CitiesDropdown :cities="cities"/>
          <span>إختر المدن المفضلة لديك (في حدود 8 مدن)</span>
        </div>
      </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import CitiesDropdown from "~/components/partials/CitiesDropdown.vue";
const cities = ref(null);
const error = ref(null);
const isFetching = ref(null);

onMounted(() => fetchData())

async function fetchData() {
  const response = await useFetch(`/api/cities`);

  ({
    cities: cities.value,
    error: error.value,
    isFetching: isFetching.value,
  } = await response);
}
</script>
