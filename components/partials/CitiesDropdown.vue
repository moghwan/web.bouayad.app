<template>
  <div>

    <button id="dropdownSearchButton"
            @click="clicked = !clicked"
            data-dropdown-toggle="dropdownSearch"
            data-dropdown-placement="bottom"
            class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            type="button">
      اختيار المدن
      <IconCaretDown class="w-5 h-5 text-white"/>
    </button>

    <!-- Dropdown menu -->
    <div dir="rtl" id="dropdownSearch" class="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700" v-show="clicked">
      <div class="p-3">
        <label for="input-group-search" class="sr-only">بحث</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3">
            <IconX v-if="cityQuery" @click="cityQuery=''"
                   class="cursor-pointer w-5 h-5 text-gray-500 dark:text-gray-400"/>
          </div>
          <input type="text" v-model="cityQuery" id="input-group-search" placeholder="بحث"
                 class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
        </div>
      </div>
      <ul v-auto-animate class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownSearchButton">
        <li v-for="city in filteredCities" :key="city.id">
          <div class="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <label :for="'checkbox-item-' + city.id"
                   class="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{
                city.name_ar
              }}</label>
            <input @change="refreshSelected(city.id)" :id="'checkbox-item-' + city.id"
                   :disabled="!selectedCities.some(c => c.id === city.id) && disableCheckbox ? disableCheckbox : false"
                   type="checkbox" :checked="selectedCities.some(c => c.id === city.id)"
                   class="js-city-checkbox-item accent-gray-600 w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
          </div>
        </li>
      </ul>
      <span @click="clearSelected"
            class="cursor-pointer flex justify-between p-3 pl-4 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500">
            مسح كل الاختيارات
            <IconZoomCancel/>
          </span>
    </div>

  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useSettingsStore} from "~/stores/settings";
import {IconZoomCancel, IconX, IconCaretDown} from "@tabler/icons-vue";
import {vAutoAnimate} from '@formkit/auto-animate'

const settingsStore = useSettingsStore();

const props = defineProps({
  cities: {required: true},
});

const clicked = ref(false)
const selectedCities = ref(settingsStore.selectedCities);
const cityQuery = ref('');

const clearSelected = () => {
  selectedCities.value.splice(0);
  settingsStore.updateSelectedCities(selectedCities.value);

  const checkboxes = document.querySelectorAll('input.js-city-checkbox-item[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}

const refreshSelected = (cityId) => {
  const selectedCity = props.cities.find(city => city.id === cityId);

  if (selectedCity) {
    const cityIndex = selectedCities.value.findIndex(city => city.id === cityId);

    if (cityIndex !== -1) {
      selectedCities.value.splice(cityIndex, 1);
    } else if (selectedCities.value.length < 8) {
      selectedCities.value.push({id: cityId, name_ar: selectedCity.name_ar, name: selectedCity.name});
    }

    settingsStore.updateSelectedCities(selectedCities.value);
  }
};

const disableCheckbox = computed(() => selectedCities.value.length >= 8)

const filteredCities = computed(() => {
  if (!props.cities) return [];
  return props.cities.filter(city =>
      city.name.toLowerCase().includes(cityQuery.value.toLowerCase()) ||
      city.name_ar.includes(cityQuery.value) ||
      city.id.toString().includes(cityQuery.value)
  );
});
</script>
