<template>
  <div
    class="drop-zone"
    :data-row="row"
    :data-col="col"
    :id="`${row}-${col}`"
    ref="el"
  ></div>
</template>

<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue';
import { makeDroppable } from '@vue-dnd-kit/core';

const props = defineProps<{
  row: number;
  col: number;
}>();

const el = useTemplateRef<HTMLElement>('el');

onMounted(() => {
  if (el.value) {
    makeDroppable(el, {
      events: { onDrop: (e) => console.log(e) },
    });
  }
});
</script>