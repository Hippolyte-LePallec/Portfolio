<template>
    <Hero />
    <div class="flex flex-row justify-between items-center p-10">
        <div class="w-2/3">
            <TimeLine />
        </div>

        <div class="flex justify-center items-center w-1/3">
            <img
                src="/public/me.png"
                alt="Me"
                class="rounded-4xl object-cover"
            />
        </div>
    </div>
    <Projects />
</template>
