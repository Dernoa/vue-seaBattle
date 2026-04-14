<template>
	<div class="main">
		<LocalPlayerContainer
			v-if="!gameStarted"
			:nickname="setupNickname"
			:turn-counter="game.turnCounter"
			:player="setupBoard"
			:game-started="gameStarted"
			:can-place-ships="true"
			:can-make-shots="false"
			:show-available-ships="true"
			:show-setup-actions="true"
			:status-label="'Ship placement'"
			@place-ship="(row, col, shipData) => handlePlaceShip(setupBoard, row, col, shipData)"
			@confirm="confirmSetup"
			@reset="resetBoard(setupBoard)"
		/>

		<div v-else class="battlefield">
			<LocalPlayerContainer
				:nickname="sessionStore.player1Nickname"
				:turn-counter="game.turnCounter"
				:player="player1"
				:game-started="gameStarted"
				:can-place-ships="false"
				:can-make-shots="game.currentPlayerIndex === 1"
				:show-available-ships="false"
				:show-setup-actions="false"
				:status-label="game.currentPlayerIndex === 1 ? 'Target board' : 'Own board'"
				@make-shot="(row, col) => handleShot(player1, row, col)"
			/>

			<div class="targetIndicator" :class="targetIndicatorClass">
				<div class="targetIndicatorLabel">Target board</div>
				<div class="targetIndicatorArrow" aria-hidden="true">{{ targetArrow }}</div>
			</div>

			<LocalPlayerContainer
				:nickname="sessionStore.player2Nickname"
				:turn-counter="game.turnCounter"
				:player="player2"
				:game-started="gameStarted"
				:can-place-ships="false"
				:can-make-shots="game.currentPlayerIndex === 0"
				:show-available-ships="false"
				:show-setup-actions="false"
				:status-label="game.currentPlayerIndex === 0 ? 'Target board' : 'Own board'"
				@make-shot="(row, col) => handleShot(player2, row, col)"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import LocalPlayerContainer from '@/components/LocalPlayerContainer.vue';

import { useSessionStore } from '@/stores/sessionStore';
import { computed, reactive } from 'vue';
import { PlayerBoard, Game } from '@/constants/classes';
import type { IDragShipData } from '@/constants/interfaces';

const sessionStore = useSessionStore();

const player1 = reactive(new PlayerBoard());
const player2 = reactive(new PlayerBoard());
const game = reactive(new Game(player1, player2));

const gameStarted = computed(() => game.turnCounter > 0);
const setupBoard = computed(() => (game.currentPlayerIndex === 0 ? player1 : player2));
const setupNickname = computed(() =>
	game.currentPlayerIndex === 0 ? sessionStore.player1Nickname : sessionStore.player2Nickname
);
const targetArrow = computed(() => (game.currentPlayerIndex === 0 ? '->' : '<-'));
const targetIndicatorClass = computed(() =>
	game.currentPlayerIndex === 0 ? 'target-right' : 'target-left'
);

const handlePlaceShip = (
	player: PlayerBoard,
	row: number,
	col: number,
	shipData: IDragShipData
) => {
	player.placeShip(row, col, shipData);
};

const handleShot = (targetBoard: PlayerBoard, row: number, col: number) => {
	const shotAccepted = targetBoard.makeShot(row, col);

	if (shotAccepted && !targetBoard.didShotHitAt(row, col)) {
		game.nextTurn();
	}
};

const confirmSetup = () => {
	setupBoard.value.hideShips();
	game.nextTurn();
};

const resetBoard = (player: PlayerBoard) => {
	Object.assign(player, new PlayerBoard());
};
</script>

<style scoped>
.main {
	display: flex;
	justify-content: center;
}

.battlefield {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 24px;
}

.targetIndicator {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-width: 120px;
	gap: 8px;
	font-weight: 700;
}

.targetIndicatorLabel {
	text-transform: uppercase;
	letter-spacing: 0.08em;
}

.targetIndicatorArrow {
	font-size: 48px;
	line-height: 1;
}

.targetIndicator.target-left .targetIndicatorArrow,
.targetIndicator.target-left .targetIndicatorLabel {
	color: #c62828;
}

.targetIndicator.target-right .targetIndicatorArrow,
.targetIndicator.target-right .targetIndicatorLabel {
	color: #1565c0;
}

@media (max-width: 960px) {
	.targetIndicator {
		order: 3;
		width: 100%;
	}
}
</style>
