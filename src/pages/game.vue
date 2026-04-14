<template>
	<div v-if="sessionStore.selectedGameMode === 'vsBot'">
		<div class="main">
			<div class="mainPlayer"></div>
			<div class="mainBot"></div>
		</div>
	</div>
	<div v-else-if="sessionStore.selectedGameMode === 'vsPlayerLocal'">
		<local-game></local-game>
	</div>
	<div v-else-if="sessionStore.selectedGameMode === 'vsPlayerNetwork'"></div>
	<div v-else>
		<h1>Game mode is not selected.</h1>
		<my-button @click="router.push({ name: 'home' })">Back to home</my-button>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import LocalGame from '@/components/LocalGame.vue';
import myButton from '@/UI/myButton.vue';
import { useSessionStore } from '@/stores/sessionStore';
const sessionStore = useSessionStore();

const router = useRouter();
</script>

<style scoped></style>
