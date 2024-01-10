export function allSameValue(arr: string[]) {
	return arr.every((val, i, arr) => val === arr[0]);
}
