import { genHash } from "./genHash";

export function getFingerprint() {
	const userAgent = navigator.userAgent;
	const width = window.innerWidth.toString(36);
	const height = window.innerHeight.toString(36);
	const lang = navigator.language;

	return genHash(userAgent + width + height + lang);
}
