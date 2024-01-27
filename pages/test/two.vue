<template>
  <div class="skills fixed inset-0 flex">
    <div class="skill z-[1] bg-[#1f2630]" @mouseenter="animate(1, true)">
      <img src="/assets/images/shoe-2.png" alt="" class="rotate-12" />
    </div>
    <div class="skill z-[2] bg-[#871a19]" @mouseenter="animate(2, true)">
      <img src="/assets/images/shoe-1.png" class="rotate-12" alt="" />
    </div>
    <div class="skill z-[3] bg-[#414040]" @mouseenter="animate(3, true)">
      <img src="/assets/images/shoe-3.png" class="rotate-12" alt="" />
    </div>
    <div class="skill z-[4] bg-[#3faad1]" @mouseenter="animate(4, true)">
      <img src="/assets/images/shoe-6.png" class="rotate-12" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const skills: Ref<undefined | Array<HTMLElement>> = ref([]);
const skillWidth = computed(() => {
  if (process.client) return (innerWidth * 5) / 14 + "px";
});

console.log(skillWidth.value);
const { $gsap: gsap } = useNuxtApp();
const hoverTL = gsap?.timeline({
  defaults: {},
  paused: true,
});

const openTL = gsap?.timeline({
  defaults: { duration: 3, ease: "power1.in" },
  paused: true,
});
const openTL2 = gsap?.timeline({
  defaults: { duration: 3, ease: "power1.in" },
  paused: true,
});

const openTL3 = gsap?.timeline({
  defaults: { duration: 3, ease: "power1.in" },
  paused: true,
});
const openTL4 = gsap?.timeline({
  defaults: { duration: 3, ease: "power1.in" },
  paused: true,
});

const resetTL = gsap?.timeline({
  defaults: { duration: 3, ease: "power1.in" },
  paused: true,
});

const animate = (index: number, isHovering: boolean) => {
  if (skills.value) {
    if (isHovering) {
      if (index === 1) {
        gsap
          .timeline({
            defaults: { duration: 1.3, delay: 0.1 },
          })
          .to(
            skills.value[0],
            {
              x: "0%",
            },
            0
          )
          .to(
            skills.value[1],
            {
              x: "0%",
            },
            0
          )
          .to(
            skills.value[2],
            {
              x: "-30%",
            },
            0
          )
          .to(
            skills.value[3],
            {
              x: "-65%",
            },
            0
          );
      } else if (index === 2) {
        gsap
          .timeline({
            defaults: { duration: 1.3, delay: 0.1 },
          })
          .to(
            skills.value[0],
            {
              x: "-15%",
            },
            0
          )
          .to(
            skills.value[1],
            {
              x: "-35%",
            },
            0
          )

          .to(
            skills.value[2],
            {
              x: "-35%",
            },
            0
          )
          .to(
            skills.value[3],
            {
              x: "-72%",
            },
            0
          );
      } else if (index === 3) {
        gsap
          .timeline({
            defaults: { duration: 1.3, delay: 0.1 },
          })
          .to(
            skills.value[0],
            {
              x: "-17%",
            },
            0
          )
          .to(
            skills.value[1],
            {
              x: "-50%",
            },
            0
          )
          .to(
            skills.value[2],
            {
              x: "-75%",
            },
            0
          )
          .to(
            skills.value[3],
            {
              x: "-76%",
            },
            0
          );
      } else if (index === 4) {
        gsap
          .timeline({
            defaults: { duration: 1.3, delay: 0.1 },
          })
          .to(
            skills.value[0],
            {
              x: "-19%",
            },
            0
          )
          .to(
            skills.value[1],
            {
              x: "-55%",
            },
            0
          )
          .to(
            skills.value[2],
            {
              x: "-90%",
            },
            0
          )
          .to(
            skills.value[3],
            {
              x: "-120%",
            },
            0
          );
      }
    } else {
      // gsap
      //   .timeline({
      //     defaults: { duration: 0.6, ease: "sine.inOut" },
      //   })
      //   .to(
      //     skills.value[0],
      //     {
      //       x: "0",
      //     },
      //     0
      //   )
      //   .to(
      //     skills.value[1],
      //     {
      //       x: "-30%",
      //     },
      //     0
      //   )
      //   .to(
      //     skills.value[2],
      //     {
      //       x: "-60%",
      //     },
      //     0
      //   )
      //   .to(
      //     skills.value[3],
      //     {
      //       x: "-90%",
      //     },
      //     0
      //   );
    }
  }
};

onMounted(() => {
  skills.value = gsap.utils.toArray(".skill");

  hoverTL
    .to(
      skills.value[1],
      {
        x: "0%",
      },
      0
    )
    .to(
      skills.value[2],
      {
        x: "+=15%",
      },
      0
    )
    .to(
      skills.value[3],
      {
        x: "-80%",
      },
      0
    );

  openTL
    .to(
      skills.value[0],
      {
        x: "0%",
      },
      0
    )
    .to(
      skills.value[1],
      {
        x: "0%",
      },
      0
    )
    .to(
      skills.value[2],
      {
        x: "-40%",
      },
      0
    )
    .to(
      skills.value[3],
      {
        x: "-80%",
      },
      0
    );

  openTL2
    .to(skills.value[1], {
      x: "-45%",
    })
    .to(
      skills.value[0],
      {
        x: "-15%",
      },
      0
    )
    .to(
      skills.value[2],
      {
        x: "-45%",
      },
      0
    )
    .to(
      skills.value[3],
      {
        x: "-85%",
      },
      0
    );
});
</script>

<style scoped>
.skill {
  min-width: v-bind(skillWidth);

  @apply relative h-full grid items-center px-2;
  @apply [&:nth-child(2)]:-translate-x-[30%];
  @apply [&:nth-child(3)]:-translate-x-[60%];
  @apply [&:nth-child(4)]:-translate-x-[90%];
  /* @apply [&:not(:first-child)]:translate-x-1/2     last:-translate-x-[150%]; */
}
</style>
