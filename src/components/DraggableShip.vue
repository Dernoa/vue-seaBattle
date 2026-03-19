<template>
  <div class="handle" ref="el" :id="id">
    <img
      :src="src"
      :width="width"
      :height="height"
      :data-size="size"
    />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue';
import { makeDraggable } from '@vue-dnd-kit/core';

const props = defineProps<{
  src: string;
  width: string;
  height: string;
  size: number;
  id: string;
}>();

const el = useTemplateRef<HTMLElement>('el');

onMounted(() => {
  if (el.value) {
    makeDraggable(el, { dragHandle: '.handle' });
  }
});
</script>