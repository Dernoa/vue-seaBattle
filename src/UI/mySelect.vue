<template>
	<div>
		<select v-model="value" @change="sendValue">
			<option disabled value="">Choose</option>
			<option v-for="(option, index) in options" :key="index" :value="option">
				{{ option }}
			</option>
		</select>
	</div>
</template>

<script setup lang="ts">
let value;

const emit = defineEmits(['changeOption']);

function sendValue() {
	emit('changeOption', value);
}

defineProps({
	options: {
		type: Array,
		required: true,
	},
});
</script>

<style scoped></style>
