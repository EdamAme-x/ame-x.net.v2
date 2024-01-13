import { Parallax } from "@/components/container/parallax";
import { SelfIntro } from "@/components/container/self-introduction";
import { Shell } from "@/components/container/shell";
import { Hero } from "@/components/hero";
import { SEO } from "@/components/seo";

export default function Home() {
	return (
		<>
			<SEO top_level="ame_x net | amex2189" secondary_level="amex2189 portfolio" />
			<Hero />
			<SelfIntro />
			<Parallax />
			<Shell />
		</>
	);
}
