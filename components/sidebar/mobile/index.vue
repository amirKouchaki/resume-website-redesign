<template>
  <div
    class="mobile-sidebar-bg fixed top-0 bottom-0 right-0 bg-secondary w-0 lg:hidden block"
  >
    <div class="absolute inset-0 grid place-items-center whitespace-nowrap">
      <SidebarLinks @close="switchSidebarStatus" ref="sidebarLinksRef" />
    </div>
  </div>
  <div
    class="mobile-sidebar lg:hidden relative w-[36px] h-[28px]"
    @click="switchSidebarStatus"
  >
    <!-- <SidebarMobileButtonsOpen
      :isAnimating="isAnimatingMobileSidebar"
      ref="openSidebarButtonRef"
      @click="openMobileSidebar"
      class="mobile-sidebar-open-icon absolute inset-0"
    />
    <SidebarMobileButtonsClose
      ref="closeSidebarButtonRef"
      @click="closeMobileSidebar"
      class="mobile-sidebar-close-icon invisible absolute inset-0"
    /> -->
    <Icon
      name="heroicons:bars-2-16-solid"
      :color="theme.colors['opposite-main']"
      size="30"
      class="cursor-pointer"
    />
  </div>
</template>

<script setup lang="ts">
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "~/tailwind.config.js";
const { theme } = resolveConfig(tailwindConfig) as { theme: any };
import type { SidebarLinks } from "#build/components";
import type SidebarMobileButtonsClose from "../mobile/buttons/Close.vue";

const { $gsap: gsap } = useNuxtApp();

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

const sidebarIsOpen = ref(false);

const switchSidebarStatus = () => {
  if (!sidebarIsOpen.value) {
    openMobileSidebar();
  } else {
    closeMobileSidebar();
  }
};

const openMobileSidebar = () => {
  if (sidebarLinksRef.value) {
    // openSidebarButtonRef.value?.animationTL.progress(1);
    openMobileSidebarTL
      .clear()
      // .to(
      //   ".mobile-sidebar-open-icon",
      //   {
      //     duration: 0.07,
      //     autoAlpha: 0,
      //   },
      //   0
      // )
      // .to(
      //   ".mobile-sidebar-close-icon",
      //   {
      //     autoAlpha: 1,
      //     duration: 0.07,
      //   },
      //   0
      // )
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

<style scoped>
.desktop-sidebar {
  transform: translateY(-50%);
}
</style>
