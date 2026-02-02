<template>
	<div>
		<input
			:type="inputType"
			:placeholder="placeholder"
			:value="modelValue"
			@input="handleInput"
			class="input"
		/>
	</div>
</template>

<script setup lang="ts">
defineProps({
	inputType: {
		type: String,
		required: true,
	},
	placeholder: {
		type: String,
	},
	modelValue: {
		type: String,
		default: '',
	},
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('update:modelValue', target.value);
};
</script>

<style scoped>
.input {
	padding: 10px;
	margin: 10px;
}
</style>
