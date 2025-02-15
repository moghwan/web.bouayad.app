import { ref } from "vue";
import { defineStore } from "pinia";

export const useNetStatusStore = defineStore("netStatus", () => {

  const status = ref(true);

  function update(newStatus: any) {
    // console.info('old status', status.value);
    // console.info('new status', newStatus);
    status.value = newStatus;
  }

  return { status, update};
});