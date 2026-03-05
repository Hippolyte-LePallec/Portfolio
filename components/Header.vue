<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import gsap from "gsap";

const navLinks = [
    { name: "Accueil", to: "/#hero" },
    { name: "Parcours", to: "/#timeline" },
    { name: "Projets", to: "/#projects" },
    { name: "Contact", to: "/contact" },
    { name: "Mon BUT", to: "/but" },
];

const headerRef = ref(null);
const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

// Empêcher le scroll du body quand le menu est ouvert
watch(isMenuOpen, (newVal) => {
    if (newVal) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
});

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
            <div class="flex h-16 md:h-20 items-center justify-between">
                <NuxtLink to="/" class="flex items-center gap-2 group z-50">
                    <div
                        class="w-7 h-7 md:w-8 md:h-8 rounded bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white text-xl"
                    >
                        H
                    </div>
                    <span
                        class="text-white font-mono font-bold tracking-tighter text-lg md:text-xl group-hover:text-cyan-400"
                        >HIPPOLYTE</span
                    >
                </NuxtLink>

                <nav class="hidden md:flex items-center gap-8">
                    <NuxtLink
                        v-for="link in navLinks"
                        :key="link.name"
                        :to="link.to"
                        class="text-sm font-mono text-slate-400 hover:text-cyan-400 transition-all relative group nav-link"
                    >
                        <span
                            class="text-cyan-600 mr-1 opacity-0 group-hover:opacity-100"
                            >//</span
                        >
                        {{ link.name }}
                    </NuxtLink>
                </nav>

                <button
                    @click="toggleMenu"
                    class="md:hidden text-white p-2 focus:outline-none z-50 relative"
                    aria-label="Toggle Menu"
                >
                    <div class="space-y-1.5 flex flex-col items-end">
                        <span
                            :class="[
                                'block h-0.5 w-6 bg-cyan-400 transition-all duration-300',
                                isMenuOpen ? 'rotate-45 translate-y-2' : '',
                            ]"
                        ></span>
                        <span
                            :class="[
                                'block h-0.5 w-4 bg-purple-600 transition-opacity duration-300',
                                isMenuOpen ? 'opacity-0' : '',
                            ]"
                        ></span>
                        <span
                            :class="[
                                'block h-0.5 w-6 bg-cyan-400 transition-all duration-300',
                                isMenuOpen ? '-rotate-45 -translate-y-2' : '',
                            ]"
                        ></span>
                    </div>
                </button>
            </div>
        </UContainer>

        <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-full"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-full"
        >
            <div
                v-if="isMenuOpen"
                class="fixed inset-0 top-0 left-0 w-full h-screen bg-slate-950 z-40 md:hidden flex flex-col"
            >
                <div class="h-16 border-b border-slate-800/50"></div>

                <nav
                    class="flex-grow flex flex-col items-center justify-center gap-8 p-4"
                >
                    <NuxtLink
                        v-for="(link, index) in navLinks"
                        :key="link.name"
                        :to="link.to"
                        @click="isMenuOpen = false"
                        class="mobile-nav-link text-3xl font-mono font-bold text-slate-200 hover:text-cyan-400 uppercase tracking-widest flex items-baseline gap-2"
                    >
                        <span class="text-xs text-cyan-600 font-medium"
                            >0{{ index + 1 }}</span
                        >
                        {{ link.name }}
                    </NuxtLink>
                </nav>
            </div>
        </Transition>
    </header>
</template>

<style scoped>
/* Effet de souligne Desktop (Toujours pareil) */
@media (min-width: 768px) {
    .nav-link::after {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 1px;
        background: linear-gradient(to right, #22d3ee, #a855f7);
        transition: width 0.3s ease;
    }
    .nav-link:hover::after {
        width: 100%;
    }
}
</style>
