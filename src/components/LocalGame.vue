<template>
	<div class="main">
		<LocalPlayerContainer
			:nickname="activeNickname"
			:turn-counter="game.turnCounter"
			:player="gameStarted ? targetBoard : activeBoard"
			:is-setup-turn="game.turnCounter === 0"
			:show-actions="true"
			:game-started="gameStarted"
			@make-shot="(row, col) => handleShot(row, col)"
			@place-ship="(row, col, shipData) => handlePlaceShip(activeBoard, row, col, shipData)"
			@next-turn="game.nextTurn()"
			@reset="resetBoard(activeBoard)"
		/>
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
const activeBoard = computed(() => (game.currentPlayerIndex === 0 ? player1 : player2));
const targetBoard = computed(() => (game.currentPlayerIndex === 0 ? player2 : player1));
const activeNickname = computed(() =>
	game.currentPlayerIndex === 0 ? sessionStore.player1Nickname : sessionStore.player2Nickname
);

const handlePlaceShip = (
	player: PlayerBoard,
	row: number,
	col: number,
	shipData: IDragShipData
) => {
	player.placeShip(row, col, shipData);
};

const handleShot = (row: number, col: number) => {
	const shotAccepted = targetBoard.value.makeShot(row, col);

	if (shotAccepted) {
		game.nextTurn();
	}
};

const resetBoard = (player: PlayerBoard) => {
	Object.assign(player, new PlayerBoard());
};
</script>
