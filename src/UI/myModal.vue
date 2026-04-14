<template>
	<Teleport to="body">
		<div v-if="modelValue" class="modalOverlay" @click="handleOverlayClick">
			<div
				class="modalWindow"
				role="dialog"
				aria-modal="true"
				:aria-label="title || 'Modal window'"
				@click.stop
			>
				<div class="modalHeader">
					<h2 v-if="title" class="modalTitle">{{ title }}</h2>
					<button
						v-if="showCloseButton"
						type="button"
						class="modalCloseButton"
						aria-label="Close modal"
						@click="closeModal"
					>
						X
					</button>
				</div>

				<div class="modalContent">
					<slot></slot>
				</div>

				<div v-if="$slots['actions']" class="modalActions">
					<slot name="actions"></slot>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const props = withDefaults(
	defineProps<{
		modelValue: boolean;
		title?: string;
		closeOnOverlay?: boolean;
		closeOnEscape?: boolean;
		showCloseButton?: boolean;
	}>(),
	{
		title: '',
		closeOnOverlay: true,
		closeOnEscape: true,
		showCloseButton: true,
	}
);

const emit = defineEmits<{
	'update:modelValue': [value: boolean];
	close: [];
}>();

const closeModal = () => {
	emit('update:modelValue', false);
	emit('close');
};

const handleOverlayClick = () => {
	if (props.closeOnOverlay) {
		closeModal();
	}
};

const handleKeydown = (event: KeyboardEvent) => {
	if (event.key === 'Escape' && props.modelValue && props.closeOnEscape) {
		closeModal();
	}
};

onMounted(() => {
	window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
	window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.modalOverlay {
	position: fixed;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 24px;
	background-color: rgba(0, 0, 0, 0.55);
	z-index: 1000;
}

.modalWindow {
	width: min(90vw, 640px);
	max-height: 90vh;
	overflow-y: auto;
	padding: 24px;
	border-radius: 16px;
	background-color: #ffffff;
	box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}

.modalHeader {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
}

.modalTitle {
	text-align: left;
}

.modalCloseButton {
	min-width: 40px;
	height: 40px;
	border: 1px solid #9e9e9e;
	border-radius: 8px;
	background-color: #f5f5f5;
	cursor: pointer;
}

.modalContent {
	margin-top: 16px;
	text-align: left;
}

.modalActions {
	display: flex;
	justify-content: flex-end;
	flex-wrap: wrap;
	margin-top: 24px;
}
</style>
