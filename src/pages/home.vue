<template>
	<div class="main">
		<div>
			<div class="nameContainer">
				<div>Player 1:</div>
				<div>
					<my-input
						input-type="text"
						:placeholder="sessionStore.player1Nickname"
						v-model="nickname"
						class="nameMyInput"
					></my-input>
				</div>
				<div>
					<my-button @click="buttonSaveFirstPlayerNickname">Save</my-button>
				</div>
			</div>
			<div v-if="!wantPlayLocal" class="nameContainer">
				<span>Add second player?</span>
				<my-button @click="addSecondPlayer">Yes</my-button>
			</div>
			<div class="nameContainer" v-if="wantPlayLocal">
				<div>Player 2:</div>
				<div>
					<my-input
						input-type="text"
						:placeholder="sessionStore.player2Nickname"
						v-model="nickname2"
						class="nameMyInput"
					></my-input>
				</div>
				<div>
					<my-button @click="buttonSaveSecondPlayerNickname">Save</my-button>
				</div>
			</div>
		</div>
		<div>
			<div>Choose type of a game</div>
			<div class="gameTypeContainer">
				<div>
					<my-button @click="buttonSetGameTypeAndRun('vsBot')">VS BOT</my-button>
				</div>
				<div v-if="wantPlayLocal">
					<my-button @click="buttonSetGameTypeAndRun('vsPlayerLocal')"
						>VS PLAYER(Local)</my-button
					>
				</div>
				<div>
					<my-button @click="buttonSetGameTypeAndRun('vsPlayerNetwork')"
						>VS PLAYER(Network)</my-button
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import myInput from '@/UI/myInput.vue';
import myButton from '@/UI/myButton.vue';
import { useSessionStore } from '@/stores/sessionStore';
import type { GameMode } from '@/constants/types';

const sessionStore = useSessionStore();
const nickname = ref('');
const nickname2 = ref('');
const wantPlayLocal = ref(false);

const router = useRouter();

function buttonSetGameTypeAndRun(type: GameMode) {
	sessionStore.setGameType(type);
	router.push({ name: 'game' });
}

function buttonSaveFirstPlayerNickname() {
	const trimmedNickname = nickname.value.trim();
	if (!nickname.value.trim()) return;
	sessionStore.setFirstPlayerNickname(trimmedNickname);
}

function buttonSaveSecondPlayerNickname() {
	const trimmedNickname2 = nickname2.value.trim();
	if (!nickname2.value.trim()) return;
	sessionStore.setSecondPlayerNickname(trimmedNickname2);
}
function addSecondPlayer() {
	wantPlayLocal.value = true;
}
</script>

<style scoped>
.main {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.gameTypeContainer {
	display: flex;
}
.nameContainer {
	display: flex;
	align-items: center;
}
.nameMyInput :deep(.input) {
	height: 5vh;
	width: 30vw;
}
</style>
