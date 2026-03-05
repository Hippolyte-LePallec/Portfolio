<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";

const animatedElements = ref<HTMLElement[]>([]);
const setAnimatedRef = (el: any) => {
    if (el && !animatedElements.value.includes(el))
        animatedElements.value.push(el);
};

const competences = [
    {
        code: "UE4.1A - C1",
        titre: "Réaliser",
        desc: "Développement d'applications et interfaces graphiques.",
        validation:
            "Validé par le projet BlueFrontline (Python/GUI) et le développement de ce Portfolio en Vue.js.",
    },
    {
        code: "UE4.2A - C2",
        titre: "Optimiser",
        desc: "Analyse algorithmique et efficacité du code.",
        validation:
            "Appliqué dans SAE_Astro pour le traitement de données et dans NodeBuster pour la logique de jeu en Java.",
    },
    {
        code: "UE4.3A - C3",
        titre: "Administrer",
        desc: "Installation et configuration de systèmes et réseaux.",
        validation:
            "Mise en place d'environnements de dev et déploiement continu (Vercel/GitHub Actions).",
    },
    {
        code: "UE4.4A - C4",
        titre: "Gérer",
        desc: "Conception et exploitation de bases de données.",
        validation:
            "Projets académiques impliquant SQL et la persistance de données pour les applications.",
    },
    {
        code: "UE4.5A - C5",
        titre: "Conduire",
        desc: "Gestion de projet et méthodes de travail.",
        validation:
            "Utilisation de MkDocs pour la documentation de BlueFrontline et suivi de projet structuré.",
    },
    {
        code: "UE4.6A - C6",
        titre: "Collaborer",
        desc: "Travail en équipe et communication technique.",
        validation:
            "Collaboration active sur GitHub (Pull Requests, Code Review) sur le projet BlueFrontline.",
    },
];

onMounted(async () => {
    await nextTick();
    if (animatedElements.value.length > 0) {
        gsap.fromTo(
            animatedElements.value,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
            },
        );
    }
});
</script>

<template>
    <Header class="relative z-50" />

    <main>
        <section
            class="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-300 overflow-hidden font-sans pt-32 pb-16"
            id="but"
        >
            <div
                class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0"
            ></div>
            <div
                class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none z-0"
            ></div>

            <div class="relative z-10 max-w-7xl mx-auto px-6">
                <div :ref="setAnimatedRef" class="text-center mb-16">
                    <h1
                        class="text-4xl md:text-6xl font-extrabold text-white mb-6"
                    >
                        <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
                        >
                            Compétences & Réalisations
                        </span>
                    </h1>
                    <p class="text-lg text-slate-400 max-w-2xl mx-auto italic">
                        "Présentation de mon parcours en 180 secondes et preuves
                        techniques via mes projets Open Source."
                    </p>
                </div>

                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
                >
                    <div
                        v-for="comp in competences"
                        :key="comp.code"
                        :ref="setAnimatedRef"
                        class="group bg-slate-900/60 border border-slate-800 p-8 rounded-2xl transition-all duration-500 hover:border-cyan-500/50 hover:bg-slate-800/80 shadow-lg"
                    >
                        <div class="flex justify-between items-start mb-4">
                            <span
                                class="text-cyan-400 font-mono text-sm font-bold"
                                >{{ comp.code }}</span
                            >
                            <div
                                class="h-2 w-2 rounded-full bg-purple-500 animate-pulse"
                            ></div>
                        </div>
                        <h3
                            class="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors"
                        >
                            {{ comp.titre }}
                        </h3>
                        <p class="text-slate-400 text-sm mb-6 leading-relaxed">
                            {{ comp.desc }}
                        </p>
                        <div class="pt-4 border-t border-slate-800">
                            <span
                                class="text-[10px] uppercase tracking-widest text-slate-500 font-bold"
                                >Preuve GitHub :</span
                            >
                            <p
                                class="text-xs text-purple-300 mt-2 leading-snug"
                            >
                                {{ comp.validation }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <div :ref="setAnimatedRef" class="space-y-6">
                        <h2 class="text-3xl font-bold text-white">
                            Mon BUT en 180s
                        </h2>
                        <p class="text-slate-400">
                            Dans cette vidéo, je synthétise mon apprentissage et
                            ma vision du métier d'informaticien. C'est le reflet
                            de ma capacité à communiquer et à synthétiser des
                            concepts techniques.
                        </p>
                        <div
                            class="aspect-video rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl"
                        >
                            <iframe
                                class="w-full h-full"
                                src="https://www.youtube.com/embed/sRqWLf2R5LQ"
                                title="Présentation BUT Hippolyte"
                                frameborder="0"
                                allowfullscreen
                            ></iframe>
                        </div>
                    </div>

                    <div
                        :ref="setAnimatedRef"
                        class="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-10 rounded-3xl border border-slate-700"
                    >
                        <h3 class="text-2xl font-bold text-white mb-4">
                            Explorez mes dépôts
                        </h3>
                        <p class="text-slate-400 mb-8">
                            La validation de mes compétences est concrète : du
                            script Python pour l'astronomie à la gestion d'un
                            jeu Java, chaque ligne de code est une étape de mon
                            diplôme.
                        </p>
                        <a
                            href="https://github.com/Hippolyte-LePallec"
                            target="_blank"
                            class="inline-flex items-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-full font-bold hover:bg-cyan-400 transition-all transform hover:scale-105 shadow-xl"
                        >
                            <svg
                                class="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.045.66-3.795-1.455-3.795-1.455-.54-1.38-1.32-1.74-1.32-1.74-.99-.675.075-.66.075-.66 1.095.075 1.674 1.125 1.674 1.125.975 1.665 2.55 1.185 3.18.915.09-.705.375-1.185.69-1.455-2.67-.3-5.475-1.335-5.475-5.94 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.92 1.23 3.225 0 4.62-2.805 5.625-5.475 5.925.435.375.81 1.125.81 2.265 0 1.635-.015 2.955-.015 3.36 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                                />
                            </svg>
                            Voir mon GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <Footer class="relative z-10" />
</template>
