import { useRef } from "react";
import gsap from "gsap";

import { Card } from "@/components/ui/card";

export function Parallax() {
	return (
		<>
			<div className="w-full min-h-[500px] flex justify-center items-center">
				<Card className="w-4/5 sm:w-3/4 h-4/5 sm:h-3/4 min-h-[400px]"></Card>
			</div>
		</>
	);
}
