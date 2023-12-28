<template>
  <SectionPageWrapper route-name="index">
    <SectionPage page-id="page-1" inner-class="bg-main grid place-items-center">
      <h1 class="text-9xl font-bold whitespace-nowrap text-white">Page 1</h1>
    </SectionPage>
    <SectionPage
      page-id="page-2"
      inner-class="bg-complementary grid place-items-center"
    >
      <h1 class="text-9xl font-bold whitespace-nowrap text-white">Page 2</h1>
    </SectionPage>
    <SectionPage
      page-id="page-3"
      inner-class="bg-secondary grid place-items-center"
    >
      <h1 class="text-9xl font-bold whitespace-nowrap text-white">Page 3</h1>
    </SectionPage>
    <SectionPage
      page-id="page-4"
      inner-class="bg-slate-800 grid place-items-center"
    >
      <h1 class="text-9xl font-bold whitespace-nowrap text-blue-500">Page 4</h1>
    </SectionPage>
  </SectionPageWrapper>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<style scoped></style>
