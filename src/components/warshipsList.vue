<template>
	<div class="warshipsList">
		<h3>Warships Available:</h3>
		<div v-for="warship in warshipsAvailable.warship1.available" :key="`warship1-${warship}`">
			<img
				src="../images/BoatH1.png"
				width="40px"
				height="40px"
				draggable="true"
				data-size="1"
				:id="`warship1-${warship}`"
				@dragstart="onDragStart($event)"
			/>
		</div>
		<div v-for="warship in warshipsAvailable.warship2.available" :key="`warship2-${warship}`">
			<img
				src="../images/BoatH2.png"
				width="80px"
				height="40px"
				draggable="true"
				data-size="2"
				:id="`warship2-${warship}`"
				@dragstart="onDragStart($event)"
			/>
		</div>
		<div v-for="warship in warshipsAvailable.warship3.available" :key="`warship3-${warship}`">
			<img
				src="../images/BoatH3.png"
				width="120px"
				height="40px"
				draggable="true"
				data-size="3"
				:id="`warship3-${warship}`"
				@dragstart="onDragStart($event)"
			/>
		</div>
		<div v-for="warship in warshipsAvailable.warship4.available" :key="`warship4-${warship}`">
			<img
				src="../images/BoatH4.png"
				width="160px"
				height="40px"
				draggable="true"
				data-size="4"
				:id="`warship4-${warship}`"
				@dragstart="onDragStart($event)"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useDragStore } from '@/stores/dragStore';

const dragStore = useDragStore();

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

function onDragStart(event: Event) {
	dragStore.dragItem = event.target as HTMLElement;
}
</script>

<style scoped></style>
