<template>
  <SectionPageWrapper route-name="skill-test">
    <SectionPage
      :page-id="pages[0].id"
      inner-class="bg-main grid place-items-center"
    >
      <h1 class="lg:text-9xl text-7xl font-bold text-center text-white">
        {{ pages[0].title }}
      </h1>
    </SectionPage>
    <SectionPage
      :page-id="pages[1].id"
      inner-class="bg-secondary grid place-items-center"
    >
      <div class="skills flex flex-row gap-8 items-center">
        <Skill v-for="skill in skills" :key="skill.id" :skill="skill" />
      </div>
    </SectionPage>
    <SectionPage
      :page-id="pages[2].id"
      inner-class="bg-slate-800 grid place-items-center"
    >
      <h1 class="lg:text-9xl text-7xl font-bold text-center text-blue-500">
        {{ pages[2].title }}
      </h1>
    </SectionPage>
    <SectionPage
      :page-id="pages[3].id"
      inner-class="bg-emerald-800 grid place-items-center"
    >
      <h1 class="lg:text-9xl text-7xl font-bold text-center text-white">
        {{ pages[3].title }}
      </h1>
    </SectionPage>
  </SectionPageWrapper>
</template>

<script setup lang="ts">
import IconLaravel from "~/assets/icons/laravel.svg";
import IconCss from "~/assets/icons/css.svg";
import IconHtml from "~/assets/icons/html.svg";
import IconVue from "~/assets/icons/vue.svg";
import IconNuxt from "~/assets/icons/nuxt.svg";

definePageMeta({
  layout: "skill-test",
});

const pages = usePages();
const skills = [
  {
    id: 1,
    title: "Laravel",
    component: IconLaravel,
    heightClass: "h-[25em]",
    hoverColor: "#401712",
  },
  {
    id: 2,
    title: "Css",
    component: IconCss,
    heightClass: "h-[20em]",
    hoverColor: "#112960",
  },
  {
    id: 3,
    title: "Vue",
    component: IconVue,
    heightClass: "h-[23.5em]",
    hoverColor: "#1b4a35",
  },
  {
    id: 4,
    title: "Html",
    component: IconHtml,
    heightClass: "h-[28.5em]",
    hoverColor: "#b04b1f",
  },
  {
    id: 5,
    title: "Nuxt",
    component: IconNuxt,
    heightClass: "h-[16em]",
    hoverColor: "#18312c",
  },
];
</script>

<style scoped></style>
