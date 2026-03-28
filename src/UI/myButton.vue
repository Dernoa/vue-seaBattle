<template>
	<button class="btn" @click="$emit('click', $event)">
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
defineEmits(['click']);
</script>

<style scoped>
.btn {
	padding: 10px;
	margin: 10px;
	height: 5vh;
	width: 30vw;
}
</style>
