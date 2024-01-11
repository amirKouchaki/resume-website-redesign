<template>
  <div class="hidden lg:block">
    <div class="desktop-sidebar fixed right-0 z-10">
      <div class="closed-sidebar-wrapper">
        <div @click="openSidebar">
          <Icon
            name="uil:bars"
            size="30"
            color="white"
            class="open-sidebar-icon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 invisible z-0"
          />
        </div>
        <svg
          width="70"
          height="475"
          viewBox="0 0 52 475"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="open-sidebar-wave"
        >
          <path
            d="M 70 0
          V 473
          C 70 473 70 372.5 70 246
          C 70 119.5 70 0 70 0
          Z"
            fill="black"
            stroke="black"
          />
        </svg>
      </div>
      <div class="opened-sidebar-wrapper hidden">
        <svg
          width="70"
          height="475"
          viewBox="0 0 52 475"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="close-sidebar-wave"
        >
          <path
            d="M 70 0
          V 473
          C 70 473 70 372.5 70 246
          C 70 119.5 70 0 70 0
          Z"
            fill="white"
            stroke="white"
          />
        </svg>

        <div @click="closeSidebar" class="close-sidebar-wave-wrapper">
          <Icon
            name="mingcute:close-line"
            size="30"
            color="black"
            class="close-sidebar-icon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 invisible"
          />
        </div>
      </div>
    </div>
  </div>
  <div
    class="fixed inset-0 sidebar-page-fill-wrapper"
    v-show="sidebarIsOpen"
    :class="{ 'pointer-events-none z-10': !sidebarIsOpen }"
  >
    <div class="absolute inset-0 grid place-items-center">
      <SidebarLinks @close="closeSidebar" ref="sidebarLinksRef" />
    </div>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1920 1080"
      fill="none"
      class="sidebar-page-fill-svg"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M1920 -8.2016e-05V1078.22C1920 1078.22 1920 1079.5 1920 1078.5C1920 1077.5 1920 1077.5 1920 1074.5C1920 1071.5 1920 888 1920 773.5C1920 682.241 1920 597 1920 536C1920 475 1920 397.318 1920 334C1920 268 1920 34.4999 1920 -8.2016e-05C1920 -49.5 1920 -8.2016e-05 1920 -8.2016e-05Z"
        fill="black"
        stroke="black"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { SidebarLinks } from "#build/components";

const { $gsap: gsap } = useNuxtApp();

const { x, y } = useMouse();

const sidebarLinksRef: Ref<InstanceType<typeof SidebarLinks> | undefined> =
  ref();

const gsapCtx: Ref<undefined | gsap.Context> = ref();
const showSidebarIndicatorTL = gsap?.timeline({
  defaults: {
    ease: "sine.inOut",
    duration: 0.3,
  },
  paused: true,
});

const openSidebarTL = gsap?.timeline({
  defaults: {
    ease: "none",
    duration: 0.2,
  },
  paused: true,
});

const switchSidebarStatusTL = gsap?.timeline({
  paused: true,
  onStart: () => {
    showSidebarIndicatorTL.reverse();
  },
  onReverseComplete: () => {
    sidebarIsOpen.value = false;
    switchSidebarStatusTL.clear();
  },
});

const svgMorphPageFillTL = gsap?.timeline({
  defaults: {
    ease: "none",
    duration: 0.4,
  },
  paused: true,
});

const goToY: Ref<gsap.QuickToFunc | Function> = ref(() => {});
const sidebarIsOpen = ref(false);

const openSidebar = async () => {
  if (!sidebarIsOpen.value) {
    sidebarIsOpen.value = true;
    switchSidebarStatusTL
      .add(svgMorphPageFillTL.play())
      .add(openSidebarTL.play(), svgMorphPageFillTL.totalDuration() / 2)
      // .add(
      //   gsapCtx.value?.showLinks(),
      //   "+=" + svgMorphPageFillTL.totalDuration()
      // )
      .play();
  }
  // gsapCtx.value?.switchSidebarStatus(true);
};

