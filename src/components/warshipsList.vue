<template>
	<div class="warshipsList">
		<h3>Warships Available:</h3>
		<div v-for="warship in warshipsAvailable.warship1.count" :key="`warship1-${warship}`">
			<DraggableShip
				src="../images/BoatH1.png"
				width="40px"
				height="40px"
				:size="1"
				:id="`warship1-${warship}`"
				:change-orientation-is-possible="true"
			/>
		</div>
		<div v-for="warship in warshipsAvailable.warship2.count" :key="`warship2-${warship}`">
			<DraggableShip
				src="../images/BoatH2.png"
				width="80px"
				height="40px"
				:size="2"
				:id="`warship2-${warship}`"
				:change-orientation-is-possible="true"
			/>
		</div>
		<div v-for="warship in warshipsAvailable.warship3.count" :key="`warship3-${warship}`">
			<DraggableShip
				src="../images/BoatH3.png"
				width="120px"
				height="40px"
				:size="3"
				:id="`warship3-${warship}`"
				:change-orientation-is-possible="true"
			/>
		</div>
		<div v-for="warship in warshipsAvailable.warship4.count" :key="`warship4-${warship}`">
			<DraggableShip
				src="../images/BoatH4.png"
				width="160px"
				height="40px"
				:size="4"
				:id="`warship4-${warship}`"
				:change-orientation-is-possible="true"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import DraggableShip from './DraggableShip.vue';

import type { IAvailableShips } from '@/constants/interfaces';

const props = defineProps<{
	warshipsAvailable: IAvailableShips;
}>();
</script>

<style scoped></style>
