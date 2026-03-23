<template>
	<div v-if="sessionStore.selectedGameType === 'vsBot'">
		<div class="main">
			<div class="mainPlayer"></div>
			<div class="mainBot"></div>
		</div>
	</div>
	<div v-if="sessionStore.selectedGameType === 'vsPlayerLocal'">
		<div class="main">
			<div class="mainPlayer1" v-if="player1Turn">
				<div class="containerPlayGrid">
					<div class="containerNickname">
						{{ sessionStore.playerNickname }} (Turn {{ turnCounter }})
					</div>
					<div>
						<play-grid
							:board-id="sessionStore.playerNickname"
							:placed-ships="placedShips"
							:blocked-cells="blockedCellsArray"
							@place-ship="handlePlaceShip"
						></play-grid>
					</div>
				</div>
				<warships-list :warships-available="warshipsAvailable"></warships-list>
			</div>
			<hr />
			<div class="mainPlayer2" v-if="!player1Turn">
				<div class="containerPlayGrid">
					<div class="containerNickname"></div>
				</div>
				<div class="warshipsList"></div>
			</div>
		</div>
	</div>
	<div v-if="sessionStore.selectedGameType === 'vsPlayerNetwork'"></div>
</template>

<script setup lang="ts">
import playGrid from '@/components/playGrid.vue';
import warshipsList from '@/components/warshipsList.vue';
import { useSessionStore } from '@/stores/sessionStore';
import { ref, reactive, computed } from 'vue';

import type { ShipType } from '@/constants/types';

import type { IAvailableShips, IPlacedShip } from '@/constants/interfaces';

const player1Turn = ref(true);
const turnCounter = ref(0);
const sessionStore = useSessionStore();

const warshipsAvailable = reactive<IAvailableShips>({
	warship1: { size: 1, count: 4 },
	warship2: { size: 2, count: 3 },
	warship3: { size: 3, count: 2 },
	warship4: { size: 4, count: 1 },
});

const placedShips = ref<IPlacedShip[]>([]);
const blockedCells = ref<Set<string>>(new Set());

const blockedCellsArray = computed(() => Array.from(blockedCells.value));

const canPlaceShip = (row: number, col: number, size: number): boolean => {
	if (isPlaceable(row, col) === false) return false;

	if (col + size > 10) return false;

	for (const ship of placedShips.value) {
		if (ship.row === row) {
			if (col < ship.col + ship.size && col + size > ship.col) {
				return false;
			}
		}
	}
	return true;
};

const cellsAround = (
	row: number,
	col: number,
	size: number,
	orientation: 'horizontal' | 'vertical'
): { row: number; col: number }[] => {
	const result: { row: number; col: number }[] = [];
	const seen = new Set<string>();

	const addCell = (r: number, c: number) => {
		if (r >= 0 && r < 10 && c >= 0 && c < 10) {
			const key = `${r},${c}`;
			if (!seen.has(key)) {
				seen.add(key);
				result.push({ row: r, col: c });
			}
		}
	};

	for (let i = 0; i < size; i++) {
		const currentRow = orientation === 'horizontal' ? row : row + i;
		const currentCol = orientation === 'horizontal' ? col + i : col;

		for (let dr = -1; dr <= 1; dr++) {
			for (let dc = -1; dc <= 1; dc++) {
				if (dr === 0 && dc === 0) continue;
				addCell(currentRow + dr, currentCol + dc);
			}
		}
	}

	return result;
};

const makeCellsNotPlaceable = (
	row: number,
	col: number,
	size: number,
	orientation: 'horizontal' | 'vertical'
) => {
	const cells = cellsAround(row, col, size, orientation);
	cells.forEach((cell) => {
		blockedCells.value.add(`${cell.row}-${cell.col}`);
	});
};

const isPlaceable = (row: number, col: number): boolean => {
	return !blockedCells.value.has(`${row}-${col}`);
};

const handlePlaceShip = (row: number, col: number, shipData: any) => {
	const shipId = shipData.id as string;
	const shipType = shipId.split('-')[0] as ShipType;
	const size = shipData.size;

	if (warshipsAvailable[shipType].count <= 0) {
		alert('There are no ships of this type available.');
		return;
	}

	if (!canPlaceShip(row, col, size)) {
		console.warn("You can't place a ship here");
		return;
	}

	warshipsAvailable[shipType].count--;

	placedShips.value.push({
		id: shipId,
		size: size,
		row,
		col,
		src: shipData.src,
	});

	makeCellsNotPlaceable(row, col, size, 'horizontal');
};
</script>

<style scoped>
.mainPlayer1 {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
