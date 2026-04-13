const STORAGE_KEYS = {
	PLAYER1_NAME: 'seaBattle_player1_name',
	PLAYER2_NAME: 'seaBattle_player2_name',
	WANT_PLAY_LOCAL: 'seaBattle_want_play_local',
	MODAL_SEEN: 'seaBattle_modal_seen'
};

export function useLocalStorage() {
		function savePlayer1Name(name: string) {
		if (name.trim()) {
			localStorage.setItem(STORAGE_KEYS.PLAYER1_NAME, name.trim());
		}
	}
		function loadPlayer1Name(): string | null {
		return localStorage.getItem(STORAGE_KEYS.PLAYER1_NAME);
	}
		function savePlayer2Name(name: string) {
		if (name.trim()) {
			localStorage.setItem(STORAGE_KEYS.PLAYER2_NAME, name.trim());
		}
	}
		function loadPlayer2Name(): string | null {
		return localStorage.getItem(STORAGE_KEYS.PLAYER2_NAME);
	}
	
	function saveWantPlayLocal(value: boolean) {
		localStorage.setItem(STORAGE_KEYS.WANT_PLAY_LOCAL, String(value));
	}
	
	function loadWantPlayLocal(): boolean {
		const saved = localStorage.getItem(STORAGE_KEYS.WANT_PLAY_LOCAL);
		return saved === 'true';
	}
	
	function saveModalSeen(value: boolean) {
		localStorage.setItem(STORAGE_KEYS.MODAL_SEEN, String(value));
	}
	
	function loadModalSeen(): boolean {
		const saved = localStorage.getItem(STORAGE_KEYS.MODAL_SEEN);
		return saved === 'true';
	}
	
	function clearAllData() {
		localStorage.removeItem(STORAGE_KEYS.PLAYER1_NAME);
		localStorage.removeItem(STORAGE_KEYS.PLAYER2_NAME);
		localStorage.removeItem(STORAGE_KEYS.WANT_PLAY_LOCAL);
		localStorage.removeItem(STORAGE_KEYS.MODAL_SEEN);
	}
	
	function loadAllData() {
		return {
			player1Name: loadPlayer1Name(),
			player2Name: loadPlayer2Name(),
			wantPlayLocal: loadWantPlayLocal(),
			modalSeen: loadModalSeen()
		};
	}
	
	return {
		savePlayer1Name,
		loadPlayer1Name,
		savePlayer2Name,
		loadPlayer2Name,
		saveWantPlayLocal,
		loadWantPlayLocal,
		saveModalSeen,
		loadModalSeen,
		clearAllData,
		loadAllData
	};
}