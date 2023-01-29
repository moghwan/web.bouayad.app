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
