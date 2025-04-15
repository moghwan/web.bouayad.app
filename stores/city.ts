import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core"

export const useCityStore = defineStore("selectedCity", () => {
  const cityId = ref(useLocalStorage('cityId', 1));
  const city = ref({});

  function update(newCity: any) {
    city.value = newCity;
    cityId.value = newCity.id;
  }

  return { cityId, city, update};
});