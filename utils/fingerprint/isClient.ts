export function isClient(): boolean {
	return typeof window !== "undefined";
}
