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
import { useTemplateRef } from 'vue';
import { makeDroppable } from '@vue-dnd-kit/core';

const props = defineProps<{
  row: number;
  col: number;
}>();

const el = useTemplateRef<HTMLElement>('el');

makeDroppable(el, {
      events: { onDrop: (e) => console.log(e) },
});
</script>