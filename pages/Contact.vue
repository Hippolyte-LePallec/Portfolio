<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import gsap from "gsap";

const formData = reactive({
    name: "",
    email: "",
    subject: "",
    message: "",
});

const isSubmitting = ref(false);
const submitStatus = ref<"idle" | "success" | "error">("idle");
const errorMessage = ref("");

const animatedElements = ref<HTMLElement[]>([]);
const setAnimatedRef = (el: any) => {
    if (el && !animatedElements.value.includes(el))
        animatedElements.value.push(el);
};

onMounted(async () => {
    await nextTick();

    if (animatedElements.value.length > 0) {
        gsap.fromTo(
            animatedElements.value,
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.15,
            }
        );
    }
});

const handleSubmit = async () => {
    isSubmitting.value = true;
    submitStatus.value = "idle";
    errorMessage.value = "";

    try {
        // APPEL À VOTRE API NUXT (server/api/contact.post.ts)
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
            }),
        });

        // On tente de parser la réponse, qu'elle soit ok ou erreur
        const data = await response.json();

        if (response.ok) {
            submitStatus.value = "success";
            // Reset après 3 secondes
            setTimeout(() => {
                submitStatus.value = "idle";
                Object.keys(formData).forEach((key) => {
                    formData[key as keyof typeof formData] = "";
                });
            }, 3000);
        } else {
            // On récupère le message d'erreur renvoyé par le serveur Nuxt s'il existe
            throw new Error(data.statusMessage || "Erreur lors de l'envoi");
        }
    } catch (error: any) {
        submitStatus.value = "error";
        errorMessage.value =
            error.message || "Une erreur est survenue. Veuillez réessayer.";
        console.error("Erreur d'envoi:", error);
    } finally {
        isSubmitting.value = false;
    }
};

const baseCardClass =
    "relative p-6 bg-slate-900/90 border-l-4 rounded-md overflow-hidden group transition-all duration-300 shadow-lg";

const contactInfo = {
    email: "hippolytelepallec@gmail.com",
    phone: "+33 6 40 51 62 07",
    location: "France",
    github: "https://github.com/Hippolyte-LePallec",
    linkedin: "https://www.linkedin.com/in/hippolyte-le-pallec-7aa970236/",
};
</script>

