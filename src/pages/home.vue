<template>
	<div class="homeContainer">
		<div class="contentWrapper">
			<div class="header">
				<h1 class="title">⚓ SEA BATTLE ⚓</h1>
			</div>

			<div class="playersSetup">
				<div class="playerCard">
					<div class="playerInfo">
						<div class="inputGroup">
							<my-input
								input-type="text"
								placeholder="Enter your name"
								v-model="nickname"
								class="nameInput"
							/>
							<my-button @click="saveFirstPlayer" variant="secondary"> Save </my-button>
						</div>
					</div>
				</div>

				<div class="vsDivider">
					<span class="vsText">VS</span>
				</div>

				<div class="playerCard" :class="{ disabled: !wantPlayLocal }">
					<div class="playerInfo">
						<div v-if="!wantPlayLocal" class="addPlayerBtn">
							<my-button @click="addSecondPlayer" variant="primary">
								+ Add Second Player
							</my-button>
						</div>
						<div v-else class="inputGroup">
							<my-input
								input-type="text"
								placeholder="Enter opponent name"
								v-model="nickname2"
								class="nameInput"
							/>
							<my-button @click="buttonSaveSecondPlayerNickname" variant="secondary">
								Save
							</my-button>
						</div>
					</div>
				</div>

				<div class="gameModes">
					<h3 class="sectionTitle">Select Game Mode</h3>
					<div class="modeButtons">
						<my-button @click="SetGameTypeRun('vsBot')" variant="primary" class="modeBtn">
							VS BOT
						</my-button>

						<my-button
							v-if="wantPlayLocal"
							@click="SetGameTypeRun('vsPlayerLocal')"
							variant="success"
							class="modeBtn"
						>
							LOCAL MULTIPLAYER
						</my-button>

						<my-button
							@click="SetGameTypeRun('vsPlayerNetwork')"
							variant="info"
							class="modeBtn"
						>
							ONLINE MULTIPLAYER
						</my-button>
					</div>
				</div>
			</div>
		</div>

		<Modal v-model="showModal" title="Welcome to Sea Battle!">
			<p>Developed by: Alexey Drozd and Anastasia Trokaylo</p>
			<template #actions>
				<my-button @click="closeModal" variant="primary"> Let's Play! </my-button>
			</template>
		</Modal>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import myInput from '@/UI/myInput.vue';
import myButton from '@/UI/myButton.vue';
import Modal from '@/UI/myModal.vue';
import { useSessionStore } from '@/stores/sessionStore';
import { useLocalStorage } from '@/stores/useLocalStorage';
import type { GameMode } from '@/constants/types';

const sessionStore = useSessionStore();
const localStorage = useLocalStorage(); 

const nickname = ref('');
const nickname2 = ref('');
const wantPlayLocal = ref(false);
const showModal = ref(true);

const router = useRouter();

function SetGameTypeRun(type: GameMode) {
	sessionStore.setGameType(type);
	router.push({ name: 'game' });
}

function saveFirstPlayer() {
	const trimmedNickname = nickname.value.trim();
	if (!trimmedNickname) return;
	sessionStore.setFirstPlayerNickname(trimmedNickname);
	localStorage.savePlayer1Name(trimmedNickname); 
}

function buttonSaveSecondPlayerNickname() {
	const trimmedNickname2 = nickname2.value.trim();
	if (!trimmedNickname2) return;
	sessionStore.setSecondPlayerNickname(trimmedNickname2);
	localStorage.savePlayer2Name(trimmedNickname2); 
}

function addSecondPlayer() {
	wantPlayLocal.value = true;
	localStorage.saveWantPlayLocal(true); 
}

function closeModal() {
	showModal.value = false;
	localStorage.saveModalSeen(true); 
}

watch([nickname, nickname2, wantPlayLocal], () => {
	if (nickname.value.trim()) {
		localStorage.savePlayer1Name(nickname.value.trim());
	}
	if (nickname2.value.trim()) {
		localStorage.savePlayer2Name(nickname2.value.trim());
	}
	localStorage.saveWantPlayLocal(wantPlayLocal.value);
});

onMounted(() => {
	const savedData = localStorage.loadAllData();
	
	if (savedData.player1Name) {
		nickname.value = savedData.player1Name;
		sessionStore.setFirstPlayerNickname(savedData.player1Name);
	}
	
	if (savedData.player2Name) {
		nickname2.value = savedData.player2Name;
		sessionStore.setSecondPlayerNickname(savedData.player2Name);
	}
	
	if (savedData.wantPlayLocal) {
		wantPlayLocal.value = true;
	}
	
	if (savedData.modalSeen) {
		showModal.value = false;
	}
});
</script>

<style scoped>
.homeContainer {
	min-height: 100vh;
	background: #7382c6;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;
}

.contentWrapper {
	max-width: 1200px;
	width: 100%;
	height: 100%;
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: rgba(255, 255, 255, 0.95);
	padding: 48px;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.header {
	text-align: center;
	margin-bottom: 48px;
}

.title {
	font-size: 48px;
	font-weight: bold;
	background: #7382c6;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	margin-bottom: 12px;
}

.subtitle {
	color: #666;
	font-size: 18px;
}

.playersSetup {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 48px;
	margin-bottom: 64px;
	flex-wrap: wrap;
}

.playerCard {
	background: #f8f9fa;
	border-radius: 24px;
	padding: 24px;
	min-width: 280px;
	text-align: center;
	transition: all 0.3s ease;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.playerCard.disabled {
	opacity: 0.6;
}

.playerAvatar {
	font-size: 64px;
	margin-bottom: 16px;
}

.playerCard h3 {
	font-size: 20px;
	color: #333;
	margin-bottom: 16px;
}

.inputGroup {
	display: flex;
	gap: 12px;
	align-items: center;
	flex-wrap: wrap;
	justify-content: center;
}

.nameInput {
	flex: 1;
	min-width: 180px;
}

.nameInput :deep(.input) {
	padding: 10px 16px;
	border: 2px solid #e0e0e0;
	border-radius: 12px;
	font-size: 14px;
	transition: border-color 0.3s;
}

.nameInput :deep(.input:focus) {
	outline: none;
	border-color: #7382c6;
}

.addPlayerBtn {
	margin-top: 8px;
}

.vsDivider {
	display: flex;
	align-items: center;
	justify-content: center;
}

.vsText {
	font-size: 32px;
	font-weight: bold;
	color: #7382c6;
	background: white;
	padding: 16px;
	border-radius: 50%;
	width: 80px;
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 4px 8px rgba(0, 0, 0, 0.1);
}

.gameModes {
	text-align: center;
}

.sectionTitle {
	font-size: 24px;
	color: #333;
	margin-bottom: 24px;
}

.modeButtons {
	display: flex;
	gap: 20px;
	justify-content: center;
	flex-wrap: wrap;
}

.modeBtn {
	min-width: 220px;
	padding: 14px 24px !important;
	font-size: 16px !important;
}

@media (max-width: 768px) {
	.contentWrapper {
		padding: 24px;
	}

	.title {
		font-size: 32px;
	}

	.playersSetup {
		gap: 24px;
	}

	.playerCard {
		min-width: 240px;
		padding: 16px;
	}

	.vsText {
		font-size: 24px;
		width: 60px;
		height: 60px;
	}

	.modeBtn {
		min-width: 100%;
	}
}
</style>