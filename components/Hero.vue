<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import gsap from "gsap";

const birthDate = new Date("2004-06-19");
const currentAge = ref(0);
const tweened = reactive({ number: 0 });

const heroSection = ref(null);
const techGrid = ref(null);

const animatedElements = ref<HTMLElement[]>([]);
const animatedTextSpans = ref<HTMLElement[]>([]);

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
        duration: 1.2,
        number: currentAge.value,
        ease: "power2.out",
    });

    await nextTick();

    gsap.from(animatedElements.value, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        stagger: 0.15,
    });

    gsap.from(animatedTextSpans.value, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.05,
        delay: 0.3,
    });

    // Grille techs
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
];
</script>

<template>
    <section id="hero" ref="heroSection" class="hero-section">
        <UContainer class="flex flex-col items-center text-center py-24 px-4">
            <UAvatar
                ref="animatedElements"
                size="3xl"
                src="/kayak.jpg"
                alt="Moi en kayak"
                class="mb-6 shadow-lg rounded-full border-4 border-secondary"
            />

            <h1
                ref="animatedElements"
                class="text-5xl font-extrabold text-gray-800 mb-4 leading-tight"
            >
                Bonjour, je suis <span class="text-secondary">Hippolyte</span>
            </h1>

            <p
                ref="animatedElements"
                class="text-xl text-gray-600 mb-6 max-w-3xl leading-relaxed"
            >
                J'ai
                <span class="big-number text-2xl">{{
                    tweened.number.toFixed(0)
                }}</span>
                ans, étudiant en <strong>BUT Informatique</strong>, passionné de
                <strong>développement web et logiciel</strong>. J’aime
                transformer des idées en projets concrets et utiles.
            </p>

            <div ref="animatedElements" class="presentation">
                <span
                    v-for="(line, index) in [
                        'Curieux, rigoureux et autonome, j’apprécie aussi bien le travail',
                        'd’équipe que le développement en solo. Je cherche à progresser',
                        'continuellement dans mes compétences techniques.',
                    ]"
                    :key="index"
                    ref="animatedTextSpans"
                    class="block"
                >
                    {{ line }}
                </span>
            </div>

            <div ref="animatedElements" class="presentation">
                <span
                    v-for="(line, index) in [
                        'En parallèle, je suis moniteur de kayak et très investi',
                        'dans la vie associative de mon club. J’y ai appris la pédagogie, la patience et l’initiative.',
                    ]"
                    :key="index"
                    ref="animatedTextSpans"
                    class="block"
                >
                    {{ line }}
                </span>
            </div>

            <div ref="animatedElements" class="presentation">
                <span
                    v-for="(line, index) in [
                        'Actuellement, je cherche une alternance en développement',
                        'pour mettre à profit mes compétences.',
                    ]"
                    :key="index"
                    ref="animatedTextSpans"
                    class="block"
                >
                    {{ line }}
                </span>
            </div>

            <div ref="animatedElements" class="mt-12">
                <p class="text-2xl font-semibold text-gray-700 mb-6">
                    Technologies que j'ai utilisées :
                </p>
                <div class="tech-grid mx-auto" ref="techGrid">
                    <template v-for="tech in technologies" :key="tech.label">
                        <a
                            :href="tech.link"
                            target="_blank"
                            rel="noopener noreferrer"
                            :aria-label="tech.label"
                            class="tech-link"
                        >
                            <img :src="tech.icon" :alt="tech.label" />
                        </a>
                    </template>
                </div>
            </div>

            <div
                ref="animatedElements"
                class="mt-10 flex flex-col sm:flex-row gap-4"
            >
                <UButton
                    variant="solid"
                    color="secondary"
                    :to="'/contact'"
                    class="px-6 py-3"
                >
                    Contactez-moi
                </UButton>
                <UButton
                    variant="outline"
                    color="secondary"
                    :to="'https://github.com/Hippolyte-LePallec'"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-6 py-3"
                >
                    GitHub
                </UButton>
            </div>
        </UContainer>
    </section>
</template>

<style scoped>
.hero-section {
    background: linear-gradient(to right, #ffffff, #e5e7eb);
    color: #1f2937;
}

.big-number {
    font-weight: 700;
    color: var(--color-secondary);
}

.presentation {
    font-size: 1.125rem;
    line-height: 1.75rem;
    color: #4b5563;
    margin-top: 1rem;
    max-width: 40rem;
}

.tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    max-width: 72rem;
    gap: 2rem;
    justify-items: center;
    margin-top: 2rem;
}

.tech-link img {
    width: 4rem;
    height: 4rem;
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 0.9;
}

.tech-link:hover img {
    transform: scale(1.2);
    opacity: 1;
}
</style>
