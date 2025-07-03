<template>
    <section id="projects" class="projects-section">
        <UContainer class="flex flex-col items-center text-center py-20">
            <h2 class="text-3xl font-bold">
                Mes Projets
            </h2>
            <p class="text-lg text-gray-600 mt-2">
                Voici quelques-uns des projets sur lesquels j'ai travaillé.
            </p>

            <ProjectsCarousel />
        </UContainer>
    </section>
</template>

<style scoped>
.projects-section {
    background: linear-gradient(to right, #f3f4f6, #e5e7eb);
    color: #1f2937;
}
</style>