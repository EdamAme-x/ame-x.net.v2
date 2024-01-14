import { Inter } from "next/font/google";

import "./globals.css";

import { getIP } from "@/utils/fingerprint/getIP";

import { FakeComponents } from "@/components/fake/fakeComponents";
import { Layout } from "@/components/layout/Layout";
import { ThemeProvider } from "@/components/layout/theme/themeProvider";

export { metadata } from "@/data/metadata";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<head></head>
			<body className={inter.className} id={getIP()}>
				<FakeComponents>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<Layout>{children}</Layout>
					</ThemeProvider>
				</FakeComponents>
			</body>
		</html>
	);
}
