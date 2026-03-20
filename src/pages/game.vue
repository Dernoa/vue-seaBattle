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
import { ref, reactive } from 'vue';

import type { ShipType } from '@/constants/types';

import type { IAvailableShips , IPlacedShip } from '@/constants/interfaces';

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

const canPlaceShip = (row: number, col: number, size: number): boolean => {
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

const handlePlaceShip = (row: number, col: number, shipData: any) => {
	const shipId = shipData.id as string;
	const shipType = shipId.split('-')[0] as ShipType;
	const size = shipData.size;

	if (warshipsAvailable[shipType].count <= 0) {
		console.warn('Нет доступных кораблей этого типа');
		return;
	}

	if (!canPlaceShip(row, col, size)) {
		console.warn('Нельзя разместить корабль здесь');
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
};

</script>

<style scoped>
.mainPlayer1 {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
