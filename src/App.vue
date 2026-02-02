<template>
	<div class="app">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script setup lang="ts"></script>

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
