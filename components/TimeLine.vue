<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Icon } from '@iconify/vue';
import parcourData from "../data/Parcours.json";

const iconMap: Record<string, string> = {
    "i-material-symbols-work": "material-symbols:work",
    "i-material-symbols-school": "material-symbols:school",
    "i-tdesign-html5-filled": "tdesign:html5-filled",
    "i-teenyicons-react-solid": "teenyicons:react-solid",
    "i-fa6-solid-school": "fa6-solid:school"
};

const items = parcourData.map((item: any) => ({
    ...item,
    icon: iconMap[item.icon] || item.icon
}));

const progress = ref(0);
const maxStep = items.length - 1;

onMounted(() => {
    let value = 0;
    const stepSize = 0.01;
    const interval = setInterval(() => {
        if (value < maxStep) {
            value += stepSize;
            progress.value = Math.min(value, maxStep);
        } else {
            clearInterval(interval);
        }
    }, 5);
});
</script>

<template>
    <div class="mb-4 flex flex-col items-center">
        <h1 class="text-2xl font-bold text-center mb-6">
            Mon Parcours et mes expériences
        </h1>
        <div class="relative w-full max-w-3xl px-4" style="height: 80px;">
            <div class="absolute top-1/2 left-0 w-full h-2 bg-gray-200 rounded -translate-y-1/2"></div>
            <div
                class="absolute top-1/2 left-0 h-2 bg-secondary rounded -translate-y-1/2 transition-all"
                :style="{ width: ((progress / maxStep) * 100) + '%' }"
            ></div>
            <!-- Points sur la ligne -->
            <div class="absolute left-0 top-1/2 w-full flex justify-between items-center -translate-y-1/2 z-10">
                <template v-for="(item, idx) in items" :key="idx">
                    <div class="flex flex-col items-center" style="width: 40px;">
                        <div
                            class="w-10 h-10 rounded-full flex items-center justify-center shadow transition-colors duration-300"
                            :class="(progress >= idx && idx !== maxStep) ? 'bg-secondary text-white' : 'bg-gray-300 text-gray-500'"
                        >
                            <Icon :icon="item.icon" width="28" height="28" />
                        </div>
                    </div>
                </template>
            </div>
            <div class="absolute left-0 top-full w-full flex justify-between items-center mt-2 z-10">
                <template v-for="(item, idx) in items" :key="'label-' + idx">
                    <div class="flex flex-col items-center w-40">
                        <div class="text-sm text-center font-semibold text-white break-words">
                            {{ item.title }}
                        </div>
                        <div class="text-xs text-gray-400 mt-1">{{ item.date }}</div>
                    </div>
                </template>
            </div>
        </div>
        <div class="mt-24 max-w-lg text-center text-gray-200 text-base px-2">
            {{ items[Math.round(progress)]?.description }}
        </div>
    </div>
</template>
