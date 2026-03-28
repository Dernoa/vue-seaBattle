<template>
	<div class="main">
		<LocalPlayerContainer
			v-if="game.currentPlayerIndex === 0"
			:nickname="sessionStore.player1Nickname"
			:turn-counter="game.turnCounter"
			:player="player1"
			:is-setup-turn="game.turnCounter === 0"
			:show-actions="true"
			@place-ship="(row, col, shipData) => handlePlaceShip(player1, row, col, shipData)"
			@next-turn="game.nextTurn()"
			@reset="resetBoard(player1)"
		/>

		<hr />

		<LocalPlayerContainer
			v-if="game.currentPlayerIndex === 1"
			:nickname="sessionStore.player2Nickname"
			:turn-counter="game.turnCounter"
			:player="player2"
			:is-setup-turn="game.turnCounter === 0"
			:show-actions="true"
			@place-ship="(row, col, shipData) => handlePlaceShip(player2, row, col, shipData)"
			@next-turn="game.nextTurn()"
			@reset="resetBoard(player2)"
		/>
	</div>
</template>

<script setup lang="ts">
import LocalPlayerContainer from '@/components/LocalPlayerContainer.vue';

import { useSessionStore } from '@/stores/sessionStore';
import { reactive } from 'vue';
import { PlayerBoard, Game } from '@/constants/classes';
import type { IDragShipData } from '@/constants/interfaces';

const sessionStore = useSessionStore();

const player1 = reactive(new PlayerBoard());
const player2 = reactive(new PlayerBoard());
const game = reactive(new Game(player1, player2));

const handlePlaceShip = (
	player: PlayerBoard,
	row: number,
	col: number,
	shipData: IDragShipData
) => {
	player.placeShip(row, col, shipData);
};

const resetBoard = (player: PlayerBoard) => {
	Object.assign(player, new PlayerBoard());
};
</script>
