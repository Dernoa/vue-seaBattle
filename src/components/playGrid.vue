<template>
	<div class="gridContainer" :id="boardId">
		<div v-for="col in 10" :key="col" class="col">
			<DroppableCell
				v-for="row in 10"
				:key="row"
				class="cell"
				:row="row - 1"
				:col="col - 1"
				:id="`${row - 1}-${col - 1}`"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import DroppableCell from './DroppableCell.vue';

const props = defineProps({
	boardId: {
		type: String,
		required: true,
	},
});

</script>

<style scoped>
.gridContainer {
	display: grid;
	width: 400px;
	height: 400px;
	margin: 20px;
	grid-template-columns: repeat(10, 40px);
	grid-template-rows: repeat(10, 40px);
	background-color: #e3f2fd;
	border: 2px solid #1976d2;
}
.drop-zone {
	width: 40px;
	height: 40px;
	border: 2px solid #1976d2;
}

</style>
