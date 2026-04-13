<!-- UI/myButton.vue -->
<template>
	<button 
		:class="['btn', `btn-${variant}`]"
		:disabled="disabled"
		@click="$emit('click')"
	>
		<slot />
	</button>
</template>

<script setup lang="ts">
defineProps<{
	variant?: 'primary' | 'secondary' | 'success' | 'info' | 'danger';
	disabled?: boolean;
}>();

defineEmits<{
	click: [];
}>();
</script>

<style scoped>
.btn {
	padding: 10px 20px;
	border: none;
	border-radius: 12px;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	display: inline-flex;
	align-items: center;
	gap: 8px;
}

.btn:hover:not(:disabled) {
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:active:not(:disabled) {
	transform: translateY(0);
}

.btn:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.btn-primary {
	background:  #7382c6;
	color: white;
}

.btn-secondary {
	background-color: #6c757d;
	color: white;
}

.btn-success {
	background-color: #28a745;
	color: white;
}

.btn-info {
	background-color: #17a2b8;
	color: white;
}

.btn-danger {
	background-color: #dc3545;
	color: white;
}
</style>