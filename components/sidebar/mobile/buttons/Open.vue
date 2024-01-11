<template>
  <div>
    <div
      class="icon-container"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
    >
      <div class="icon-row upper-row">
        <div class="half-bar"></div>
        <div class="half-bar"></div>
      </div>
      <div class="icon-row middle-row"><div class="bar"></div></div>
      <div class="icon-row bottom-row">
        <div class="half-bar"></div>
        <div class="half-bar"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $gsap: gsap } = useNuxtApp();

const props = defineProps({
  isAnimating: {
    type: Boolean,
    required: true,
  },
});

const tl = gsap?.timeline({ paused: true, defaults: { duration: 0.2 } });

const onMouseenter = () => {
  tl.play();
};

const onMouseleave = () => {
  tl.reverse();
};

onMounted(() => {
  tl.to(
    ".upper-row",
    {
      opacity: 0,
      y: "+0.5em",
    },
    0
  );
  tl.to(
    ".bottom-row",
    {
      opacity: 0,
      y: "-0.5em",
    },
    0
  );
  tl.to(".middle-row", {
    rotate: 180,
  });
});

defineExpose({
  animationTL: tl,
});
</script>

<style scoped>
.icon-container {
  display: flex;
  flex-direction: column;
  width: 36px;
  height: 28px;
  gap: 0.4em;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.icon-row {
  display: flex;
  justify-content: space-between;
  height: 4px;

  width: 100%;
}

.bar {
  width: 100%;
  @apply bg-opposite-main;
}

.half-bar {
  @apply bg-opposite-main;
  width: 1em;
}
</style>
