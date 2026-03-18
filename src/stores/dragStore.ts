import { defineStore } from 'pinia';

export const useDragStore = defineStore('dragStore', {
	state: () => ({
		dragItem: null as HTMLElement | null,
	}),
	actions: {},
});