<template>
    <section
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

        <div class="relative z-10 max-w-7xl mx-auto py-24 px-4">
            <div :ref="setAnimatedRef" class="text-center mb-12">
                <h1
                    class="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight"
                >
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
                    >
                        Contactez-moi
                    </span>
                </h1>
                <p class="text-xl text-slate-400 max-w-2xl mx-auto">
                    Une question ? Un projet ? N'hésitez pas à me contacter
                </p>
            </div>

            <div
                class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mb-12"
            >
                <div
                    :ref="setAnimatedRef"
                    :class="[
                        baseCardClass,
                        'border-cyan-500 hover:bg-slate-800',
                    ]"
                >
                    <div
                        class="absolute -right-6 -bottom-6 w-32 h-32 text-cyan-900/20 group-hover:text-cyan-800/30 transition-all z-0"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <div class="relative z-10">
                        <h3
                            class="text-lg font-semibold text-cyan-400 mb-3 flex items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            Email
                        </h3>
                        <a
                            :href="`mailto:${contactInfo.email}`"
                            class="text-slate-300 hover:text-cyan-400 transition-colors"
                        >
                            {{ contactInfo.email }}
                        </a>
                    </div>
                </div>

                <div
                    :ref="setAnimatedRef"
                    :class="[
                        baseCardClass,
                        'border-purple-500 hover:bg-slate-800',
                    ]"
                >
                    <div
                        class="absolute -right-6 -bottom-6 w-32 h-32 text-purple-900/20 group-hover:text-purple-800/30 transition-all z-0"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                        </svg>
                    </div>
                    <div class="relative z-10">
                        <h3
                            class="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                            Téléphone
                        </h3>
                        <a
                            :href="`tel:${contactInfo.phone}`"
                            class="text-slate-300 hover:text-purple-400 transition-colors"
                        >
                            {{ contactInfo.phone }}
                        </a>
                    </div>
                </div>

                <div
                    :ref="setAnimatedRef"
                    :class="[
                        baseCardClass,
                        'border-green-500 hover:bg-slate-800',
                    ]"
                >
                    <div
                        class="absolute -right-6 -bottom-6 w-32 h-32 text-green-900/20 group-hover:text-green-800/30 transition-all z-0"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>
                    <div class="relative z-10">
                        <h3
                            class="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            Localisation
                        </h3>
                        <p class="text-slate-300">{{ contactInfo.location }}</p>
                    </div>
                </div>
            </div>

            <div :ref="setAnimatedRef" class="w-full max-w-3xl mx-auto">
                <div
                    :class="[
                        baseCardClass,
                        'border-cyan-500 hover:bg-slate-900/95 hover:shadow-[0_0_30px_rgba(8,145,178,0.2)]',
                    ]"
                >
                    <form @submit.prevent="handleSubmit" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    for="name"
                                    class="block text-sm font-medium text-slate-300 mb-2"
                                >
                                    Nom complet
                                </label>
                                <input
                                    id="name"
                                    v-model="formData.name"
                                    type="text"
                                    required
                                    class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                                    placeholder="Votre nom"
                                />
                            </div>

                            <div>
                                <label
                                    for="email"
                                    class="block text-sm font-medium text-slate-300 mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    v-model="formData.email"
                                    type="email"
                                    required
                                    class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                                    placeholder="votre@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                for="subject"
                                class="block text-sm font-medium text-slate-300 mb-2"
                            >
                                Sujet
                            </label>
                            <input
                                id="subject"
                                v-model="formData.subject"
                                type="text"
                                required
                                class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                                placeholder="Sujet de votre message"
                            />
                        </div>

                        <div>
                            <label
                                for="message"
                                class="block text-sm font-medium text-slate-300 mb-2"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                v-model="formData.message"
                                required
                                rows="6"
                                class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 resize-none"
                                placeholder="Votre message..."
                            ></textarea>
                        </div>

                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <div
                                    v-if="submitStatus === 'success'"
                                    class="flex items-center gap-2 text-green-400"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>Message envoyé avec succès !</span>
                                </div>

                                <div
                                    v-if="submitStatus === 'error'"
                                    class="flex items-center gap-2 text-red-400"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>{{ errorMessage }}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                :disabled="
                                    isSubmitting || submitStatus === 'success'
                                "
                                class="ml-auto bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(8,145,178,0.5)] hover:shadow-[0_0_30px_rgba(8,145,178,0.7)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span v-if="!isSubmitting">Envoyer</span>
                                <span v-else class="flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 animate-spin"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />
                                    </svg>
                                    Envoi...
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div :ref="setAnimatedRef" class="mt-12 text-center">
                <h3
                    class="text-xl font-mono text-cyan-500 mb-6 flex items-center justify-center gap-3"
                >
                    <span class="w-8 h-[1px] bg-cyan-800"></span>
                    RÉSEAUX SOCIAUX
                    <span class="w-8 h-[1px] bg-cyan-800"></span>
                </h3>

                <div class="flex justify-center gap-4">
                    <a
                        :href="contactInfo.github"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center justify-center w-12 h-12 bg-slate-800 border border-slate-700 rounded-full hover:border-cyan-500 hover:bg-slate-700 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    >
                        <svg
                            class="w-6 h-6 text-slate-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                            />
                        </svg>
                    </a>

                    <a
                        :href="contactInfo.linkedin"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center justify-center w-12 h-12 bg-slate-800 border border-slate-700 rounded-full hover:border-cyan-500 hover:bg-slate-700 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    >
                        <svg
                            class="w-6 h-6 text-slate-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
input:focus,
textarea:focus {
    box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.1);
}
</style>
