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
						<play-grid :board-id="sessionStore.playerNickname"></play-grid>
					</div>
				</div>
				<warships-list></warships-list>
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
import { ref } from 'vue';

const player1Turn = ref(true);
const turnCounter = ref(0);

const sessionStore = useSessionStore();

</script>

<style scoped>
.mainPlayer1 {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
