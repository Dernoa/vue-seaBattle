<template>
	<div class="warshipsList">
		<h3>Warships Available:</h3>

		<div v-for="warship in warships" :key="warship.size">
			<DraggableShip
				v-for="count in warship.count"
				:key="`warship${warship.size}-${count}`"
				:src="`/images/BoatH${warship.size}.png`"
				:width="`${warship.size * CELL_SIZE}px`"
				:height="`${CELL_SIZE}px`"
				:size="warship.size"
				:id="`warship${warship.size}-${count}`"
				:change-orientation-is-possible="true"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import DraggableShip from './DraggableShip.vue';

import { CELL_SIZE } from '@/constants/constants';

import type { IAvailableShips } from '@/constants/interfaces';

const props = defineProps<{
	warshipsAvailable: IAvailableShips;
}>();

const warships = Object.values(props.warshipsAvailable);
</script>

