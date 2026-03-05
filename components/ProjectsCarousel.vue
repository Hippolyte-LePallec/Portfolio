<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { Project } from "../types/project";
import projectsData from "../data/projects.json";

const projects = ref<Project[]>(projectsData);
const containerRef = ref<HTMLElement | null>(null);

let animationId: number | null = null;
let restartTimeout: any = null;
let isPaused = false;

// Variables pour le Drag (Glisser)
let isDragging = false;
let startX: number;
let scrollLeftStart: number;

const INTERACTION_PAUSE_TIME = 5000;
const SPEED = 1;

const animate = () => {
    if (!containerRef.value || isPaused || isDragging) return;

    containerRef.value.scrollLeft += SPEED;

    if (containerRef.value.scrollLeft >= containerRef.value.scrollWidth / 2) {
        containerRef.value.scrollLeft = 0;
    }

    animationId = requestAnimationFrame(animate);
};

const startAutoPlay = () => {
    isPaused = false;
    if (!animationId) animationId = requestAnimationFrame(animate);
};

const stopAutoPlay = () => {
    isPaused = true;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    if (restartTimeout) clearTimeout(restartTimeout);
};

// --- LOGIQUE DE DRAG (SOURIS & TOUCH) ---

const startDragging = (e: MouseEvent | TouchEvent) => {
    isDragging = true;
    stopAutoPlay();

    const pageX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
    startX = pageX - (containerRef.value?.offsetLeft || 0);
    scrollLeftStart = containerRef.value?.scrollLeft || 0;
};

const stopDragging = () => {
    if (!isDragging) return;
    isDragging = false;

    // Relance l'auto-play après un délai d'inactivité
    restartTimeout = setTimeout(() => {
        startAutoPlay();
    }, INTERACTION_PAUSE_TIME);
};

const moveDragging = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.value) return;
    e.preventDefault();

    const pageX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
    const x = pageX - (containerRef.value.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Multiplier pour la sensibilité
    containerRef.value.scrollLeft = scrollLeftStart - walk;

    // Gestion de la boucle infinie même pendant le drag
    if (containerRef.value.scrollLeft <= 0) {
        containerRef.value.scrollLeft = containerRef.value.scrollWidth / 2;
        scrollLeftStart = containerRef.value.scrollLeft + walk;
    } else if (
        containerRef.value.scrollLeft >=
        containerRef.value.scrollWidth / 2
    ) {
        containerRef.value.scrollLeft = 0;
        scrollLeftStart = containerRef.value.scrollLeft + walk;
    }
};

onMounted(() => {
    startAutoPlay();
});

onUnmounted(() => {
    stopAutoPlay();
});
</script>

<template>
    <div class="w-full py-12 overflow-hidden select-none">
        <div
            ref="containerRef"
            class="flex overflow-x-hidden cursor-grab active:cursor-grabbing touch-pan-y"
            @mousedown="startDragging"
            @mousemove="moveDragging"
            @mouseup="stopDragging"
            @mouseleave="stopDragging"
            @touchstart="startDragging"
            @touchmove="moveDragging"
            @touchend="stopDragging"
            @wheel="handleUserInteraction"
        >
            <div class="flex gap-6 pr-6 shrink-0">
                <div
                    v-for="(project, index) in [...projects, ...projects]"
                    :key="index"
                    class="w-[300px] md:w-[400px] lg:w-[450px] shrink-0"
                >
                    <ProjectCard
                        :project="project"
                        class="h-full pointer-events-none"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
div {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

div::-webkit-scrollbar {
    display: none;
}

.flex {
    will-change: transform;
}
</style>
