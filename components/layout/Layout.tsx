import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col w-full min-h-screen">
			<Header />
			{children}
			<Footer />
		</div>
	);
}
