<script setup lang="ts">
import { ref } from "vue";
import type { Project } from "../types/project";
import projectsData from "../data/projects.json";

const projects = ref<Project[]>([]);

if (Array.isArray(projectsData)) {
    projects.value = projectsData.map((project: any) => ({
        title: project.title,
        image: project.image,
        description: project.description,
        link: project.link,
        tags: project.tags,
        technologies: project.technologies,
    }));
} else {
    console.error(
        "Les données des projets ne sont pas un tableau:",
        projectsData
    );
}
</script>

<template>
    <div class="mt-12 w-full max-w-7xl">
        <div v-if="projects.length > 0">
            <UCarousel
                v-slot="{ item }"
                loop
                dots
                :auto-scroll="{ speed: 1, stopOnInteraction: false }"
                :items="projects"
                :ui="{
                    item: 'basis-full md:basis-1/2 lg:basis-1/3',
                    container: 'gap-6',
                }"
                class="carousel-wrapper"
            >
                <ProjectCard :project="item" />
            </UCarousel>
        </div>
        <div v-else class="text-center py-16">
            <div
                class="bg-slate-800/30 border border-slate-700 rounded-lg p-8 backdrop-blur-sm"
            >
                <UIcon
                    name="i-heroicons-inbox"
                    class="w-16 h-16 text-slate-500 mx-auto mb-4"
                />
                <p class="text-slate-400 text-lg">Aucun projet à afficher</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.carousel-wrapper {
    position: relative;
}

.carousel-wrapper :deep(.carousel-dots) {
    margin-top: 2rem;
}

.carousel-wrapper :deep(.carousel-dot) {
    background-color: #475569;
    transition: all 0.3s ease;
}

.carousel-wrapper :deep(.carousel-dot.active) {
    background-color: #22d3ee;
    box-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
}

.carousel-wrapper :deep(.carousel-arrow) {
    background-color: rgba(30, 41, 59, 0.8);
    border: 1px solid #334155;
    color: #94a3b8;
    transition: all 0.3s ease;
}

.carousel-wrapper :deep(.carousel-arrow:hover) {
    background-color: #0f172a;
    border-color: #22d3ee;
    color: #22d3ee;
    box-shadow: 0 0 15px rgba(34, 211, 238, 0.3);
}
</style>
