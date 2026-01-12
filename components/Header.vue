<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";

const navLinks = [
    { name: "Accueil", to: "/#hero" },
    { name: "Parcours", to: "/#timeline" },
    { name: "Projets", to: "/#projects" },
    { name: "Contact", to: "/contact" },
];

const headerRef = ref(null);

onMounted(() => {
    gsap.from(headerRef.value, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.2,
    });
});
</script>

<template>
    <header
        ref="headerRef"
        class="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md"
    >
        <UContainer>
            <div class="flex h-20 items-center justify-between">
                <NuxtLink
                    to="/"
                    class="flex items-center gap-2 group cursor-pointer"
                >
                    <div
                        class="w-8 h-8 rounded bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white text-xl"
                    >
                        H
                    </div>
                    <span
                        class="text-white font-mono font-bold tracking-tighter text-xl group-hover:text-cyan-400"
                        >HIPPOLYTE</span
                    >
                </NuxtLink>

                <nav class="hidden md:flex items-center gap-8">
                    <NuxtLink
                        v-for="link in navLinks"
                        :key="link.name"
                        :to="link.to"
                        class="text-sm font-mono text-slate-400 hover:text-cyan-400 transition-all relative group"
                    >
                        <span
                            class="text-cyan-600 mr-1 opacity-0 group-hover:opacity-100"
                            >//</span
                        >
                        {{ link.name }}
                    </NuxtLink>
                </nav>
            </div>
        </UContainer>
    </header>
</template>

<style scoped>
/* Petit effet de souligne animé pour les liens */
nav a::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background: linear-gradient(to right, #22d3ee, #a855f7);
    transition: width 0.3s ease;
}

nav a:hover::after {
    width: 100%;
}
</style>
