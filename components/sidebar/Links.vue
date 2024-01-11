<template>
  <ul class="flex flex-col gap-6">
    <li class="sidebar-nav-link invisible" v-for="page in pages" :key="page.id">
      <div class="flex items-center gap-10 justify-center lg:justify-start">
        <div class="lg:block hidden">
          <Icon
            name="octicon:dot-fill-16"
            size="20"
            :color="theme.colors['opposite-main']"
          />
        </div>
        <button
          @click.prevent="changePage(page.id)"
          href="#"
          class="nav-link text-opposite-main lg:text-6xl text-5xl"
        >
          {{ page.title }}
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "~/tailwind.config.js";
const { theme } = resolveConfig(tailwindConfig) as { theme: any };
const { $gsap: gsap } = useNuxtApp();

const emits = defineEmits(["close"]);

const pages = usePages();

const gsapCtx: Ref<gsap.Context | undefined> = ref();

const currRoute = inject("currRoute");

const changePage = (pageId: string) => {
  emits("close");
  navigateTo({ name: currRoute as string, query: { page: pageId } });
};

// const pages = ref([
//   { title: "Home" },
//   { title: "Skills" },
//   { title: "Projects" },
//   { title: "Contact Me" },
// ]);

const tl = gsap?.timeline({
  duration: 0.2,
  paused: true,
});

const hoverTL = gsap?.timeline({
  defaults: {
    duration: 0.4,
    ease: "sine.inOut",
  },
  onReverseComplete: () => {
    hoverTL.clear();
  },
  paused: true,
});

onMounted(() => {
  gsapCtx.value = gsap.context((context) => {
    tl.fromTo(
      ".sidebar-nav-link",
      {
        x: +100,
        visibility: "hidden",
        opacity: 0,
      },
      {
        x: 0,
        autoAlpha: 1,
        duration: 0.2,
        stagger: 0.07,
      }
    );
  });
});

onUnmounted(() => {
  gsapCtx.value?.revert();
});

defineExpose({
  animationTL: tl,
});
</script>

<style scoped>
.nav-link {
  position: relative;
  z-index: 0;
  transition-property: color, background-position;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 450ms;
  color: transparent;
  background: linear-gradient(
    to right,
    theme("colors.opposite-main") 0%,
    theme("colors.opposite-main") 50%,
    theme("colors.complementary") 50%,
    theme("colors.complementary") 100%
  );
  background-size: 200% 100%;
  background-position: 0;

  @apply inline-block  bg-clip-text;
  @apply py-4;
}
.nav-link::before {
  position: absolute;
  content: "";
  height: 3px;
  left: 0;
  top: 100%;
  width: 0px;
  transition-property: width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 250ms;
  @apply bg-complementary;
  z-index: 2;
}
.nav-link:hover.nav-link::before {
  width: 100% !important;
}

.nav-link:hover {
  background-position: -100% 0;
  /* @apply inline-block bg-gradient-to-r from-complementary to-complementary bg-clip-text; */
}
</style>
