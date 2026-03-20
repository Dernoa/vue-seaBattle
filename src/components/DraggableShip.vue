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
import { useTemplateRef } from 'vue';
import { makeDraggable } from '@vue-dnd-kit/core';

const props = defineProps<{
  src: string;
  width: string;
  height: string;
  size: number;
  id: string;
}>();

const el = useTemplateRef<HTMLElement>('el');

makeDraggable(el);
</script>