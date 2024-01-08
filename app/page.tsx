import Image from "next/image";

import { Hero } from "@/components/hero";
import { SEO } from "@/components/seo";

export default function Home() {
	return (
		<>
			<SEO top_level="ame_x net | amex2189" />
			<Hero />
		</>
	);
}
