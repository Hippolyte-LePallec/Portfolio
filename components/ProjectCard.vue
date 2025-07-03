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
            <img 
                :src="project.image"
                :alt="project.title" 
                class="w-full h-48 object-cover rounded-t-lg"
            />
        </UCardHeader>
        <UCardBody>
            <h3 class="text-lg font-semibold">{{ project.title }}</h3>
            <p class="text-gray-600">{{ project.description }}</p>
            
            <!-- Tags -->
            <div class="mt-2">
                <span 
                    v-for="tag in project.tags" 
                    :key="tag" 
                    class="inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full mr-2"
                >
                    {{ tag }}
                </span>
            </div>
            
            <!-- Technologies avec icônes -->
            <div class="mt-2 mb-2">
                <span 
                    v-for="tech in project.technologies" 
                    :key="tech.name" 
                    class="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mr-2"
                >
                    <img 
                        :src="tech.icon" 
                        :alt="tech.name" 
                        class="w-4 h-4 mr-1"
                    />
                    {{ tech.name }}
                </span>
            </div>
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