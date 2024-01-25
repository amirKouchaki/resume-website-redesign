<template>
  <div class="w-[7.5em] rounded-md overflow-hidden">
    <Teleport to="body" :disabled="!isSkillOpen">
      <div
        class="skill bg-white text-white flex justify-center items-center text-xl"
        ref="skillRef"
        :class="[skill.heightClass, { open: isSkillOpen }]"
        @mouseenter="animateBackground(true)"
        @mouseleave="animateBackground(false)"
        @click="openSkill"
      >
        <div
          class="skill-info-wrapper flex flex-col justify-center items-center gap-3"
          ref="skillInfoWrapperRef"
        >
          <component
            :is="skill.component"
            class="text-6xl"
            :class="{ 'text-transparent': skill.id === 4 }"
          />
          <h3>{{ skill.title }}</h3>
          <!-- <p v-if="skillOpenCompleted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
          corporis, illum placeat, neque aut quaerat deleniti itaque laboriosam
          aliquam veniam autem eos nobis iste ducimus cupiditate culpa ratione
          tenetur sunt laborum harum quisquam asperiores? Vitae voluptate
          temporibus molestias, nemo aliquid alias blanditiis, provident earum
          quisquam ea rerum vero odit voluptates atque nobis, minima mollitia!
          Hic in exercitationem obcaecati maxime deleniti facilis consequuntur
          incidunt non aspernatur sint aut officia magni ex, at eum consectetur
          magnam dolorum vitae delectus unde? Harum velit nam commodi
          consectetur, itaque hic ipsa consequatur perspiciatis ipsum eveniet
          obcaecati vel voluptate ratione quidem, nihil, cupiditate nostrum rem
          reprehenderit.
        </p> -->
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "~/tailwind.config.js";
const { theme } = resolveConfig(tailwindConfig) as { theme: any };
const mainColor = theme.colors["fade-complementary"];
const { $gsap: gsap, $Flip: Flip } = useNuxtApp();
const skillRef = ref();
const skillInfoWrapperRef = ref();
const gsapCtx: Ref<undefined | gsap.Context> = ref();
const isSkillOpen = ref(false);
const skillOpenCompleted = ref(false);

const hoverTL = gsap?.timeline({
  defaults: {
    duration: 0.2,
  },

  paused: true,
});

const openTL = gsap?.timeline({
  paused: true,
  onReverseComplete: () => {
    openTL.clear();
  },
  // onComplete: () => {
  //   skillOpenCompleted.value = true;
  // },
});

const props = defineProps<{
  skill: {
    id: number;
    heightClass: string;
    title: string;
    component: string;
    hoverColor: string;
  };
}>();

onMounted(() => {
  gsapCtx.value = gsap.context((context) => {
    hoverTL.fromTo(
      skillRef.value,
      {
        background: `linear-gradient(180deg,${mainColor} 7.29%,rgba(2, 2, 2, 0.76) 45.83%,${mainColor} 90.62%)`,
      },
      {
        background: `linear-gradient(180deg,${props.skill.hoverColor} 7.29%,rgba(2, 2, 2, 0.1) 45.83%,${props.skill.hoverColor} 90.62%)`,
        duration: 0.2,
        ease: "sine.in",
      }
    );
  });
});

const openSkill = async (e: Event) => {
  if (!isSkillOpen.value) {
    const state = Flip.getState(skillRef.value, {
      props: "",
    });
    const state2 = Flip.getState(skillInfoWrapperRef.value);
    isSkillOpen.value = true;
    await nextTick();

    openTL
      .add(
        Flip.from(state, {
          duration: 0.9,
          absolute: true,
        })
      )
      .add(
        Flip.from(state2, {
          duration: 0.9,
          absolute: true,
        }),
        0.3
      )
      // .fromTo(
      //   ".open.skill",
      //   {
      //     background: `linear-gradient(180deg,${props.skill.hoverColor} 7.29%,rgba(2, 2, 2, 0.1) 45.83%,${props.skill.hoverColor} 90.62%)`,
      //   },
      //   {
      //     background: `linear-gradient(180deg,${"black"} 7.29%,${"black"} 45.83%,${"black"} 90.62%)`,
      //     opacity: 1,
      //     duration: 0.5,
      //   },
      //   0.3
      // )
      .play();
  }
};

const closeSkill = () => {};

const animateBackground = (hovering: boolean) => {
  if (!isSkillOpen.value) {
    if (hovering) hoverTL.play();
    else hoverTL.reverse();
  }
};

onUnmounted(() => {
  gsapCtx.value?.revert();
});
</script>

<style scoped>
.skill {
  background: linear-gradient(
    180deg,
    v-bind(mainColor) 7.29%,
    rgba(2, 2, 2, 0.76) 45.83%,
    v-bind(mainColor) 90.62%
  );
}

.open {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: block;
}

.open .skill-info-wrapper {
  display: block;
}
</style>
