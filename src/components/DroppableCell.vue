<template>
	<div
		:data-row="row"
		:data-col="col"
		:data-placeable="!blocked ? 'true' : 'false'"
		:id="`${row}-${col}`"
		ref="el"
	></div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { makeDroppable } from '@vue-dnd-kit/core';

import type { IDragShipData } from '@/constants/interfaces';

const props = defineProps<{
	row: number;
	col: number;
	blocked: boolean;
}>();

const emit = defineEmits<{
	placeShip: [row: number, col: number, shipData: IDragShipData];
}>();

const el = useTemplateRef<HTMLElement>('el');

makeDroppable(el, {
	events: {
		onDrop: (event) => {
			if (props.blocked) {
				return;
			}

			const shipData = event.draggedItems[0]?.data as IDragShipData | undefined;

			if (shipData) {
				emit('placeShip', props.row, props.col, shipData);
			}
		},
	},
});
</script>

