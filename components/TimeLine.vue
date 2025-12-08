<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from "vue";
import { Icon } from "@iconify/vue";
import gsap from "gsap";
import parcourData from "../data/Parcours.json";

const iconMap: Record<string, string> = {
    "i-material-symbols-work": "material-symbols:work",
    "i-material-symbols-school": "material-symbols:school",
    "i-tdesign-html5-filled": "tdesign:html5-filled",
    "i-teenyicons-react-solid": "teenyicons:react-solid",
    "i-fa6-solid-school": "fa6-solid:school",
};

const items = parcourData.map((item: any) => ({
    ...item,
    icon: iconMap[item.icon] || item.icon,
}));

const maxStep = items.length - 1;
const activeIndex = ref(0);
const progressObj = ref({ value: 0 });
const sectionRef = ref(null);
const contentCardRef = ref(null);

const jumpToStep = (index: number) => {
    gsap.killTweensOf(progressObj.value);

    gsap.to(progressObj.value, {
        value: index,
        duration: 0.8,
        ease: "power2.out",
    });
};

onMounted(async () => {
    gsap.from(sectionRef.value, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
    });

    gsap.to(progressObj.value, {
        value: maxStep,
        duration: 4,
        ease: "linear",
        delay: 0.5,
    });
});

watch(
    () => progressObj.value.value,
    (newVal, oldVal) => {
        const newIndex = Math.round(newVal);
        const oldIndex = Math.round(oldVal || 0);

        if (newIndex !== activeIndex.value) {
            activeIndex.value = newIndex;

            if (contentCardRef.value) {
                gsap.fromTo(
                    contentCardRef.value,
                    { y: 5, opacity: 0.8 },
                    { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
                );
            }
        }
    }
);
</script>

<template>
    <section ref="sectionRef" class="section-base">
        <!-- Grille de fond alignée -->
        <div class="grid-background"></div>

        <!-- Effets lumineux -->
        <div class="glow-effect glow-cyan-timeline"></div>
        <div class="glow-effect glow-purple-timeline"></div>

        <div
            class="relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto px-4 py-24"
        >
            <div class="text-center mb-24">
                <h2
                    class="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight"
                >
                    Mon
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
                        >Parcours</span
                    >
                </h2>
                <div
                    class="h-1 w-24 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                ></div>
            </div>

            <div class="relative w-full px-4 mb-16 select-none">
                <div
                    class="absolute top-1/2 left-0 w-full h-1 bg-slate-800 rounded -translate-y-1/2"
                ></div>

                <div
                    class="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded -translate-y-1/2 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                    :style="{
                        width: (progressObj.value / maxStep) * 100 + '%',
                    }"
                ></div>

                <div
                    class="absolute left-0 top-1/2 w-full flex justify-between items-center -translate-y-1/2 z-10"
                >
                    <template v-for="(item, idx) in items" :key="idx">
                        <div
                            class="group relative flex flex-col items-center cursor-pointer"
                            @click="jumpToStep(idx)"
                        >
                            <div
                                class="w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 z-20 bg-slate-900"
                                :class="[
                                    activeIndex >= idx
                                        ? 'border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-110'
                                        : 'border-slate-700 text-slate-600 group-hover:border-slate-500 group-hover:text-slate-400',
                                ]"
                            >
                                <Icon
                                    :icon="item.icon"
                                    width="20"
                                    height="20"
                                />
                            </div>

                            <div
                                class="absolute -top-10 transition-all duration-300 whitespace-nowrap"
                                :class="
                                    activeIndex === idx
                                        ? 'opacity-100 -translate-y-1'
                                        : 'opacity-50 group-hover:opacity-100'
                                "
                            >
                                <span
                                    class="text-xs font-mono font-bold"
                                    :class="
                                        activeIndex >= idx
                                            ? 'text-cyan-400'
                                            : 'text-slate-500'
                                    "
                                >
                                    {{ item.date }}
                                </span>
                            </div>

                            <div
                                class="absolute -top-4 w-px h-4 bg-slate-800 transition-colors duration-300"
                                :class="
                                    activeIndex >= idx ? 'bg-cyan-500/50' : ''
                                "
                            ></div>
                        </div>
                    </template>
                </div>
            </div>

            <div class="w-full max-w-3xl relative perspective-1000">
                <div
                    class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-2xl -z-10 rounded-xl transform scale-95"
                ></div>

                <div
                    ref="contentCardRef"
                    class="bg-slate-800/50 border border-slate-700 p-8 rounded-lg backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:border-cyan-500/30"
                >
                    <div
                        class="flex items-center gap-2 mb-6 border-b border-slate-700/50 pb-4"
                    >
                        <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div
                            class="w-3 h-3 rounded-full bg-yellow-500/80"
                        ></div>
                        <div class="w-3 h-3 rounded-full bg-green-500/80"></div>

                        <div class="ml-auto font-mono text-xs flex gap-4">
                            <span class="text-slate-500"
                                >STATUS:
                                <span class="text-emerald-400"
                                    >ACTIVE</span
                                ></span
                            >
                            <span class="text-slate-500"
                                >ID:
                                <span class="text-cyan-400">{{
                                    String(activeIndex).padStart(2, "0")
                                }}</span></span
                            >
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row gap-6 items-start">
                        <div class="flex-1">
                            <h3
                                class="text-2xl font-bold text-white mb-2 tracking-wide flex items-center gap-3"
                            >
                                {{ items[activeIndex]?.title }}
                                <Icon
                                    icon="line-md:loading-twotone-loop"
                                    class="text-cyan-500 text-lg opacity-50"
                                    v-if="activeIndex === maxStep"
                                />
                            </h3>
                            <div class="h-0.5 w-16 bg-cyan-900/50 mb-4"></div>
                            <p class="text-slate-300 text-lg leading-relaxed">
                                {{ items[activeIndex]?.description }}
                            </p>
                        </div>

                        <div class="hidden md:block opacity-10 rotate-12">
                            <Icon
                                :icon="items[activeIndex]?.icon"
                                width="100"
                                height="100"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Styles de base de section */
.section-base {
    position: relative;
    background-color: #020617;
    color: #cbd5e1;
    overflow: hidden;
    font-family: system-ui, -apple-system, sans-serif;
}

/* Grille de fond alignée */
.grid-background {
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: 0.2;
    pointer-events: none;
    background-image: linear-gradient(#334155 1px, transparent 1px),
        linear-gradient(to right, #334155 1px, transparent 1px);
    background-size: 50px 50px;
}

/* Effets lumineux */
.glow-effect {
    position: absolute;
    width: 24rem;
    height: 24rem;
    border-radius: 50%;
    filter: blur(128px);
    pointer-events: none;
}

.glow-cyan-timeline {
    top: 5rem;
    right: 0;
    background-color: rgba(6, 182, 212, 0.1);
}

.glow-purple-timeline {
    bottom: 0;
    left: 0;
    background-color: rgba(168, 85, 247, 0.1);
}

.perspective-1000 {
    perspective: 1000px;
}
</style>
