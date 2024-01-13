import Image from "next/image";

import { BackGroundBlur } from "@/components/hero/bg-blur";
import { ThemeToggle } from "@/components/layout/theme/themeToggle";
import { Hamburger } from "./hamburger/Hamburger";

export function Header() {
	return (
		<header className="p-2 h-[60px] w-full flex justify-between items-center relative z-[7]">
			<div>
				<Image
					src="/favicon.png"
					width={30}
					height={30}
					alt="Logo"
					className="filter brightness-150 blur-2 drop-shadow-2xl drop-shadow-white"
				/>
			</div>
			<div className="flex space-x-2">
				<BackGroundBlur />
				<Hamburger />
				<ThemeToggle />
			</div>
		</header>
	);
}
