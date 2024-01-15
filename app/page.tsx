import { ProjectConfig } from "@/data/config";

import { Parallax } from "@/components/container/parallax";
import { SelfIntro } from "@/components/container/self-introduction";
import { Shell } from "@/components/container/shell";
import { ZennArticles } from "@/components/container/zenn-articles";
import { Hero } from "@/components/hero";
import { SEO } from "@/components/seo";

export default function Home() {
	return (
		<>
			<SEO
				top_level={`${ProjectConfig.zennId} net | ${ProjectConfig.twitterId}`}
				secondary_level={`${ProjectConfig.twitterId} portfolio`}
			/>
			<Hero />
			<SelfIntro />
			<Parallax />
			<Shell />
			<ZennArticles />
		</>
	);
}
