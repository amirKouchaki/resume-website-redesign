<template>
  <div ref="landingMainDiv" class="landing-main-div">
    <div class="h-[100vh] bg-main grid place-items-center">
      <Teleport to=".fixed-heading" :disabled="!teleportNameToHeader">
        <h1
          ref="mainHeading"
          class="main-heading text-9xl font-bold whitespace-nowrap"
        >
          <div class="intro-1">
            <span class="text-opposite-main">Hi</span>
          </div>
          <div class="intro-2 hidden">
            <span class="text-opposite-main">my</span>
            <span class="text-complementary"> name</span>
            <span class="text-opposite-main"> is</span>
          </div>
          <div class="intro-3 hidden" ref="intro3">
            <span class="text-opposite-main">Amir</span>
            <span class="text-complementary"> Kouchaki</span>
          </div>
        </h1>
      </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "test",
});

const { $gsap: gsap, $Flip: Flip } = useNuxtApp();

const ctx: Ref<gsap.Context | undefined> = ref();
const landingMainDiv: Ref<Element | undefined> = ref();
const mainHeading = ref();
const intro3 = ref();

const teleportNameToHeader = ref(false);

onMounted(() => {
  ctx.value = gsap.context((context) => {
    const introAnimation = gsap.timeline({});

    const flashTransitionDelays = 0.1;
    const fadeTransitionTime = 0.1;

    introAnimation.set([".intro-2", ".intro-3"], {
      autoAlpha: 0,
    });

    introAnimation.to(".intro-1", {
      autoAlpha: 0,
      duration: fadeTransitionTime,
      delay: flashTransitionDelays,
    });

    introAnimation.set(".intro-1", {
      display: "none",
    });

    introAnimation.set(".intro-2", {
      display: "block",
    });

    introAnimation.to(".intro-2", {
      autoAlpha: 1,
      duration: fadeTransitionTime,
      delay: flashTransitionDelays,
      ease: "sine.out",
    });

    introAnimation.to(".intro-2", {
      autoAlpha: 0,
      duration: fadeTransitionTime,
      delay: flashTransitionDelays,
    });

    introAnimation.set(".intro-2", {
      display: "none",
    });

    introAnimation.set(".intro-3", {
      display: "block",
    });

    introAnimation.to(".intro-3", {
      autoAlpha: 1,
      duration: fadeTransitionTime,
      delay: flashTransitionDelays,
      ease: "sine.out",
      onComplete: () => {
        const state = Flip.getState(mainHeading.value, {
          props: "fontSize",
        });

        teleportNameToHeader.value = true;
        mainHeading.value.classList.add("transformed");
        nextTick(() => {
          Flip.from(state, {
            duration: 1,
            delay: flashTransitionDelays,
            absolute: true,
            onComplete: () => {
              useState("fadeLayout", () => true);
            },
          });
        });
      },
    });
  }, landingMainDiv.value);
});

onUnmounted(() => {
  ctx.value?.revert();
});
</script>

<style scoped>
.transformed {
  font-size: 2rem;
}
</style>
