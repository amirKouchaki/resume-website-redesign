<template>
  <section
    class="w-full h-full fixed top-0"
    :class="[
      { invisible: defaultPageId !== pageId },
      PageSectionClasses.mainClass,
    ]"
    :id="pageId"
  >
    <div
      class="w-full h-full overflow-y-hidden"
      :class="[outerClass, PageSectionClasses.outerClass]"
    >
      <div
        class="w-full h-full overflow-y-hidden"
        :class="[innerClass, PageSectionClasses.innerClass]"
      >
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PageSectionClasses } from "../../enums";
defineProps({
  innerClass: {
    default: "",
    type: String,
    required: false,
  },
  outerClass: {
    default: "",
    type: String,
    required: false,
  },
  pageId: {
    required: true,
    type: String,
  },
});

const defaultPageId = inject("defaultPageId");
</script>

<style scoped></style>
