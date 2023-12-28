<template>
  <div class="flex gap-4">
    <section
      v-for="(i, index) in 3"
      :id="`page${i}`"
      class="w-20 h-20 bg-blue-500"
      :class="{ 'opacity-50': currentPageIndex !== `page${i}` }"
      @click.prevent="navigateTo({ name: 'test', query: { page: `page${i}` } })"
    ></section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const currentPageIndex = ref(route.query.page ?? "page1");

// console.log(currentPageIndex.value);

const getClass = (pageIndex: string) => {
  console.log(currentPageIndex.value !== pageIndex);
  if (currentPageIndex.value !== pageIndex) return "opacity-50";
};

onMounted(() => {});

watch(
  () => route.query.page as string,
  (newVal) => {
    currentPageIndex.value = newVal;
  }
);
</script>

<style scoped></style>
