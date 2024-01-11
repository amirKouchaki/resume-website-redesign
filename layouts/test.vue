<template>
  <div :onmousemove="sidebar()">
    <header
      class="fixed-heading top-0 fixed px-10 py-6 flex justify-between items-center w-full"
    >
      <h2 class="email text-opposite-main text-[1.1rem] invisible">
        amirkouchaki1@gmail.com
      </h2>
    </header>
    <div class="fixed right-0 sidebar z-10 overflow-hidden cursor-pointer">
      <div @click="openSidebar()">
        <Icon
          name="uil:bars"
          size="30"
          color="white"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 invisible sidebar-icon z-0"
        />
      </div>
      <svg
        width="70"
        height="475"
        viewBox="0 0 52 475"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="wave-icon"
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
      <svg
        width="70"
        height="475"
        viewBox="0 0 52 475"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="wave-icon-open hidden invisible"
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

      <div @click="closeSidebar()">
        <Icon
          name="mingcute:close-line"
          size="40"
          color="black"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 invisible sidebar-close-icon"
        />
      </div>
    </div>

    <!-- <div class="fixed inset-0 z-50 bg-blue-200 sf">
      <button class="block" @click="animation.play()">clickme</button>
      <button class="block" @click="animation.reverse()">reverse</button>
    </div> -->
    <slot></slot>
  </div>

  <div class="fixed inset-0">
    <!-- <svg
      width="671"
      height="1080"
      viewBox="0 0 671 1082"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="hello"
    >
      <path
        d="M1.1579 182C1.1579 276 1.1579 406 1.15784 427.5C1.15778 449 1.1579 504 1.1579 587C1.1579 689 1.1579 787 1.1579 787C1.1579 787 1.1579 836.5 1.1579 937C1.1579 1037.5 1.15767 984 1.15776 1080L1.1579 0V182Z"
        stroke="#006466"
        fill="#006466"
      />
    </svg> -->
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1920 1080"
      fill="none"
      class="hello"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M1920 -8.2016e-05V1078.22C1920 1078.22 1920 1079.5 1920 1078.5C1920 1077.5 1920 1077.5 1920 1074.5C1920 1071.5 1920 888 1920 773.5C1920 682.241 1920 597 1920 536C1920 475 1920 397.318 1920 334C1920 268 1920 34.4999 1920 -8.2016e-05C1920 -49.5 1920 -8.2016e-05 1920 -8.2016e-05Z"
        fill="black"
        stroke="black"
      />
    </svg>

    <!-- <svg
      width="100%"
      height="100%"
      viewBox="0 0 1920 1080"
      fill="black"
      class="hello"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M 1920 0V 1080C 1923.223 1079.5      1643.6776 1079.5      1637.72267 1079.5C 1640.639 1075.51      1636.08603 1072.39      1634.64393 1065.4C 1620.5046 958.065      1704.0844 848.543      1741.501 742.5C 1754.343 654.145      1761.92 583.401      1776.501 523.5C 1791.081 463.599      1889.013 368.897      1881.723 306C 1874.085 240.108      1652.2769 38      1673.7769 0C 1801.113 0.000426544      1923.223 0      1920 0Z"
        fill="black"
        stroke="black"
      />
    </svg> -->
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";

const { $gsap: gsap } = useNuxtApp();
const fadeLayout = useState("fadeLayout");
const animation: Ref<undefined | GSAPTimeline> = ref();

const { x, y, sourceType } = useMouse();

const yTo = ref();

const sidebarIsOpen = ref(false);
const sidebarOptionOpen = ref(true);
const isAnimating = ref(false);
const reversed = ref(false);

const tl: Ref<undefined | GSAPTimeline> = ref();

const openSidebar = async () => {
  sidebarIsOpen.value = true;
  await nextTick();
  tl.value?.play();
  animation.value?.reverse();
};

const closeSidebar = async () => {
  tl.value?.reverse();
  animation.value?.reverse();
};

