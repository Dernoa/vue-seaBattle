import { defineStore } from 'pinia';
import type { GameMode } from '@/constants/types';

export const useSessionStore = defineStore('sessionStore', {
	state: () => ({
		playerNickname: 'Player 1',
		player2Nickname: 'Player 2',
		selectedGameMode: null as GameMode | null,
	}),
	actions: {
		setGameType(type: GameMode) {
			this.selectedGameMode = type;
		},
		setFirstPlayerNickname(value: string) {
			this.playerNickname = value;
		},
		setSecondPlayerNickname(value: string) {
			this.player2Nickname = value;
		},
	},
});
