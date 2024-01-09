import { Label } from "@/components/ui/label";
import { Hero3D } from "./3d";
import { LatestArticle } from "./latestArticle";

export function Hero() {
	return (
		<div className="w-full h-[75vh] p-4 flex items-center">
			<Label className="flex flex-col w-1/2 pl-5">
				<LatestArticle />
				<span className="text-4xl font-bold">Welcome to</span>
				<span className="text-6xl font-bold text-gradient">Amex Portfolio</span>
			</Label>
			<Hero3D />
		</div>
	);
}
