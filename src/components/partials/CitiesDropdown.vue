<template>
  <div dir="rtl">

      <button id="dropdownSearchButton" @click="clicked = !clicked" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" type="button">Dropdown search <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>

      <!-- Dropdown menu -->
      <div id="dropdownSearch" class="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700" v-show="clicked">
          <div class="p-3">
              <label for="input-group-search" class="sr-only">Search</label>
              <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                  </div>
                  <input type="text" id="input-group-search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Search city">
              </div>
          </div>
          <ul class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
              <li v-for="city in props.cities" :key="city.id">
                  <div class="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <label :for="'checkbox-item-' + city.id" class="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{ city.name_ar }}</label>
                      <input @change="refreshSelected(city.id)" :id="'checkbox-item-' + city.id" :disabled="!selectedCities.includes(city.id) && disableCheckbox ? disableCheckbox : false" type="checkbox" value="" class="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                  </div>
              </li>
          </ul>
          <a href="#" class="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline">
              <svg class="w-5 h-5 mr-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z"></path></svg>
              Reset selection
          </a>
      </div>

  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";

const props = defineProps({
  cities: { required: true },
});

const clicked = ref(false)
const selectedCities = ref([]);

const refreshSelected = (cityId) => {
  selectedCities.value.includes(cityId) 
    ? selectedCities.value.splice(selectedCities.value.indexOf(cityId), 1) 
    : selectedCities.value.length < 8 
        ? selectedCities.value.push(cityId) 
        : null
}

const disableCheckbox = computed(() => selectedCities.value.length >= 8)

</script>
