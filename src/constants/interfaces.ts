export interface IPlacedShip {
	id: string;
	size: number;
	row: number;
	col: number;
	src: string;
}

export interface IAvailableShips {
	warship1: { size: number; count: number };
	warship2: { size: number; count: number };
	warship3: { size: number; count: number };
	warship4: { size: number; count: number };
}

export interface IPlacedShip {
	id: string;
	size: number;
	row: number;
	col: number;
	src: string;
}