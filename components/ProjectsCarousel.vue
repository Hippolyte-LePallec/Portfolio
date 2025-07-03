<script setup lang="ts">
import { ref } from 'vue';
import type { Project } from '../types/project';
const projects = ref<Project[]>();

import projectsData from '../data/projects.json';

projects.value = projectsData.map((project: any) => ({
    title: project.title,
    image: project.image,
    description: project.description,
    link: project.link,
    tags: project.tags,
    technologies: project.technologies
}));

</script>

<template>
    <UCarousel
        class="projects-carousel"
        :items="projects"
        :items-per-view="3"
        :loop="true"
        :autoplay="true"
        :autoplay-interval="5000"
        :navigation="true"
    />

</template>
