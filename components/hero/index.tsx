import { Hero3D } from "./3d";

export function Hero() {
	return (
		<div className="w-full h-[75vh] p-4 flex items-center">
			<h1 className="flex flex-col w-1/2 pl-5">
				<span className="text-4xl font-bold">Welcome to</span>
				<span className="text-6xl font-bold text-gradient">Amex Portfolio</span>
			</h1>
			<Hero3D />
		</div>
	);
}
