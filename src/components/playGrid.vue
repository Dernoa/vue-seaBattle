<template>
	<div class="gridContainer" :id="boardId">
		<div class="grid">
			<template v-for="row in 10" :key="row">
				<DroppableCell
					v-for="col in 10"
					:key="`${row}-${col}`"
					class="cell"
					:row="row - 1"
					:col="col - 1"
					:blocked="isCellBlocked(row - 1, col - 1)"
					:fired="isCellFired(row - 1, col - 1)"
					:hitted="didCellHit(row - 1, col - 1)"
					:highlight-blocked="shouldHighlightBlockedCell(row - 1, col - 1)"
					:game-started="gameStarted"
					:can-place-ships="canPlaceShips"
					:can-make-shots="canMakeShots"
					@place-ship="handlePlace"
					@make-shot="handleShot"
				/>
			</template>
		</div>
		<div class="ships-layer">
			<div
				v-for="ship in placedShips"
				:key="ship.id"
				class="placed-ship"
				:class="{ hidden: shipsHidden }"
				:style="{
					left: ship.col * CELL_SIZE + 'px',
					top: ship.row * CELL_SIZE + 'px',
					width:
						ship.orientation === 'horizontal'
							? ship.size * CELL_SIZE + 'px'
							: `${CELL_SIZE}px`,
					height:
						ship.orientation === 'horizontal'
							? `${CELL_SIZE}px`
							: ship.size * CELL_SIZE + 'px',
				}"
			>
				<img
					:src="ship.src"
					:width="ship.size * CELL_SIZE"
					:height="CELL_SIZE"
					:style="{
						transform: ship.orientation === 'vertical' ? 'rotate(90deg)' : 'none',
						transformOrigin: `${CELL_SIZE / 2}px ${CELL_SIZE / 2}px`,
					}"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import DroppableCell from './DroppableCell.vue';

import { CELL_SIZE } from '@/constants/constants';

import type { IPlacedShip, IDragShipData, IShotsFired } from '@/constants/interfaces';

const props = defineProps<{
	boardId?: string;
	placedShips: IPlacedShip[];
	shotsFired: IShotsFired[];
	blockedCells: string[];
	shipsHidden: boolean;
	gameStarted: boolean;
	canPlaceShips: boolean;
	canMakeShots: boolean;
}>();

const isCellBlocked = (row: number, col: number): boolean => {
	return props.blockedCells.includes(`${row}-${col}`);
};

const isCellFired = (row: number, col: number): boolean => {
	return props.shotsFired.some((shot) => shot.row === row && shot.col === col);
};

const didCellHit = (row: number, col: number): boolean => {
	return (
		props.shotsFired.find((shot) => shot.row === row && shot.col === col)?.hittedTheShip ??
		false
	);
};

const shouldHighlightBlockedCell = (row: number, col: number): boolean => {
	return !props.shipsHidden && isCellBlocked(row, col);
};

const emit = defineEmits<{
	(e: 'placeShip', row: number, col: number, shipData: IDragShipData): void;
	(e: 'makeShot', row: number, col: number): void;
}>();

const handlePlace = (row: number, col: number, shipData: IDragShipData) => {
	if (!props.canPlaceShips) {
		return;
	}

	emit('placeShip', row, col, shipData);
};

const handleShot = (row: number, col: number) => {
	if (!props.canMakeShots) {
		return;
	}

	emit('makeShot', row, col);
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

.cell[data-firedShot='true'][data-hittedTheShot='false'] {
	background-color: #90caf9;
}

.cell[data-firedShot='true'][data-hittedTheShot='true'] {
	background-color: #ef9a9a;
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

.placed-ship.hidden {
	display: none;
}
</style>
