<script setup lang="ts">
import type { Project } from "../types/project";

defineProps<{
    project: Project;
}>();
</script>

<template>
    <div
        class="group relative flex flex-col h-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)] overflow-hidden"
    >
        <div class="relative h-52 overflow-hidden">
            <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
                class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"
            ></div>
        </div>

        <div class="p-6 flex flex-col flex-grow">
            <h3
                class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 mb-2"
            >
                {{ project.title }}
            </h3>

            <p class="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                {{ project.description }}
            </p>

            <div class="mt-auto space-y-5">
                <div class="flex flex-wrap gap-2">
                    <span
                        v-for="tag in project.tags"
                        :key="tag"
                        class="px-3 py-1 text-[10px] uppercase tracking-wider font-bold bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20"
                    >
                        {{ tag }}
                    </span>
                </div>

                <NuxtLink
                    :to="project.link"
                    target="_blank"
                    class="flex items-center justify-center gap-2 w-full py-3 bg-white text-gray-900 hover:bg-blue-500 hover:text-white font-bold rounded-xl transition-all duration-300 transform active:scale-95"
                >
                    <span>Découvrir</span>
                    <UIcon
                        name="i-heroicons-arrow-right-20-solid"
                        class="w-4 h-4"
                    />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Animation subtile pour l'apparition */
.group {
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
