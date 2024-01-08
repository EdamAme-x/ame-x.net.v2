import * as crypto from "crypto";

export function genHash(text: string): string {
	const hash = crypto.createHash("md5").update(text).digest("hex");

	const firstPart = hash.substring(0, 8);
	const secondPart = hash.substring(8, 16);

	return `${firstPart}-${secondPart}`;
}
