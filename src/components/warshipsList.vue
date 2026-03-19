<template>
	<div class="warshipsList">
		<h3>Warships Available:</h3>
		<div v-for="warship in warshipsAvailable.warship1.available" :key="`warship1-${warship}`">
			<DraggableShip
				src="../images/BoatH1.png"
				width="40px"
				height="40px"
				:size="1"
				:id="`warship1-${warship}`"
			/>
		</div>
		<div v-for="warship in warshipsAvailable.warship2.available" :key="`warship2-${warship}`">
			<DraggableShip
				src="../images/BoatH2.png"
				width="80px"
				height="40px"
				:size="2"
				:id="`warship2-${warship}`"
			/>
		</div>
		<div v-for="warship in warshipsAvailable.warship3.available" :key="`warship3-${warship}`">
			<DraggableShip
				src="../images/BoatH3.png"
				width="120px"
				height="40px"
				:size="3"
				:id="`warship3-${warship}`"
			/>
		</div>
		<div v-for="warship in warshipsAvailable.warship4.available" :key="`warship4-${warship}`">
			<DraggableShip
				src="../images/BoatH4.png"
				width="160px"
				height="40px"
				:size="4"
				:id="`warship4-${warship}`"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import DraggableShip from './DraggableShip.vue';


const warshipsAvailable = reactive({
	warship1: {
		size: 1,
		available: 4,
	},
	warship2: {
		size: 2,
		available: 3,
	},
	warship3: {
		size: 3,
		available: 2,
	},
	warship4: {
		size: 4,
		available: 1,
	},
});

</script>

<style scoped></style>
