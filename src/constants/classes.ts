import type { IPlacedShip, IAvailableShips, IDragShipData, IShotsFired } from './interfaces';
import type { ShipType, Orientation } from './types';

export class PlayerBoard {
	placedShips: IPlacedShip[] = [];
	blockedCells: Set<string> = new Set();
	shipCellsMap: Map<number, Map<number, boolean>> = new Map();
	shotsFired: IShotsFired[] = [];
	shipsHidden: boolean = false;
	warshipsAvailable: IAvailableShips = {
		warship1: { size: 1, count: 4 },
		warship2: { size: 2, count: 3 },
		warship3: { size: 3, count: 2 },
		warship4: { size: 4, count: 1 },
	};

	constructor() {
		for (let row = 0; row < 10; row++) {
			const cols = new Map<number, boolean>();

			for (let col = 0; col < 10; col++) {
				cols.set(col, false);
			}

			this.shipCellsMap.set(row, cols);
		}
	}

	get blockedCellsArray() {
		return Array.from(this.blockedCells);
	}

	get warshipsNotAvailable() {
		const { warship1, warship2, warship3, warship4 } = this.warshipsAvailable;
		return warship1.count + warship2.count + warship3.count + warship4.count === 0;
	}

	canPlaceShip(row: number, col: number, size: number, orientation: Orientation): boolean {
		if (orientation === 'horizontal') {
			if (col < 0 || col + size > 10 || row < 0 || row >= 10) return false;
		} else {
			if (row < 0 || row + size > 10 || col < 0 || col >= 10) return false;
		}

		for (let i = 0; i < size; i++) {
			const currentRow = orientation === 'horizontal' ? row : row + i;
			const currentCol = orientation === 'horizontal' ? col + i : col;

			if (this.blockedCells.has(`${currentRow}-${currentCol}`)) {
				return false;
			}
		}

		return true;
	}

	cellsAround(
		row: number,
		col: number,
		size: number,
		orientation: Orientation
	): { row: number; col: number }[] {
		const result: { row: number; col: number }[] = [];
		const seen = new Set<string>();

		const addCell = (row: number, col: number) => {
			if (row >= 0 && row < 10 && col >= 0 && col < 10) {
				const key = `${row}-${col}`;
				if (!seen.has(key)) {
					seen.add(key);
					result.push({ row: row, col: col });
				}
			}
		};

		for (let i = 0; i < size; i++) {
			const currentRow = orientation === 'horizontal' ? row : row + i;
			const currentCol = orientation === 'horizontal' ? col + i : col;

			for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
				for (let colOffset = -1; colOffset <= 1; colOffset++) {
					addCell(currentRow + rowOffset, currentCol + colOffset);
				}
			}
		}

		return result;
	}

	makeCellsNotPlaceable(row: number, col: number, size: number, orientation: Orientation) {
		const cells = this.cellsAround(row, col, size, orientation);
		cells.forEach((cell) => {
			this.blockedCells.add(`${cell.row}-${cell.col}`);
		});
	}

	isPlaceable(row: number, col: number): boolean {
		return !this.blockedCells.has(`${row}-${col}`);
	}

	hasShipAt(row: number, col: number): boolean {
		return this.shipCellsMap.get(row)?.get(col) ?? false;
	}

	markShipCells(row: number, col: number, size: number, orientation: Orientation) {
		for (let i = 0; i < size; i++) {
			const currentRow = orientation === 'horizontal' ? row : row + i;
			const currentCol = orientation === 'horizontal' ? col + i : col;

			this.shipCellsMap.get(currentRow)?.set(currentCol, true);
		}
	}

	placeShip(row: number, col: number, shipData: IDragShipData) {
		const shipId = shipData.id;
		const shipType = shipId.split('-')[0] as ShipType;
		const size = shipData.size;

		if (this.warshipsAvailable[shipType].count <= 0) {
			alert('There are no ships of this type available.');
			return;
		}

		if (!this.canPlaceShip(row, col, size, shipData.orientation)) {
			alert("You can't place a ship here");
			return;
		}

		this.warshipsAvailable[shipType].count--;

		this.placedShips.push({
			id: shipId,
			size: size,
			row,
			col,
			orientation: shipData.orientation,
			src: shipData.src,
		});

		this.markShipCells(row, col, size, shipData.orientation);
		this.makeCellsNotPlaceable(row, col, size, shipData.orientation);
	}

	hideShips() {
		this.shipsHidden = true;
	}

	showShips() {
		this.shipsHidden = false;
	}

	hasShotAt(row: number, col: number): boolean {
		return this.shotsFired.some((shot) => shot.row === row && shot.col === col);
	}

	didShotHitAt(row: number, col: number): boolean {
		return this.shotsFired.find((shot) => shot.row === row && shot.col === col)?.hittedTheShip ?? false;
	}

	makeShot(row: number, col: number): boolean {
		if (this.hasShotAt(row, col)) {
			return false;
		}

		this.shotsFired.push({
			row,
			col,
			hittedTheShip: this.hasShipAt(row, col),
		});

		return true;
	}
}

export class Game {
	players: PlayerBoard[];
	currentPlayerIndex: number = 0;
	turnCounter: number = 0;

	constructor(player1: PlayerBoard, player2: PlayerBoard) {
		this.players = [player1, player2];
	}

	nextTurn() {
		if (this.currentPlayerIndex === 1) {
		this.turnCounter++;
		}

		this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
	}
}
