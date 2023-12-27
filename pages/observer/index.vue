<template>
  <div ref="mainWrapperRef" class="h-[100vh]">
    <SectionPage
      page-id="page-1"
      :visible="true"
      inner-class="bg-main grid place-items-center"
    >
      <h1 class="text-9xl font-bold whitespace-nowrap text-white">Page 1</h1>
    </SectionPage>
    <SectionPage
      page-id="page-2"
      :visible="false"
      inner-class="bg-complementary grid place-items-center"
    >
      <h1 class="text-9xl font-bold whitespace-nowrap text-white">Page 2</h1>
    </SectionPage>
    <SectionPage
      page-id="page-3"
      :visible="false"
      inner-class="bg-secondary grid place-items-center"
    >
      <h1 class="text-9xl font-bold whitespace-nowrap text-white">Page 3</h1>
    </SectionPage>
  </div>
</template>

<script setup lang="ts">
import { PageSectionClasses } from "../../enums";

const mainWrapperRef = ref();
const isAnimating = ref(false);
const ctx: Ref<gsap.Context | undefined> = ref();
const wrap = ref();
const currentPageIndex = ref(0);
const { $gsap: gsap, $Observer: Observer } = useNuxtApp();
const pageTransitionDuration = 1.25;
const pageSections = ref();
const outerWrappers = ref();
const innerWrappers = ref();

definePageMeta({
  layout: false,
});

enum Direction {
  Previous = -1,
  Next = 1,
}

const goFromSection = (curr: number, direction: Direction) => {
  // determine the next section to go to
  const nextIndex = wrap.value(curr + direction);
  ctx.value?.scrollToPage(
    curr,
    nextIndex,
    pageTransitionDuration,
    direction,
    currentPageIndex,
    pageSections.value,
    innerWrappers.value,
    outerWrappers.value,
    isAnimating
  );
};

onMounted(() => {
  pageSections.value = gsap.utils.toArray("." + PageSectionClasses.mainClass);
  outerWrappers.value = gsap.utils.toArray("." + PageSectionClasses.outerClass);
  innerWrappers.value = gsap.utils.toArray("." + PageSectionClasses.innerClass);
  wrap.value = gsap.utils.wrap(0, pageSections.value.length);

  ctx.value = gsap.context((self) => {
    self.add(
      "scrollToPage",
      (
        from: number,
        to: number,
        duration: number,
        direction: Direction,
        currIndexRef: Ref<number>,
        pages: any[],
        pagesInners: any[],
        pagesOuters: any[],
        isAnimatingRef: Ref<boolean>
      ) => {
        const nextPageTL = gsap.timeline({
          defaults: {
            paused: false,
            duration,
            ease: "power1.inOut",
          },
          onStart: () => {
            isAnimatingRef.value = true;
          },
          onComplete: () => {
            currIndexRef.value = to;
            isAnimatingRef.value = false;
          },
        });

        nextPageTL.set(pages[from], { zIndex: 0 });
        nextPageTL.set(pages[to], {
          autoAlpha: 1,
          zIndex: 1,
        });

        //the inner should remain in screen so the unraveling effect can take place but the outer with the zIndex
        //should come from off screen to show slowly the inner
        // i === 1 means if the element given the style is inner wrappers because it is the [1] in the array of targets
        nextPageTL.fromTo(
          [pagesOuters[to], pagesInners[to]],
          { yPercent: (i) => (i === 1 ? -100 : 100) * direction },
          { yPercent: 0 },
          0
        );

        // animateNavigationHelper(
        //   navigatorHelperImages.value.filter((_, index) => index > to),
        //   "transparent"
        // );
        // animateNavigationHelper(
        //   navigatorHelperImages.value.filter((_, index) => index <= to)
        // );

        nextPageTL.set(pages[from], {
          autoAlpha: 0,
        });
      }
    );

    Observer.create({
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
  }, mainWrapperRef.value);
});

onUnmounted(() => {
  ctx.value?.revert();
});
</script>

<style scoped></style>
