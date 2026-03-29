<template>
	<div class="playerContainer">
		<div class="containerNickname">{{ nickname }} (Turn {{ turnCounter }})</div>

		<div class="containerPlayGrid">
			<div>
				<play-grid
					:board-id="nickname"
					:placed-ships="player.placedShips"
					:blocked-cells="player.blockedCellsArray"
					:ships-hidden="player.shipsHidden"
					:game-started="gameStarted"
					:shots-fired="player.shotsFired"
					@make-shot="handleShot"
					@place-ship="handlePlaceShip"
				/>
			</div>

			<div v-if="!player.warshipsNotAvailable">
				<warships-list :warships-available="player.warshipsAvailable" />
			</div>
		</div>

		<div v-if="showActions && player.warshipsNotAvailable">
			<div v-if="isSetupTurn">
				<my-button @click="startGame">Confirm</my-button>
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
	isSetupTurn: boolean;
	showActions: boolean;
	gameStarted: boolean;
}>();

const emit = defineEmits<{
	placeShip: [row: number, col: number, shipData: IDragShipData];
	makeShot: [row: number, col: number];
	nextTurn: [];
	reset: [];
}>();

const handlePlaceShip = (row: number, col: number, shipData: IDragShipData) => {
	emit('placeShip', row, col, shipData);
};

const handleShot = (row: number, col: number) => {
	emit('makeShot', row, col);
};

const startGame = () => {
	emit('nextTurn');
	props.player.hideShips();
}
</script>

<style scoped>
.containerPlayGrid {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
