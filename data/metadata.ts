import type { Metadata } from "next";
import { ProjectConfig } from "./config";

const url = ProjectConfig.url
const icon = "favicon.png"
const siteName = "Amex Net";
const description = "This is a portfolio site maintained by @amex2189. Well, don't think it's just a portfolio :)";

export const metadata: Metadata = {
	metadataBase: new URL(url),
	title: `${siteName}`,
	description,
	openGraph: {
		title: siteName,
		description,
		url,
		siteName,
		locale: "ja_JP",
		type: "website",
		images: icon
	},
	icons: icon,
	verification: {
		google: ""
	},
};