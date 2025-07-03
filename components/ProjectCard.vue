<script setup lang="ts">
import { defineProps } from 'vue'
import type { Project } from '../types/project';

const props = defineProps<{
    project: Project
}>()

</script>

<template>
    <UCard class="project-card">
        <UCardHeader>
            <img :src="project.image" alt="Project Image" class="w-full h-48 object-cover rounded-t-lg" />
        </UCardHeader>

        <UCardBody>
            <h3 class="text-lg font-semibold">{{ project.title }}</h3>
            <p class="text-gray-600">{{ project.description }}</p>
        </UCardBody>

        <UCardFooter>
            <UButton
                variant="solid"
                color="primary"
                :to="project.link"
                target="_blank"
            >
                Voir le projet
            </UButton>
        </UCardFooter>
    </UCard>
</template>
