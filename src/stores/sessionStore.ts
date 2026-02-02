import { defineStore } from 'pinia';

export const useSessionStore = defineStore('sessionStore', {
	state: () => ({
		playerNickname: 'Player 1',
        player2Nickname: 'Player 2',
		gameTypes: ['vsBot', 'vsPlayerLocal', 'vsPlayerNetwork'],
		selectedGameType: '',
	}),
	actions: {
		setGameType(type: number) {
			if (type in this.gameTypes) {
				this.selectedGameType = this.gameTypes[type]!;
			}
		},
		setFirstPlayerNickname(value: string) {
			this.playerNickname = value;
		},
		setSecondPlayerNickname(value: string) {
			this.player2Nickname = value;
		},
	},
});
