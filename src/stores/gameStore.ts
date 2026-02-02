import { defineStore } from 'pinia';

export const useGameStore = defineStore('gameStore', {
	state: () => ({
		playField: Array(10)
			.fill(null)
			.map(() => Array(10).fill(0)) as number[][],
		playField2: Array(10)
			.fill(null)
			.map(() => Array(10).fill(0)) as number[][],
	}),
	actions: {
		initializeShip(x: number, y: number, size: number) {
			if (y >= 0 && y < 10 && x >= 0 && x + size <= 10) {
				for (let i = x; i < x + size; i++) {
					this.playField[y]![i] = 1;
				}
			}
		},
	},
});
