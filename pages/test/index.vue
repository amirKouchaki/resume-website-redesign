<template>
  <div class="flex gap-4">
    <section
      v-for="(i, index) in 3"
      :id="`page${i}`"
      class="w-20 h-20 bg-blue-500"
      :class="{ 'opacity-50': $route.query.page !== `page${i}` }"
      @click.prevent="navigateTo({ name: 'test', query: { page: `page${i}` } })"
    ></section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const currentPageIndex = ref();
const currentPageHash = computed(() => {});

// console.log(currentPageIndex.value);

const getClass = (pageIndex: string) => {
  console.log(currentPageIndex.value !== pageIndex);
  if (currentPageIndex.value !== pageIndex) return "opacity-50";
};

onMounted(() => {
  currentPageIndex.value = route.hash.substring(1);
});

watch(
  () => route.hash,
  (newVal) => {
    const hash = newVal.substring(1);

    currentPageIndex.value = hash;
  }
);
</script>

<style scoped></style>
