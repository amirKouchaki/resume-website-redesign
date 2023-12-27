<template>
  <div class="main-div h-[100vh]">
    <Teleport to="body">
      <section
        class="navigation-helper fixed top-0 bottom-0 left-0 flex justify-center items-center py-10 px-5 z-10"
      >
        <ul class="flex flex-col gap-5">
          <li v-for="(i, index) in 3" :key="i">
            <EmptyDiamond
              class="navigator-helper-svg text-transparent"
              :id="index"
            />
          </li>
        </ul>
      </section>
    </Teleport>

    <section class="page-section w-full h-full fixed top-0" id="page-1">
      <div class="outer w-full h-full overflow-y-hidden">
        <div
          class="inner w-full h-full grid place-items-center overflow-y-hidden bg-main"
        >
          <h1 class="text-9xl font-bold whitespace-nowrap text-white">
            Page 1
          </h1>
        </div>
      </div>
    </section>
    <section
      class="page-section w-full h-full fixed top-0 invisible"
      id="page-2"
    >
      <div class="outer w-full h-full overflow-y-hidden">
        <div
          class="inner w-full h-full grid place-items-center overflow-y-hidden bg-complementary"
        >
          <h1 class="text-9xl font-bold whitespace-nowrap text-white">
            Page 2
          </h1>
        </div>
      </div>
    </section>
    <section
      class="page-section w-full h-full fixed top-0 invisible"
      id="page-3"
    >
      <div class="outer w-full h-full overflow-y-hidden">
        <div
          class="inner w-full h-full grid place-items-center overflow-y-hidden bg-secondary"
        >
          <h1 class="text-9xl font-bold whitespace-nowrap text-white">
            Page 3
          </h1>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "~/tailwind.config.js";
import EmptyDiamond from "~/assets/svgs/empty-diamond.svg";
const { $gsap: gsap, $Observer: Observer } = useNuxtApp();

const { theme } = resolveConfig(tailwindConfig) as { theme: any };

const ctx: Ref<gsap.Context | undefined> = ref();
const currentPageIndex = ref(0);
const pageSectionsRefs = ref([]);
const outerWrappers = ref([]);
const innerWrappers = ref([]);
const navigatorHelperImages = ref([]);
const wrap = ref();
const isAnimating: Ref<boolean> = ref(false);
const pageTransitionDuration = 1.25;

// const pages = ref([
//   { id: "page-1", classes: "bg-main" },
//   { id: "page-2", classes: "bg-complementary" },
//   { id: "page-3", classes: "bg-secondary" },
// ]);

enum Direction {
  Previous = -1,
  Next = 1,
}

definePageMeta({
  layout: false,
});

const previous = () => {};

const goFromSection = (curr: number, direction: Direction) => {
  isAnimating.value = true;

  // determine the next section to go to
  const nextIndex = wrap.value(curr + direction);

  const nextPageTL = gsap.timeline({
    defaults: {
      paused: false,
      duration: pageTransitionDuration,
      ease: "power1.inOut",
    },
    onComplete: () => {
      console.log("animation completed");
      currentPageIndex.value = nextIndex;
      isAnimating.value = false;
    },
  });

  nextPageTL.set(pageSectionsRefs.value[curr], { zIndex: 0 });
  nextPageTL.set(pageSectionsRefs.value[nextIndex], {
    autoAlpha: 1,
    zIndex: 1,
  });

  //the inner should remain in screen so the unraveling effect can take place but the outer with the zIndex
  //should come from off screen to show slowly the inner
  // i === 1 means if the element given the style is inner wrappers because it is the [1] in the array of targets
  nextPageTL.fromTo(
    [outerWrappers.value[nextIndex], innerWrappers.value[nextIndex]],
    { yPercent: (i) => (i === 1 ? -100 : 100) * direction },
    { yPercent: 0 },
    0
  );

  animateNavigationHelper(
    navigatorHelperImages.value.filter((_, index) => index > nextIndex),
    "transparent"
  );
  animateNavigationHelper(
    navigatorHelperImages.value.filter((_, index) => index <= nextIndex)
  );

  nextPageTL.set(pageSectionsRefs.value[curr], {
    autoAlpha: 0,
  });
};

const animateNavigationHelper = (
  targets: never[] | never,
  color = theme.colors.white
) => {
  console.log(targets);
  gsap.to(targets, {
    color: color,
    duration: pageTransitionDuration,
  });
};

onMounted(() => {
  pageSectionsRefs.value = gsap.utils.toArray(".page-section");
  outerWrappers.value = gsap.utils.toArray(".outer");
  innerWrappers.value = gsap.utils.toArray(".inner");
  navigatorHelperImages.value = gsap.utils.toArray(".navigator-helper-svg");
  wrap.value = gsap.utils.wrap(0, pageSectionsRefs.value.length);
  animateNavigationHelper(navigatorHelperImages.value[currentPageIndex.value]);
  ctx.value = gsap.context((context) => {
    Observer.create({
      target: ".main-div",
      type: "wheel,touch",
      tolerance: 30,
      onUp: () => {
        if (!isAnimating.value)
          goFromSection(currentPageIndex.value, Direction.Previous);
      },
      onDown: () => {
        if (!isAnimating.value)
          goFromSection(currentPageIndex.value, Direction.Next);
      },
      preventDefault: true,
    });
  });
});

onUnmounted(() => {
  ctx.value?.revert();
});
</script>

<style scoped>
.transform {
}

/* .navigator-helper-svg >>> .nuxt-icon--fill {
  fill: currentColor;
} */
</style>
