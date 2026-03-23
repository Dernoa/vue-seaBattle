<template>
	<DnDProvider>
		<div class="app">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
	</DnDProvider>
</template>

<script setup lang="ts">
import { DnDProvider } from '@vue-dnd-kit/core';
</script>

<style>
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	font-family: monospace;
	font-size: 2vh;
	text-align: center;
}
* h1 {
	font-size: 4vh;
}
* h2 {
	font-size: 3vh;
}
</style>
