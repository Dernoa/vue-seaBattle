import type { Orientation } from './types';

export interface IPlacedShip {
	id: string;
	size: number;
	row: number;
	col: number;
	orientation: Orientation;
	src: string;
}

export interface IBoardCell {
	row: number;
	col: number;
}

export interface IAvailableShips {
	warship1: { size: number; count: number };
	warship2: { size: number; count: number };
	warship3: { size: number; count: number };
	warship4: { size: number; count: number };
}

export interface IDragShipData {
	id: string;
	size: number;
	width: string;
	height: string;
	orientation: Orientation;
	src: string;
}

export interface IShotsFired {
	row: number;
	col: number;
	hittedTheShip: boolean;
}
