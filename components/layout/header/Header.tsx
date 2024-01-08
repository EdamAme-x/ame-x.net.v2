import { ThemeToggle } from "@/components/layout/theme/themeToggle";
import Image from "next/image";

export function Header() {
	return <header className="p-2 h-[60px] w-full flex justify-between items-center">
		<div>
			<Image src="/favicon.png" width={30} height={30} alt="Logo" className="filter brightness-150 blur-2 drop-shadow-2xl drop-shadow-white" />
		</div>
		<ThemeToggle />
	</header>;
}
