<template>
  <div ref="mainWrapperRef" class="h-[100vh]">
    <Teleport to="body">
      <NavigationIndicator
        :page-count="pageCount"
        ref="navigationIndicatorRef"
      />
    </Teleport>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { NavigationIndicator, SectionPage } from "#build/components";
import { PageSectionClasses } from "../../enums";
import type NavigationIndicatorVue from "../NavigationIndicator.vue";

const props = defineProps({
  routeName: {
    required: true,
    type: String,
  },
});

const { $gsap: gsap, $Observer: Observer } = useNuxtApp();
const slots = useSlots();
const route = useRoute();

const pageIds: ComputedRef<string[]> = computed(() => {
  return defaultSlot.value.map((slot) => {
    return slot.props["page-id"];
  });
});

const defaultSlot = ref(slots.default ? (slots.default() as any[]) : []);
const pageCount = defaultSlot.value?.length;
const mainWrapperRef = ref();
const isAnimating = ref(false);
const ctx: Ref<gsap.Context | undefined> = ref();
const wrap = ref();
const currentPageIndex = ref(
  Math.max(
    pageIds.value.findIndex((pageId) => {
      return pageId === route.query.page;
    }),
    0
  )
);
const pageTransitionDuration = 1.25;
const pageSections = ref();
const outerWrappers = ref();
const innerWrappers = ref();
const navigationIndicatorRef:
  | Ref<InstanceType<typeof NavigationIndicator>>
  | Ref<undefined> = ref();
provide("defaultPageId", pageIds.value[currentPageIndex.value]);

enum Direction {
  Previous = -1,
  Next = 1,
}

const goFromSection = (curr: number, direction: Direction) => {
  // determine the next section to go to
  const nextIndex = wrap.value(curr + direction);
  navigateTo({
    name: props.routeName,
    query: { page: defaultSlot.value[nextIndex].props["page-id"] },
  });

  ctx.value?.scrollToPage(
    curr,
    nextIndex,
    pageTransitionDuration,
    direction,
    currentPageIndex,
    pageSections.value,
    innerWrappers.value,
    outerWrappers.value,
    isAnimating,
    navigationIndicatorRef.value
  );
};

onMounted(() => {
  pageSections.value = gsap.utils.toArray("." + PageSectionClasses.mainClass);
  outerWrappers.value = gsap.utils.toArray("." + PageSectionClasses.outerClass);
  innerWrappers.value = gsap.utils.toArray("." + PageSectionClasses.innerClass);
  wrap.value = gsap.utils.wrap(0, pageSections.value.length);

  navigationIndicatorRef.value?.animateNavigationIndicator(
    currentPageIndex.value,
    pageTransitionDuration
  );

  ctx.value = gsap.context((context) => {
    context.add(
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
        isAnimatingRef: Ref<boolean>,
        NavigationIndicator: InstanceType<typeof NavigationIndicatorVue>
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

        NavigationIndicator?.animateNavigationIndicator(to, duration);

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
