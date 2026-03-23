<template>
	<div class="gridContainer" :id="boardId" ref="gridContainer">
		<div class="grid">
			<template v-for="row in 10" :key="row">
				<DroppableCell
					v-for="col in 10"
					:key="`${row}-${col}`"
					class="cell"
					:row="row - 1"
					:col="col - 1"
					:on-place="handlePlace"
					:placeable="isPlaceable(row - 1, col - 1)"
				/>
			</template>
		</div>
		<div class="ships-layer">
			<div
				v-for="ship in placedShips"
				:key="ship.id"
				class="placed-ship"
				:style="{
					left: ship.col * 40 + 'px',
					top: ship.row * 40 + 'px',
					width: ship.size * 40 + 'px',
					height: '40px',
				}"
			>
				<img :src="ship.src" :width="ship.size * 40" height="40" />
			</div>
		</div>
	</div>
</template>
>

<script setup lang="ts">
import DroppableCell from './DroppableCell.vue';

import type { IPlacedShip } from '@/constants/interfaces';

const props = defineProps<{
	boardId?: string;
	placedShips?: IPlacedShip[];
	blockedCells: string[];
}>();

const emit = defineEmits<{
	(e: 'placeShip', row: number, col: number, shipData: any): void;
}>();

const handlePlace = (row: number, col: number, shipData: any) => {
	emit('placeShip', row, col, shipData);
};

const isPlaceable = (row: number, col: number): boolean => {
	return !props.blockedCells.includes(`${row}-${col}`);
};
</script>

<style scoped>
.gridContainer {
	position: relative;
	width: 400px;
	height: 400px;
	margin: 20px;
	background-color: #e3f2fd;
	/* border: 2px solid #1976d2; баг с границей*/
}

.grid {
	display: grid;
	grid-template-columns: repeat(10, 40px);
	grid-template-rows: repeat(10, 40px);
	width: 100%;
	height: 100%;
}

.cell {
	width: 40px;
	height: 40px;
	border: 1px solid #1976d2;
	box-sizing: border-box;
}

.cell[data-placeable='false'] {
	background-color: lightgray;
	cursor: not-allowed;
}

.ships-layer {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.placed-ship {
	position: absolute;
	pointer-events: none;
}
</style>
