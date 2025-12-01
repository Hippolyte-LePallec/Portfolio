<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import gsap from "gsap";

// --- Données inchangées ---
const birthDate = new Date("2004-06-19");
const currentAge = ref(0);
const tweened = reactive({ number: 0 });

const heroSection = ref(null);
const techGrid = ref(null);

// Gestion des références pour GSAP
const animatedElements = ref<HTMLElement[]>([]);
const setAnimatedRef = (el: any) => {
    if (el && !animatedElements.value.includes(el))
        animatedElements.value.push(el);
};

const animatedTextSpans = ref<HTMLElement[]>([]);
const setTextRef = (el: any) => {
    if (el && !animatedTextSpans.value.includes(el))
        animatedTextSpans.value.push(el);
};

function calculateAge(birthDate: Date) {
    const now = new Date();
    let age = now.getFullYear() - birthDate.getFullYear();
    const m = now.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

onMounted(async () => {
    currentAge.value = calculateAge(birthDate);
    gsap.to(tweened, {
        duration: 1.5,
        number: currentAge.value,
        ease: "circ.out",
    });

    await nextTick();

    gsap.from(animatedElements.value, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
    });

    gsap.from(animatedTextSpans.value, {
        opacity: 0,
        x: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
        delay: 0.3,
    });

    gsap.from(techGrid.value, {
        opacity: 0,
        y: 50,
        delay: 0.6,
        duration: 1,
        ease: "power2.out",
    });
});

const technologies = [
    {
        label: "Java",
        icon: "https://api.iconify.design/logos:java.svg",
        link: "https://docs.oracle.com/en/java/",
    },
    {
        label: "PHP",
        icon: "https://api.iconify.design/logos:php.svg",
        link: "https://www.php.net/manual/fr/",
    },
    {
        label: "HTML",
        icon: "https://api.iconify.design/logos:html-5.svg",
        link: "https://developer.mozilla.org/fr/docs/Web/HTML",
    },
    {
        label: "CSS",
        icon: "https://api.iconify.design/logos:css-3.svg",
        link: "https://developer.mozilla.org/fr/docs/Web/CSS",
    },
    {
        label: "Vue.js",
        icon: "https://api.iconify.design/logos:vue.svg",
        link: "https://vuejs.org/guide/introduction.html",
    },
    {
        label: "Git",
        icon: "https://api.iconify.design/logos:git.svg",
        link: "https://git-scm.com/doc",
    },
    {
        label: "TypeScript",
        icon: "https://api.iconify.design/logos:typescript-icon.svg",
        link: "https://www.typescriptlang.org/docs/",
    },
    {
        label: "Python",
        icon: "https://api.iconify.design/logos:python.svg",
        link: "https://www.python.org/doc/",
    },
    {
        label: "PostgreSQL",
        icon: "https://api.iconify.design/logos:postgresql.svg",
        link: "https://www.postgresql.org/docs/",
    },
    {
        label: "React",
        icon: "https://api.iconify.design/logos:react.svg",
        link: "https://www.reactjs.org/docs/getting-started.html",
    },
    {
        label: "Tailwind CSS",
        icon: "https://api.iconify.design/logos:tailwindcss-icon.svg",
        link: "https://tailwindcss.com/docs/installation",
    },
    {
        label: "Nuxt.js",
        icon: "https://api.iconify.design/logos:nuxt.svg",
        link: "https://nuxt.com/docs/getting-started/introduction",
    },
    {
        label: "C",
        icon: "https://api.iconify.design/logos:c.svg",
        link: "https://devdocs.io/c/",
    },
    {
        label: "C++",
        icon: "https://api.iconify.design/logos:c-plusplus.svg",
        link: "https://devdocs.io/cpp/",
    },
    {
        label: "Flutter",
        icon: "https://api.iconify.design/logos:flutter.svg",
        link: "https://www.flutter.dev/docs/get-started/install",
    },
    {
        label: "LaTeX",
        icon: "https://api.iconify.design/file-icons:latex.svg",
        link: "https://www.overleaf.com/learn",
    },
    {
        label: "Docker",
        icon: "https://api.iconify.design/logos:docker-icon.svg",
        link: "https://docs.docker.com/get-started/",
    },
    {
        label: "Linux",
        icon: "https://api.iconify.design/logos:linux-tux.svg",
        link: "https://www.kernel.org/doc/html/latest/",
    },
    {
        label: "Figma",
        icon: "https://api.iconify.design/logos:figma.svg",
        link: "https://www.figma.com/resources/learn-design/",
    },
    {
        label: "MongoDB",
        icon: "https://api.iconify.design/devicon:mongodb-wordmark.svg",
        link: "https://www.mongodb.com/docs/",
    },
    {
        label: "Node.js",
        icon: "https://api.iconify.design/logos:nodejs-icon.svg",
        link: "https://nodejs.org/en/docs/",
    },
    {
        label: "Express.js",
        icon: "https://api.iconify.design/logos:express.svg",
        link: "https://expressjs.com/en/starter/installing.html",
    },
    {
        label: "Bootstrap",
        icon: "https://api.iconify.design/logos:bootstrap.svg",
        link: "https://getbootstrap.com/docs/5.3/getting-started/introduction/",
    },
    {
        label: "WordPress",
        icon: "https://api.iconify.design/logos:wordpress-icon.svg",
        link: "https://wordpress.org/docs/",
    },
];

