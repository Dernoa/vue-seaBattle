import type { IPlacedShip, IAvailableShips } from './interfaces';
import type { ShipType } from './types';

// ==================== Класс для доски игрока ====================
export class PlayerBoard {
	placedShips: IPlacedShip[] = [];
	blockedCells: Set<string> = new Set();
	warshipsAvailable: IAvailableShips = {
		warship1: { size: 1, count: 4 },
		warship2: { size: 2, count: 3 },
		warship3: { size: 3, count: 2 },
		warship4: { size: 4, count: 1 },
	};

	get blockedCellsArray() {
		return Array.from(this.blockedCells);
	}

	get warshipsNotAvailable() {
		const { warship1, warship2, warship3, warship4 } = this.warshipsAvailable;
		return warship1.count + warship2.count + warship3.count + warship4.count === 0;
	}

	// Проверка возможности размещения
	canPlaceShip(row: number, col: number, size: number): boolean {
		if (!this.isPlaceable(row, col)) return false;
		if (col + size > 10) return false;

		for (const ship of this.placedShips) {
			if (ship.row === row) {
				if (col < ship.col + ship.size && col + size > ship.col) {
					return false;
				}
			}
		}
		return true;
	}

	// Клетки вокруг корабля
	cellsAround(
		row: number,
		col: number,
		size: number,
		orientation: 'horizontal' | 'vertical'
	): { row: number; col: number }[] {
		const result: { row: number; col: number }[] = [];
		const seen = new Set<string>();

		const addCell = (r: number, c: number) => {
			if (r >= 0 && r < 10 && c >= 0 && c < 10) {
				const key = `${r},${c}`;
				if (!seen.has(key)) {
					seen.add(key);
					result.push({ row: r, col: c });
				}
			}
		};

		for (let i = 0; i < size; i++) {
			const currentRow = orientation === 'horizontal' ? row : row + i;
			const currentCol = orientation === 'horizontal' ? col + i : col;

			for (let dr = -1; dr <= 1; dr++) {
				for (let dc = -1; dc <= 1; dc++) {
					if (dr === 0 && dc === 0) continue;
					addCell(currentRow + dr, currentCol + dc);
				}
			}
		}

		return result;
	}

	// Блокировка клеток вокруг размещённого корабля
	makeCellsNotPlaceable(
		row: number,
		col: number,
		size: number,
		orientation: 'horizontal' | 'vertical'
	) {
		const cells = this.cellsAround(row, col, size, orientation);
		cells.forEach((cell) => {
			this.blockedCells.add(`${cell.row}-${cell.col}`);
		});
	}

	// Проверка, свободна ли клетка
	isPlaceable(row: number, col: number): boolean {
		return !this.blockedCells.has(`${row}-${col}`);
	}

	// Размещение корабля
	placeShip(row: number, col: number, shipData: any) {
		const shipId = shipData.id as string;
		const shipType = shipId.split('-')[0] as ShipType;
		const size = shipData.size;

		if (this.warshipsAvailable[shipType].count <= 0) {
			alert('There are no ships of this type available.');
			return;
		}

		if (!this.canPlaceShip(row, col, size)) {
			console.warn("You can't place a ship here");
			return;
		}

		this.warshipsAvailable[shipType].count--;

		this.placedShips.push({
			id: shipId,
			size: size,
			row,
			col,
			src: shipData.src,
		});

		this.makeCellsNotPlaceable(row, col, size, 'horizontal');
	}
}

// ==================== Класс для управления игрой ====================
export class Game {
	players: PlayerBoard[];
	currentPlayerIndex: number = 0;
	turnCounter: number = 0;

	constructor(player1: PlayerBoard, player2: PlayerBoard) {
		this.players = [player1, player2];
	}

	nextTurn = () => {
		this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
		this.turnCounter++;
	};
}
