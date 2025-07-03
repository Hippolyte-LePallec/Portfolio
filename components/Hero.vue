<template>
    <section id="hero" class="hero-section">
        <UContainer class="flex flex-col items-center text-center py-20">
            <UAvatar
                size="3xl"
                src="/kayak.jpg"
                alt="Moi en kayak"
                class="mb-4"
            />
            <h1 class="text-4xl font-bold">
                Bonjour, je suis <span class="text-secondary">Hippolyte</span>
            </h1>
            <p class="text-lg text-gray-600 mt-2">
                Etudiant en informatique passionné par le développement
            </p>
            <p class="text-lg text-gray-600 mt-2">
                cherchant une alternance pour mettre en pratique mes
                compétences.
            </p>
        </UContainer>
    </section>
</template>

<style scoped>
.hero-section {
    background: linear-gradient(to right, #ffffff, #d1d5db);
    color: #1f2937;
}
</style>