const closeSidebar = () => {
  // sidebarIsOpen.value = false;
  switchSidebarStatusTL.reverse();
};

onMounted(() => {
  gsapCtx.value = gsap.context((context) => {
    openSidebarTL
      .set(".closed-sidebar-wrapper", {
        display: "none",
      })
      .set(".opened-sidebar-wrapper", {
        display: "block",
      })
      .set(".desktop-sidebar", {
        y: innerHeight / 2,
      })
      .to(".close-sidebar-wave path", {
        attr: {
          d: "M70 0 V 474 C 70 474 1.02 372 1.01855 245.5C 1.01711 119 70 1 70 1Z",
        },
        duration: 0.2,
      })
      .to(".close-sidebar-icon", {
        autoAlpha: 1,
        duration: 0.2,
      });

    showSidebarIndicatorTL
      .to(".open-sidebar-wave path", {
        attr: {
          d: "M70 0 V 474 C 70 474 1.02 372 1.01855 245.5C 1.01711 119 70 1 70 1Z",
        },
      })
      .to(
        ".open-sidebar-icon",
        {
          autoAlpha: 1,
        },
        0.15
      );
    if (sidebarLinksRef.value) {
      svgMorphPageFillTL
        .set(".sidebar-page-fill-wrapper", {
          zIndex: 9,
        })
        .to(".sidebar-page-fill-svg path", {
          attr: {
            d: " M 1920 0V 1080C 1923.223 1079.5      1643.6776 1079.5      1637.72267 1079.5C 1640.639 1075.51      1636.08603 1072.39      1634.64393 1065.4C 1620.5046 958.065      1704.0844 848.543      1741.501 742.5C 1754.343 654.145      1761.92 583.401      1776.501 523.5C 1791.081 463.599      1889.013 368.897      1881.723 306C 1874.085 240.108      1652.2769 38      1673.7769 0C 1801.113 0.000426544      1923.223 0      1920 0Z",
          },
          duration: 0.1,
        })
        .to(".sidebar-page-fill-svg path", {
          attr: {
            d: "M1920 0.5V 1080C 1920 1080      233 1079.5       227 1079.5C 230 1075.51      225 1072.39       224.36708 1065.4C 193 958.065      293 848.543       321.224 742.5C 344 654.145      351 583.401       366.224 523.5C 380 463.599      478 368.897       471.446 306C 463 240.108      242 38       263.5 0C 390 0.000426544      1920 0.5       1920 0.5Z",
          },
          duration: 0.6,
        })
        .to(".sidebar-page-fill-svg path", {
          attr: {
            d: " M1920 0V1080C1920 1080 3.99971 1080 -0.000455641 1080C-0.0005342 1076.5 -0.000481301 1072 -0.00018289 1065C0.00454053 954.2 -0.000162862 857 -0.00048139 754.5C-0.000764987 663.24 0.660504 608.947 0.660974 543.974C0.661443 479 -0.000840356 399.974 -0.000477575 336.974C-0.000100399 271.474 0.000164511 40 0 0C127.337 0.000426544 1920 0 1920 0Z",
          },
          duration: 0.2,
        })
        .add(
          sidebarLinksRef.value.animationTL.play(),
          (svgMorphPageFillTL.totalDuration() / 3) * 2
        );

      goToY.value = gsap.quickTo(".desktop-sidebar", "y", {
        duration: 0.1,
        ease: "sineInOut",
      });
    }
  });
});

onUnmounted(() => {
  gsapCtx.value?.revert();
});

watch([x, y], () => {
  if (!sidebarIsOpen.value) {
    if (x.value > (innerWidth / 100) * 93) {
      showSidebarIndicatorTL.play();
    } else {
      showSidebarIndicatorTL.reverse();
    }
    goToY.value(y.value);
  }
});
</script>

<style scoped>
.desktop-sidebar {
  transform: translateY(-50%);
}
</style>
