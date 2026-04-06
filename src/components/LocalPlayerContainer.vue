<template>
	<div class="playerContainer">
		<div class="containerNickname">{{ nickname }} (Turn {{ turnCounter }})</div>
		<div v-if="statusLabel" class="containerStatus">{{ statusLabel }}</div>

		<div class="containerPlayGrid">
			<div>
				<play-grid
					:board-id="nickname"
					:placed-ships="player.placedShips"
					:blocked-cells="player.blockedCellsArray"
					:ships-hidden="player.shipsHidden"
					:game-started="gameStarted"
					:can-place-ships="canPlaceShips"
					:can-make-shots="canMakeShots"
					:shots-fired="player.shotsFired"
					@make-shot="handleShot"
					@place-ship="handlePlaceShip"
				/>
			</div>

			<div v-if="showAvailableShips && !player.warshipsNotAvailable">
				<warships-list :warships-available="player.warshipsAvailable" />
			</div>
		</div>

		<div v-if="showSetupActions && player.warshipsNotAvailable">
			<div>
				<my-button @click="emit('confirm')">Confirm</my-button>
				<my-button @click="emit('reset')">Reset</my-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import playGrid from '@/components/playGrid.vue';
import warshipsList from '@/components/warshipsList.vue';
import myButton from '@/UI/myButton.vue';

import type { PlayerBoard } from '@/constants/classes';
import type { IDragShipData } from '@/constants/interfaces';

const props = defineProps<{
	nickname: string;
	turnCounter: number;
	player: PlayerBoard;
	gameStarted: boolean;
	canPlaceShips: boolean;
	canMakeShots: boolean;
	showAvailableShips: boolean;
	showSetupActions: boolean;
	statusLabel?: string;
}>();

const emit = defineEmits<{
	placeShip: [row: number, col: number, shipData: IDragShipData];
	makeShot: [row: number, col: number];
	confirm: [];
	reset: [];
}>();

const handlePlaceShip = (row: number, col: number, shipData: IDragShipData) => {
	emit('placeShip', row, col, shipData);
};

const handleShot = (row: number, col: number) => {
	emit('makeShot', row, col);
};
</script>

<style scoped>
.playerContainer {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.containerNickname {
	font-weight: 700;
}

.containerStatus {
	margin-top: 8px;
}

.containerPlayGrid {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
}
</style>
