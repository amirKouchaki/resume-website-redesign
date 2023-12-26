<template>
  <main>
    <header
      class="fixed-heading top-0 fixed px-10 py-6 flex justify-between items-center w-full"
    >
      <h2 class="email bg-red-400 text-opposite-main text-[1.1rem]">
        amirkouchaki1@gmail.com
      </h2>
    </header>
    <slot></slot>
  </main>
</template>

<script setup lang="ts">
const { $gsap: gsap } = useNuxtApp();
const fadeLayout = useState("fadeLayout");

watch(fadeLayout, (newVal) => {
  if (newVal) {
    gsap.to(".email", {
      autoAlpha: 1,
      duration: 1,
    });
    useState("fadeLayout", () => false);
  }
});
</script>

<style scoped></style>
