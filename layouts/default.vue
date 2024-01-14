<template>
  <SidebarDesktop v-if="isDesktop" />
  <header class="flex items-center justify-between px-5 py-5">
    <h1 class="text-opposite-main text-3xl font-bold">Amir Kouchaki</h1>
    <SidebarMobile v-if="isMobileOrTablet" />
  </header>
  <slot></slot>
</template>

<script setup lang="ts">
provide("currRoute", "index");
const { isMobileOrTablet, isDesktop } = useDevice();
</script>

<style scoped></style>
