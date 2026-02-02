<template>
	<div>
		<button class="btn">
			<slot></slot>
		</button>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.btn {
	padding: 10px;
	margin: 10px;
	height: 5vh;
	width: 30vw;
}
</style>
