<template>
    <div
        class="bg-slate-950 min-h-screen text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200"
    >
        <Hero />

        <section class="relative py-20 overflow-hidden">
            <div
                class="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style="
                    background-image: linear-gradient(
                            #334155 1px,
                            transparent 1px
                        ),
                        linear-gradient(to right, #334155 1px, transparent 1px);
                    background-size: 40px 40px;
                "
            ></div>

            <div
                class="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"
            ></div>
            <div
                class="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"
            ></div>

            <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div
                    class="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20"
                >
                    <div class="w-full lg:w-2/3">
                        <TimeLine />
                    </div>

                    <div
                        class="w-full lg:w-1/3 flex justify-center lg:justify-end"
                    >
                        <div class="relative group">
                            <div
                                class="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"
                            ></div>

                            <div
                                class="relative rounded-2xl p-1 bg-slate-900 ring-1 ring-slate-700/50"
                            >
                                <img
                                    src="/me.png"
                                    alt="Hippolyte"
                                    class="rounded-xl object-cover w-64 h-64 md:w-80 md:h-80 lg:w-full lg:h-auto shadow-2xl"
                                />
                            </div>

                            <div
                                class="absolute -bottom-4 -right-4 bg-slate-800 border border-slate-700 px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
                            >
                                <div
                                    class="w-2 h-2 rounded-full bg-green-500 animate-pulse"
                                ></div>
                                <span class="text-xs font-mono text-cyan-400"
                                    >Open to work</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Projects />
    </div>
</template>
