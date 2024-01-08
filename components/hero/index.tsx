import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Hero3D } from "./3d";
import { FaArrowRight } from "react-icons/fa";

export function Hero() {
	return (
		<div className="w-full h-[75vh] p-4 flex items-center">
			<Label className="flex flex-col w-1/2 pl-5">
				<Badge variant="outline" className="mb-2 max-w-[200px] p-1 pl-2 pr-3 inline-flex justify-between">
					Check my latest articles.
					<FaArrowRight />
				</Badge>
				<span className="text-4xl font-bold">Welcome to</span>
				<span className="text-6xl font-bold text-gradient">Amex Portfolio</span>
			</Label>
			<Hero3D />
		</div>
	);
}
