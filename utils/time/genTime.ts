export function genTime(): string {
	const date = new Date();

	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	return `${hours}:${minutes}:${seconds}`;
}
