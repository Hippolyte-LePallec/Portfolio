<script setup lang="ts">
import { ref } from 'vue';
import type { Project } from '../types/project';
import projectsData from '../data/projects.json';

const projects = ref<Project[]>([]);

if (Array.isArray(projectsData)) {
    projects.value = projectsData.map((project: any) => ({
        title: project.title,
        image: project.image,
        description: project.description,
        link: project.link,
        tags: project.tags,
        technologies: project.technologies
    }));
} else {
    console.error('Les données des projets ne sont pas un tableau:', projectsData);
}
</script>

<template>
    <div class="mt-8 w-full">
        <div v-if="projects.length > 0">
            <UCarousel
                v-slot="{ item }"
                loop
                dots
                arrows
                :auto-scroll="{ speed: 1, stopOnInteraction: false}"
                :items="projects"
                :ui="{ item: 'basis-1/3' }"
            >
                <ProjectCard :project="item" />
            </UCarousel>
        </div>
        <div v-else class="text-center py-8">
            <p class="text-gray-600">Aucun projet à afficher</p>
        </div>
    </div>
</template>

<style scoped>
.projects-carousel {
    margin-top: 2rem;
    width: 100%;
}
</style>