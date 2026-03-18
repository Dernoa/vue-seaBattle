<template>
	<div class="gridContainer" :id="boardId">
		<div v-for="col in 10" :key="col" class="col">
			<div
				v-for="row in 10"
				:key="row"
				class="cell"
				:data-row="row - 1"
				:data-col="col - 1"
				:id="`${row - 1}-${col - 1}`"
				@dragover="onDragOver"
				@dragleave="onDragLeave"
				@drop="onDrop"
			></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useDragStore } from '@/stores/dragStore';
import { useGameStore } from '@/stores/gameStore';
import { watch, ref } from 'vue';

const dragStore = useDragStore();
const gameStore = useGameStore();

const props = defineProps({
	boardId: {
		type: String,
		required: true,
	},
});

const highlightCells = (row: number, col: number, size: number, className: string) => {
	for (let i = col; i < col + size; i++) {
		const cell = document.getElementById(`${row}-${i}`);
		cell?.classList.add(className);
	}
};

const unhighlightCells = (row: number, col: number, size: number, className: string) => {
	for (let i = col; i < col + size; i++) {
		const cell = document.getElementById(`${row}-${i}`);
		cell?.classList.remove(className);
	}
};

const onDragOver = (event: DragEvent) => {
	event.preventDefault();
	const target = event.target as HTMLElement;

	if (
		dragStore.dragItem?.dataset.size &&
		Number(dragStore.dragItem.dataset.size) > 0 &&
		Number(target.dataset.col) >= 0 &&
		Number(target.dataset.col) + Number(dragStore.dragItem.dataset.size) <= 10
	) {
		highlightCells(
			Number(target.dataset.row),
			Number(target.dataset.col),
			Number(dragStore.dragItem.dataset.size),
			'drag-hover'
		);
	} else if (dragStore.dragItem?.dataset.size && Number(dragStore.dragItem.dataset.size) > 0) {
		highlightCells(
			Number(target.dataset.row),
			Number(target.dataset.col),
			Number(dragStore.dragItem.dataset.size),
			'drag-hover-wrong'
		);
	}
};

const onDragLeave = (event: DragEvent) => {
	const target = event.target as HTMLElement;

	if (dragStore.dragItem?.dataset.size && Number(dragStore.dragItem.dataset.size) > 0) {
		unhighlightCells(
			Number(target.dataset.row),
			Number(target.dataset.col),
			Number(dragStore.dragItem.dataset.size),
			'drag-hover'
		);
		unhighlightCells(
			Number(target.dataset.row),
			Number(target.dataset.col),
			Number(dragStore.dragItem.dataset.size),
			'drag-hover-wrong'
		);
	}
};

const onDrop = (event: DragEvent) => {
	event.preventDefault();
	const target = event.target as HTMLElement;
	const row = Number(target.dataset.row);
	const col = Number(target.dataset.col);
	const size = Number(dragStore.dragItem?.dataset.size) || 0;

	if (dragStore.dragItem?.dataset.size && size > 0) {
		unhighlightCells(row, col, size, 'drag-hover');
		unhighlightCells(row, col, size, 'drag-hover-wrong');

		if (col >= 0 && col + size <= 10) {
			gameStore.initializeShip(col, row, size);
		}
	}
};
</script>

<style scoped>
.gridContainer {
	display: grid;
	width: 400px;
	height: 400px;
	margin: 20px;
	grid-template-columns: repeat(10, 40px);
	grid-template-rows: repeat(10, 40px);
	background-color: #e3f2fd;
	border: 2px solid #1976d2;
}
.cell {
	width: 40px;
	height: 40px;
	border: 2px solid #1976d2;
}

.cell.drag-hover {
	background-color: rgba(0, 255, 0, 0.1);
	border: 2px dashed #4caf50;
}

.cell.drag-hover-wrong {
	background-color: rgba(250, 0, 0, 0.58);
	border: 2px dashed red;
}
</style>
