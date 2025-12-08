<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";

const projectsSection = ref(null);
const titleRef = ref(null);
const subtitleRef = ref(null);

onMounted(() => {
    gsap.from(titleRef.value, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
    });

    gsap.from(subtitleRef.value, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
    });
});
</script>

<template>
    <section
        id="projects"
        ref="projectsSection"
        class="relative min-h-screen bg-slate-950 text-slate-300 overflow-hidden font-sans py-24"
    >
        <div
            class="absolute inset-0 z-0 opacity-20"
            style="
                background-image: linear-gradient(#334155 1px, transparent 1px),
                    linear-gradient(to right, #334155 1px, transparent 1px);
                background-size: 40px 40px;
            "
        ></div>

        <div
            class="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] pointer-events-none"
        ></div>
        <div
            class="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] pointer-events-none"
        ></div>

        <UContainer
            class="relative z-10 flex flex-col items-center text-center px-4"
        >
            <h2
                ref="titleRef"
                class="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
            >
                Mes
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
                >
                    Projets
                </span>
            </h2>

            <p
                ref="subtitleRef"
                class="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed"
            >
                Voici quelques-uns des projets sur lesquels j'ai travaillé.
                <br />
                Chaque projet représente un défi technique et créatif unique.
            </p>

            <div class="w-full max-w-7xl mb-8">
                <h3
                    class="text-xl font-mono text-cyan-500 mb-8 flex items-center justify-center gap-3"
                >
                    <span class="w-8 h-[1px] bg-cyan-800"></span>
                    PORTFOLIO
                    <span class="w-8 h-[1px] bg-cyan-800"></span>
                </h3>
            </div>

            <ProjectsCarousel />
        </UContainer>
    </section>
</template>

<style scoped>
</style>
