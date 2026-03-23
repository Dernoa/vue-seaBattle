<template>
	<div
		:data-row="row"
		:data-col="col"
		:data-placeable="placeable"
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
	placeable: boolean;
	onPlace?: (row: number, col: number, shipData: any) => void;
}>();

const el = useTemplateRef<HTMLElement>('el');

makeDroppable(el, {
	events: {
		onDrop: (event) => {
			const shipData = event.draggedItems[0]?.data;
			if (shipData && props.onPlace) {
				props.onPlace(props.row, props.col, shipData);
			}
		},
	},
});
</script>
