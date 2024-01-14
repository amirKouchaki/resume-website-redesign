<template>
  <div
    class="mobile-sidebar-bg fixed top-0 bottom-0 right-0 w-0 lg:hidden block"
  >
    <div class="absolute inset-0 grid place-items-center whitespace-nowrap">
      <SidebarLinks
        :text-color="currPage.secondaryColor"
        @close="switchSidebarStatus"
        ref="sidebarLinksRef"
      />
    </div>
  </div>
  <div
    class="mobile-sidebar lg:hidden relative w-[36px] h-[28px]"
    @click="switchSidebarStatus"
  >
    <Icon
      name="heroicons:bars-2-16-solid"
      :color="
        sidebarIsOpen ? currPage.secondaryColor : theme.colors['opposite-main']
      "
      size="30"
      class="cursor-pointer transition-colors"
    />
  </div>
</template>

<script setup lang="ts">
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "~/tailwind.config.js";
const { theme } = resolveConfig(tailwindConfig) as { theme: any };
import type { SidebarLinks } from "#build/components";

const { $gsap: gsap } = useNuxtApp();
const pages = usePages();
const route = useRoute();

const currPage = computed(() => {
  const currPageVar = pages.value.find((page) => {
    return page.id === route.query.page;
  });
  return currPageVar ?? pages.value[0];
});

const currPageMainColor = computed(() => {
  return currPage.value.mainColor;
});

const sidebarLinksRef: Ref<InstanceType<typeof SidebarLinks> | undefined> =
  ref();

const gsapCtx: Ref<undefined | gsap.Context> = ref();

const openMobileSidebarTL = gsap?.timeline({
  defaults: {
    ease: "sine.inOut",
  },
  paused: true,
  onComplete: () => {
    sidebarIsOpen.value = true;
  },
  onReverseComplete: () => {
    sidebarIsOpen.value = false;
  },
});

const sidebarIsOpen = useState("sidebarIsOpen", () => false);

const switchSidebarStatus = () => {
  if (!sidebarIsOpen.value) {
    openMobileSidebar();
  } else {
    closeMobileSidebar();
  }
};

const openMobileSidebar = () => {
  if (sidebarLinksRef.value) {
    openMobileSidebarTL
      .clear()

      .to(".mobile-sidebar-bg", {
        duration: 0.5,
        width: "100%",
      })
      .add(sidebarLinksRef.value.animationTL.play(), "-=0.4")
      .play();
  }
};

const closeMobileSidebar = () => {
  openMobileSidebarTL.reverse();
};
</script>

<style>
.mobile-sidebar-bg {
  background-color: v-bind(currPageMainColor);
}
</style>
