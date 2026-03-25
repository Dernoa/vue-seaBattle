<template>
	<div v-if="sessionStore.selectedGameType === 'vsBot'">
		<div class="main">
			<div class="mainPlayer"></div>
			<div class="mainBot"></div>
		</div>
	</div>
	<div v-if="sessionStore.selectedGameType === 'vsPlayerLocal'">
		<local-game></local-game>
	</div>
	<div v-if="sessionStore.selectedGameType === 'vsPlayerNetwork'"></div>
</template>

<script setup lang="ts">
import LocalGame from '@/components/LocalGame.vue';
import { useSessionStore } from '@/stores/sessionStore';
const sessionStore = useSessionStore();
</script>

<style scoped></style>
