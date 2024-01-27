<template>
  <div
    class="skill h-full"
    ref="skillRef"
    @mouseenter="animateHover(true)"
    @mouseleave="animateHover(false)"
  ></div>
</template>

<script setup lang="ts">
const props = defineProps<{
  skill: {
    id: number;
    heightClass: string;
    title: string;
    component: string;
    hoverColor: string;
    bgColor: string;
  };
  widthDivider: number;
}>();

const width = 100 / props.widthDivider + "%";

const { $gsap: gsap, $Flip: Flip } = useNuxtApp();
const gsapCtx: Ref<undefined | gsap.Context> = ref();
const skillRef = ref();
const hoverTL = gsap?.timeline({
  defaults: {},
  paused: true,
});

const animateHover = (isHovering: boolean) => {
  if (isHovering) hoverTL.play();
  else hoverTL.reverse();
};

onMounted(() => {
  gsapCtx.value = gsap.context((context) => {
    hoverTL.to(skillRef.value, {
      width: "35em",
      duration: 0.6,
    });
  });
});

onUnmounted(() => {
  gsapCtx.value?.revert();
});
</script>

<style scoped>
.skill {
  @apply bg-[v-bind(skill.bgColor)];
  @apply w-[v-bind(width)];
}
</style>
