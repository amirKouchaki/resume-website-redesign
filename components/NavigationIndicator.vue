<template>
  <div
    class="fixed top-0 bottom-0 left-0 flex justify-center items-center py-10 px-5 z-[4]"
  >
    <ul class="flex flex-col gap-5">
      <li v-for="(i, index) in pageCount" :key="i">
        <EmptyDiamond class="text-transparent navigation-indicator" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "~/tailwind.config.js";
import EmptyDiamond from "~/assets/svgs/empty-diamond.svg";

defineProps({
  pageCount: {
    required: true,
    type: Number,
  },
});

const { $gsap: gsap } = useNuxtApp();
const { theme } = resolveConfig(tailwindConfig) as { theme: any };
const NavigationIndicators = ref([]);

const ctx: Ref<gsap.Context | undefined> = ref();

const animateNavigationIndicator = (
  goingToPageIndex: number,
  duration: number = 1.25
) => {
  ctx.value?.animateNavigationIndicator(
    NavigationIndicators.value.filter((_, index) => index > goingToPageIndex),
    theme.colors.transparent,
    duration
  );

  ctx.value?.animateNavigationIndicator(
    NavigationIndicators.value.filter((_, index) => index <= goingToPageIndex),
    theme.colors["opposite-main"],
    duration
  );
};

onMounted(() => {
  NavigationIndicators.value = gsap.utils.toArray(".navigation-indicator");

  ctx.value = gsap.context((context) => {
    context.add(
      "animateNavigationIndicator",
      (NavigationIndicators: any | any[], color: string, duration: number) => {
        const a = [];
        if (NavigationIndicators && NavigationIndicators.length !== 0)
          gsap.to(NavigationIndicators, {
            color: color,
            duration: duration,
          });
      }
    );
  });
});

onUnmounted(() => {
  ctx.value?.revert();
});

defineExpose({
  animateNavigationIndicator,
});
</script>

<style scoped></style>
