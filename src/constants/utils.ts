type TargetFunction<T extends any[], R> = (...args: T) => R;

export function everySecondCall<T extends any[], R>(fn: TargetFunction<T, R>, argToChange: number) {
	let callCount = 0;

	return function (this: any, ...args: T): R | void {
		callCount++;
		// Выполняем основную функцию всегда
		const result = fn.apply(this, args);

		if (callCount % 2 === 0) {
			argToChange++;
		}
		return result;
	};
}
