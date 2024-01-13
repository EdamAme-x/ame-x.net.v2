import { Label } from "@/components/ui/label";
import { Hero3D } from "./3d";
import { BackGroundBlur } from "./bg-blur";
import { LatestArticle } from "./latestArticle";

export function Hero() {
	return (
		<div className="w-full min-h-[80vh] flex flex-wrap items-center">
			<Label className="flex flex-col w-screen absolute z-[6] sm:relative sm:w-1/2 sm:z-[1] px-3 sm:pl-10 select-none">
				<LatestArticle />
				<BackGroundBlur />
				<span className="text-3xl md:text-4xl font-bold relative flex place-items-center">Welcome to</span>
				<span className="text-5xl md:text-6xl font-bold text-gradient relative flex place-items-center">
					Amex Portfolio
				</span>
			</Label>
			<Hero3D />
		</div>
	);
}
