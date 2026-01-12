<script setup lang="ts">
const currentYear = new Date().getFullYear();

const socialLinks = [
    {
        name: "GitHub",
        icon: "i-simple-icons-github",
        href: "https://github.com/Hippolyte-LePallec",
    },
    {
        name: "LinkedIn",
        icon: "i-simple-icons-linkedin",
        href: "https://www.linkedin.com/in/hippolyte-le-pallec-7aa970236/",
    },
];
</script>

<template>
    <footer
        class="relative bg-slate-950 border-t border-slate-800/50 pt-12 pb-8 overflow-hidden"
    >
        <div
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-24 bg-purple-500/5 blur-[100px] pointer-events-none"
        ></div>

        <UContainer>
            <div
                class="flex flex-col md:flex-row justify-between items-center gap-8 mb-12"
            >
                <div class="flex flex-col items-center md:items-start gap-3">
                    <div class="flex items-center gap-2">
                        <div
                            class="w-7 h-7 rounded bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white font-mono text-sm"
                        >
                            H
                        </div>
                        <span
                            class="text-white font-mono font-bold tracking-tighter text-lg uppercase"
                        >
                            Hippolyte<span class="text-cyan-500">.</span>dev
                        </span>
                    </div>
                    <p class="text-slate-500 text-sm font-mono tracking-tight">
                        &lt; Développeur Full Stack /&gt;
                    </p>
                </div>

                <div class="flex gap-4">
                    <a
                        v-for="social in socialLinks"
                        :key="social.name"
                        :href="social.href"
                        target="_blank"
                        class="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
                    >
                        <UIcon :name="social.icon" class="w-5 h-5" />
                    </a>
                </div>

                <div class="text-center md:text-right">
                    <p
                        class="text-slate-500 text-xs font-mono uppercase tracking-widest mb-1"
                    >
                        Localisation
                    </p>
                    <p
                        class="text-slate-300 text-sm flex items-center justify-center md:justify-end gap-2"
                    >
                        Calais, France <span class="text-lg">🇫🇷</span>
                    </p>
                </div>
            </div>

            <div
                class="pt-8 border-t border-slate-900/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] font-mono uppercase tracking-widest"
            >
                <p>© {{ currentYear }} — Design & Code par Hippolyte</p>
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-green-500/50"></span>
                    Built with Nuxt & GSAP
                </div>
            </div>
        </UContainer>
    </footer>
</template>
