<template>
    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <div class="flex space-x-1 rounded-lg bg-slate-100 p-0.5" role="tablist" aria-orientation="horizontal">
            <button class="flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3" id="headlessui-tabs-tab-2" role="tab" type="button" aria-selected="true" tabindex="0" data-headlessui-state="selected" aria-controls="headlessui-tabs-panel-4">
                <IconMoonFilled color="gray" />
                <span class="sr-only lg:not-sr-only lg:ml-2 text-slate-900">رمضان</span>
            </button>
            <button class="flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3 bg-white shadow" id="headlessui-tabs-tab-2" role="tab" type="button" aria-selected="true" tabindex="0" data-headlessui-state="selected" aria-controls="headlessui-tabs-panel-4">
                <IconClock2 color="gray" />
                <span class="sr-only lg:not-sr-only lg:ml-2 text-slate-900">مواقيت الصلوات</span>
            </button>
            <button class="flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3" id="headlessui-tabs-tab-2" role="tab" type="button" aria-selected="true" tabindex="0" data-headlessui-state="selected" aria-controls="headlessui-tabs-panel-4">
                <IconSettings color="gray" />
                <span class="sr-only lg:not-sr-only lg:ml-2 text-slate-900">الإعدادات</span>
            </button>
        </div>

    </nav>
</template>

<script setup>
import { IconDimensions, IconMoonFilled, IconClock2, IconSettings } from '@tabler/icons-vue';
</script>

<style scoped>

</style>