<template>
	<div
		:data-row="row"
		:data-col="col"
		:data-placeable="!highlightBlocked ? 'true' : 'false'"
		:data-firedShot="fired ? 'true' : 'false'"
		:data-hittedTheShot="hitted ? 'true' : 'false'"
		:id="`${row}-${col}`"
		class="droppable-cell"
		ref="el"
		@click="handleClick"
	>
		<span v-if="fired" class="shot-marker">{{ hitted ? 'X' : '•' }}</span>
	</div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { makeDroppable } from '@vue-dnd-kit/core';

import type { IDragShipData } from '@/constants/interfaces';

const props = defineProps<{
	row: number;
	col: number;
	blocked: boolean;
	fired: boolean;
	hitted: boolean;
	highlightBlocked: boolean;
	gameStarted: boolean;
}>();

const emit = defineEmits<{
	placeShip: [row: number, col: number, shipData: IDragShipData];
	makeShot: [row: number, col: number];
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

const handleClick = () => {
	if (props.gameStarted && !props.fired) {
		emit('makeShot', props.row, props.col);
	}
};
</script>

<style scoped>
.droppable-cell {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}

.shot-marker {
	font-size: 24px;
	font-weight: 700;
	line-height: 1;
	user-select: none;
}

.droppable-cell[data-hittedTheShot='true'] .shot-marker {
	color: #b71c1c;
}

.droppable-cell[data-firedShot='true'][data-hittedTheShot='false'] .shot-marker {
	color: #0d47a1;
}
</style>
