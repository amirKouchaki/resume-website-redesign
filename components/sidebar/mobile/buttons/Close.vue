<template>
  <div>
    <div class="icon-container">
      <div class="bar right-half"></div>
      <div class="bar left-half"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $gsap: gsap } = useNuxtApp();

const tl = gsap?.timeline({ paused: true, defaults: { duration: 0.4 } });

onMounted(() => {
  tl.to(
    ".right-half",
    {
      rotate: -45,
    },
    0
  );
  tl.to(
    ".left-half",
    {
      rotate: -135,
    },
    0
  );
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
  justify-content: center;
  cursor: pointer;
}

.icon-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.bar {
  width: 100%;
  height: 4px;
  @apply bg-opposite-main;
}

.bar:first-child {
  transform: translateY(+50%);
}
.bar:last-child {
  transform: translateY(-50%);
}

.half-bar {
  @apply bg-opposite-main;
  width: 1.1em;
}
</style>
