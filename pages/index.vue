<template>
  <SectionPageWrapper route-name="index">
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
      <h1 class="lg:text-9xl text-7xl font-bold text-center text-white">
        {{ pages[1].title }}
      </h1>
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
definePageMeta({
  layout: "default",
});

const pages = usePages();
</script>

<style scoped></style>
