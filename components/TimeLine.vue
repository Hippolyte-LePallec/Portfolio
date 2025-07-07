<script setup lang="ts">
import parcourData from "../data/parcours.json";

const items = parcourData.map((item: any) => ({
    title: item.title,
    description: item.description,
    date: item.date,
    icon: item.icon,
}));
</script>

<template>
    <div class="mb-4 flex flex-col items-center">
        <h1 class="text-2xl font-bold text-center mb-6">
            Mon Parcours et mes expériences
        </h1>
        <UTimeline
            :items="items"
            :ui="{
                item: 'even:flex-row-reverse even:-translate-x-[calc(100%-2rem)] even:text-right',
                description: 'break-words max-w-[400px] mx-auto text-left',
            }"
            :default-value="3"
            class="translate-x-[calc(50%-1rem)]"
            color="secondary"
        />
    </div>
</template>