// --- NOUVEAU STYLE DES CARTES ---
// Suppression du "backdrop-blur" et ajout d'une bordure latérale forte
const baseCardClass =
    "relative p-6 bg-slate-900/90 border-l-4 rounded-md overflow-hidden group hover:bg-slate-800 transition-all duration-300 shadow-lg";
</script>

<template>
    <section
        id="hero"
        ref="heroSection"
        class="relative min-h-screen bg-slate-950 text-slate-300 overflow-hidden font-sans"
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
            class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] pointer-events-none"
        ></div>
        <div
            class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] pointer-events-none"
        ></div>

        <UContainer
            class="relative z-10 flex flex-col items-center text-center py-24 px-4"
        >
            <div :ref="setAnimatedRef" class="relative mb-10">
                <div
                    class="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 blur opacity-75 animate-pulse"
                ></div>
                <div class="relative bg-slate-900 rounded-full p-1">
                    <UAvatar
                        size="2xl"
                        src="/kayak.jpg"
                        alt="Moi en kayak"
                        class="rounded-full h-32 w-32"
                    />
                </div>
            </div>

            <h1
                :ref="setAnimatedRef"
                class="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
                Bonjour, je suis
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
                    >Hippolyte</span
                >
            </h1>

            <p
                :ref="setAnimatedRef"
                class="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl leading-relaxed"
            >
                J'ai
                <span class="text-cyan-400 font-mono font-bold text-3xl">{{
                    tweened.number.toFixed(0)
                }}</span>
                ans. Developeur
                <strong class="text-white">Full Stack</strong>.
                <br />
                Passionné de <strong class="text-white">Web & Logiciel</strong>.
            </p>

            <div
                :ref="setAnimatedRef"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mb-16 text-left"
            >
                <div :class="[baseCardClass, 'border-cyan-500']">
                    <UIcon
                        name="i-heroicons-user"
                        class="absolute -right-6 -bottom-6 w-32 h-32 text-cyan-900/20 group-hover:text-cyan-800/30 transition-all z-0"
                    />
                    <div class="relative z-10">
                        <h3
                            class="text-lg font-semibold text-cyan-400 mb-3 flex items-center gap-2"
                        >
                            Soft Skills
                        </h3>
                        <span
                            v-for="(line, index) in [
                                'Curieux, rigoureux et autonome,',
                                'j’apprécie aussi bien le travail d’équipe',
                                'que le développement en solo.',
                                'Toujours en quête de progression.',
                            ]"
                            :key="index"
                            :ref="setTextRef"
                            class="block mb-1"
                        >
                            {{ line }}
                        </span>
                    </div>
                </div>

                <div :class="[baseCardClass, 'border-purple-500']">
                    <UIcon
                        name="i-heroicons-heart"
                        class="absolute -right-6 -bottom-6 w-32 h-32 text-purple-900/20 group-hover:text-purple-800/30 transition-all z-0"
                    />
                    <div class="relative z-10">
                        <h3
                            class="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2"
                        >
                            Engagements
                        </h3>
                        <span
                            v-for="(line, index) in [
                                'En parallèle, je suis moniteur de kayak et très investi',
                                'dans la vie associative de mon club.',
                                'Pédagogie, patience et initiative.',
                            ]"
                            :key="index"
                            :ref="setTextRef"
                            class="block mb-1"
                        >
                            {{ line }}
                        </span>
                    </div>
                </div>

                <div
                    :class="[
                        baseCardClass,
                        'md:col-span-2 lg:col-span-1 border-green-500 bg-slate-800/80 hover:bg-slate-800',
                    ]"
                >
                    <UIcon
                        name="i-heroicons-briefcase"
                        class="absolute -right-6 -bottom-6 w-32 h-32 text-green-900/20 group-hover:text-green-800/30 transition-all z-0"
                    />
                    <div class="relative z-10">
                        <h3
                            class="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2"
                        >
                            Objectif Actuel
                        </h3>
                        <span
                            v-for="(line, index) in [
                                'Actuellement, je cherche un stage en développement',
                                'pour mettre à profit mes compétences.',
                            ]"
                            :key="index"
                            :ref="setTextRef"
                            class="block text-lg font-medium text-slate-200"
                        >
                            {{ line }}
                        </span>
                    </div>
                </div>
            </div>

            <div :ref="setAnimatedRef" class="w-full max-w-5xl">
                <h3
                    class="text-xl font-mono text-cyan-500 mb-8 flex items-center justify-center gap-3"
                >
                    <span class="w-8 h-[1px] bg-cyan-800"></span>
                    STACK TECHNIQUE
                    <span class="w-8 h-[1px] bg-cyan-800"></span>
                </h3>

                <div class="flex flex-wrap justify-center gap-3" ref="techGrid">
                    <template v-for="tech in technologies" :key="tech.label">
                        <a
                            :href="tech.link"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="tech-chip group"
                        >
                            <img
                                :src="tech.icon"
                                :alt="tech.label"
                                class="w-5 h-5 group-hover:scale-125 transition-transform duration-300"
                            />
                            <span class="text-sm font-medium">{{
                                tech.label
                            }}</span>
                        </a>
                    </template>
                </div>
            </div>

            <div
                :ref="setAnimatedRef"
                class="mt-16 flex flex-col sm:flex-row gap-6"
            >
                <UButton
                    size="xl"
                    class="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(8,145,178,0.5)] hover:shadow-[0_0_30px_rgba(8,145,178,0.7)] transition-all duration-300"
                    :to="'/contact'"
                >
                    Me Contacter
                </UButton>

                <UButton
                    variant="outline"
                    size="xl"
                    class="border border-slate-600 text-slate-300 hover:text-white hover:border-white hover:bg-slate-800 rounded-full py-4 px-8 transition-all duration-300"
                    :to="'https://github.com/Hippolyte-LePallec'"
                    target="_blank"
                >
                    <UIcon name="i-simple-icons-github" class="mr-2" />
                    GitHub
                </UButton>
            </div>
        </UContainer>
    </section>
</template>

<style scoped>
/* Style des chips inchangé */
.tech-chip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #1e293b;
    border: 1px solid #334155;
    color: #94a3b8;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    transition: all 0.3s ease;
}

.tech-chip:hover {
    background-color: #0f172a;
    border-color: #22d3ee;
    color: #22d3ee;
    box-shadow: 0 0 10px rgba(34, 211, 238, 0.2);
    transform: translateY(-2px);
}
</style>
