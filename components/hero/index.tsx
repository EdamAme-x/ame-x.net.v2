import { Label } from "@/components/ui/label";
import { Hero3D } from "./3d";
import { LatestArticle } from "./latestArticle";

export function Hero() {
	return (
		<div className="w-full h-[75vh] flex items-center">
			<Label className="flex flex-col w-screen absolute z-[6] sm:relative sm:w-1/2 sm:z-[1] px-3 sm:pl-10 select-none">
				<LatestArticle />
				<span className="text-4xl font-bold relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-50 before:lg:h-[360px] z-[-1]">
					Welcome to
				</span>
				<span className="text-6xl font-bold text-gradient relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-50 before:lg:h-[360px] z-[-1]">
					Amex Portfolio
				</span>
			</Label>
			<Hero3D />
		</div>
	);
}