onMounted(() => {
  animation.value = gsap
    .timeline({
      defaults: {
        ease: "sine.inOut",
        duration: 0.2,
      },
      onReverseComplete: () => {
        if (sidebarIsOpen.value) {
          console.log("hello");
          gsap.set(".wave-icon", {
            display: "none",
          });

          gsap.set(".wave-icon-open", {
            display: "block",
            autoAlpha: 1,
          });

          gsap.set(".sidebar", {
            y: innerHeight / 2,
          });

          gsap.to(".wave-icon-open path", {
            attr: {
              d: "M70 0 V 474 C 70 474 1.02 372 1.01855 245.5C 1.01711 119 70 1 70 1Z",
            },
            duration: 0.2,
          });
          gsap.to(
            ".sidebar-close-icon",
            // {
            //   xPercent: 100,
            // },
            {
              autoAlpha: 1,
              duration: 0.2,
              // xPercent: -50,
            }
          );
        }
      },
      // paused: true,
    })

    .to(".sidebar .wave-icon path", {
      attr: {
        d: "M70 0 V 474 C 70 474 1.02 372 1.01855 245.5C 1.01711 119 70 1 70 1Z",
      },
    })
    .to(
      ".sidebar-icon",
      // {
      //   xPercent: 100,
      // },
      {
        autoAlpha: 1,

        // xPercent: -50,
      },
      0.1
    );

  yTo.value = gsap.quickTo(".sidebar", "y", {
    duration: 0.2,
    ease: "sineInOut",
    // stagger: 0.2,
  });

  tl.value = gsap
    .timeline({
      defaults: {
        ease: "none",
        duration: 0.4,
      },
      paused: true,
    })
    .to(".hello path", {
      attr: {
        d: " M 1920 0V 1080C 1923.223 1079.5      1643.6776 1079.5      1637.72267 1079.5C 1640.639 1075.51      1636.08603 1072.39      1634.64393 1065.4C 1620.5046 958.065      1704.0844 848.543      1741.501 742.5C 1754.343 654.145      1761.92 583.401      1776.501 523.5C 1791.081 463.599      1889.013 368.897      1881.723 306C 1874.085 240.108      1652.2769 38      1673.7769 0C 1801.113 0.000426544      1923.223 0      1920 0Z",
      },
      duration: 0.1,
    })
    .to(".hello path", {
      attr: {
        d: "M1920 0.5V 1080C 1920 1080      233 1079.5       227 1079.5C 230 1075.51      225 1072.39       224.36708 1065.4C 193 958.065      293 848.543       321.224 742.5C 344 654.145      351 583.401       366.224 523.5C 380 463.599      478 368.897       471.446 306C 463 240.108      242 38       263.5 0C 390 0.000426544      1920 0.5       1920 0.5Z",
      },
      duration: 0.6,
    })
    .to(".hello path", {
      attr: {
        d: " M1920 0V1080C1920 1080 3.99971 1080 -0.000455641 1080C-0.0005342 1076.5 -0.000481301 1072 -0.00018289 1065C0.00454053 954.2 -0.000162862 857 -0.00048139 754.5C-0.000764987 663.24 0.660504 608.947 0.660974 543.974C0.661443 479 -0.000840356 399.974 -0.000477575 336.974C-0.000100399 271.474 0.000164511 40 0 0C127.337 0.000426544 1920 0 1920 0Z",
      },
      duration: 0.3,
    });
});

const sidebar = async () => {
  // if (!isAnimating.value) {

  if (process.client && !sidebarIsOpen.value) {
    // gsap.timelien
    // .to(".sidebar path", {
    //   attr: {
    //     d: "M50.513 0 V474C50.513 474 1.02 372 1.01855 245.5C1.01711 119 50.513 1 50.513 1Z",
    //   },
    // });

    // const tl = anime({
    //   targets: ".sidebar path",
    //   duration: 2000,
    //   d: {
    //     value:
    //       "M50.513 0 V474C50.513 474 1.02 372 1.01855 245.5C1.01711 119 50.513 1 50.513 1Z",
    //   },
    // });
    // if (!isAnimating.value) {
    if (x.value > (innerWidth / 100) * 93) {
      // if (!isAnimating.value) {

      isAnimating.value = true;
      // await nextTick();
      // console.log("here too");
      yTo.value(y.value);
      animation.value?.play();

      // }
    } else if (sidebarOptionOpen.value) {
      reversed.value = true;
      console.log("reversed");
      animation.value?.reverse();
    }
    // }
  }
};
// };
watch(fadeLayout, (newVal) => {
  if (newVal) {
    gsap.to(".email", {
      autoAlpha: 1,
      duration: 1,
    });
    useState("fadeLayout", () => false);
  }
});
</script>

<style scoped>
.sidebar {
  transform: translateY(-50%);
}
</style>
