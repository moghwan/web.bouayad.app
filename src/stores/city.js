import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core"

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});

export const useCityStore = defineStore("selectedCity", () => {
  const cityId = ref(useLocalStorage('count', 1));
  const city = ref({});

  function update(newCity) {
    city.value = newCity;
    cityId.value = newCity.id;
  }

  return { cityId, city, update};
});