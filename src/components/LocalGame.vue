<template>
	<div class="main">
		<div v-if="game.currentPlayerIndex === 0">
			<div class="containerNickname">
				{{ sessionStore.playerNickname }} (Turn {{ game.turnCounter }})
			</div>
			<div class="containerPlayGrid">
				<div>
					<play-grid
						:board-id="sessionStore.playerNickname"
						:placed-ships="player1.placedShips"
						:blocked-cells="player1.blockedCellsArray"
						@place-ship="(row, col, shipData) => player1.placeShip(row, col, shipData)"
					/>
				</div>
				<div>
					<warships-list
						:warships-available="player1.warshipsAvailable"
						v-if="!player1.warshipsNotAvailable"
					/>
				</div>
			</div>
			<div v-if="player1.warshipsNotAvailable">
				<div v-if="game.turnCounter == 0">
					<my-button @click="game.nextTurn">Confirm</my-button>
					<my-button>Reset</my-button>
				</div>
				<my-button v-else>Next Turn</my-button>
			</div>
		</div>

		<hr />

		<div v-if="game.currentPlayerIndex === 1">
			<div class="containerNickname">
				{{ sessionStore.player2Nickname }} (Turn {{ game.turnCounter }})
			</div>
			<div class="containerPlayGrid">
				<div>
					<play-grid
						:board-id="sessionStore.playerNickname"
						:placed-ships="player2.placedShips"
						:blocked-cells="player2.blockedCellsArray"
						@place-ship="(row, col, shipData) => player2.placeShip(row, col, shipData)"
					/>
				</div>
				<div>
					<warships-list
						:warships-available="player2.warshipsAvailable"
						v-if="!player2.warshipsNotAvailable"
					/>					
				</div>
			</div>
			<div v-if="player2.warshipsNotAvailable">
				<div v-if="game.turnCounter == 0">
					<my-button @click="game.nextTurn">Confirm</my-button>
					<my-button>Reset</my-button>
				</div>
				<my-button v-else>Next Turn</my-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import playGrid from '@/components/playGrid.vue';
import warshipsList from '@/components/warshipsList.vue';
import myButton from '@/UI/myButton.vue';

import { useSessionStore } from '@/stores/sessionStore';
import { reactive } from 'vue';
import { PlayerBoard, Game } from '@/constants/classes';

const sessionStore = useSessionStore();

const player1 = reactive(new PlayerBoard());
const player2 = reactive(new PlayerBoard());
const game = reactive(new Game(player1, player2));
</script>

<style scoped>
.containerPlayGrid {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
