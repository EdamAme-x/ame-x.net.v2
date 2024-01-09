import { Label } from "@/components/ui/label";
import { Hero3D } from "./3d";
import { LatestArticle } from "./latestArticle";

export function Hero() {
	return (
		<div className="w-full h-[75vh] flex items-center">
			<Label className="flex flex-col w-screen absolute z-[6] sm:relative sm:w-1/2 sm:z-[1] px-3 sm:pl-5 select-none">
				<LatestArticle />
				<span className="text-4xl font-bold">Welcome to</span>
				<span className="text-6xl font-bold text-gradient">Amex Portfolio</span>
			</Label>
			<Hero3D />
		</div>
	);
}
