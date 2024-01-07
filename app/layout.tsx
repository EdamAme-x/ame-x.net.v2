import { Inter } from "next/font/google";

import "./globals.css";

import { FakeComponents } from "@/components/fake/fakeComponents";
import { Layout } from "@/components/layout/Layout";

export { metadata } from "@/data/metadata";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<body className={inter.className}>
				<FakeComponents>
					<Layout>{children}</Layout>
				</FakeComponents>
			</body>
		</html>
	);
}
