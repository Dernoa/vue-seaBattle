<template>
	<div
		class="handle"
		ref="el"
		:id="id"
		tabindex="0"
		@keydown="changeOrientation"
		:style="{
			width: currentOrientation === 'horizontal' ? width : height,
			height: currentOrientation === 'horizontal' ? height : width,
		}"
	>
		<img
			:src="src"
			:width="width"
			:height="height"
			:style="{ 
					transform: currentOrientation === 'vertical' ? 'rotate(90deg)' : 'none',
					transformOrigin: '20px 20px' 
			}"
			:data-size="size"
		/>
	</div>
</template>

<script setup lang="ts">
import { useTemplateRef, ref, computed } from 'vue';
import { makeDraggable } from '@vue-dnd-kit/core';

import type { Orientations } from '@/constants/types';

const currentOrientation = ref<Orientations>('horizontal');

const props = defineProps<{
	src: string;
	width: string;
	height: string;
	size: number;
	id: string;
	changeOrientationIsPossible: boolean;
}>();

const emit = defineEmits<{
	orientationChange: [orientation: Orientations];
}>();

const el = useTemplateRef<HTMLElement>('el');

const dragData = computed(() => ({
	id: props.id,
	size: props.size,
	src: props.src,
	width: props.width,
	height: props.height,
	orientation: currentOrientation.value,
}));

makeDraggable(el, {
	data: () => dragData.value,
});

const changeOrientation = (event: KeyboardEvent) => {
	if (
		(event.key === 'r' || event.key === ' ' || event.key === 'R') &&
		props.changeOrientationIsPossible === true
	) {
		event.preventDefault();
		currentOrientation.value =
			currentOrientation.value === 'horizontal' ? 'vertical' : 'horizontal';
		emit('orientationChange', currentOrientation.value);
	}
};
</script>

<style scoped>
.handle {
	display: inline-block;
	transition: all 0.2s ease;
}
</style>
