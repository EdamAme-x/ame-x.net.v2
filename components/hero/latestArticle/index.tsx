"use client";

import { zennRPC } from "@/backend";
import { isClient } from "@/utils/fingerprint/isClient";
import { hc } from "hono/client";
import { FaArrowRight } from "react-icons/fa";

import { Badge } from "@/components/ui/badge";
import { ZennPopup } from "@/components/zenn/popup";

export function LatestArticle() {
	const client = hc<zennRPC>(isClient() ? location.origin + "/api" : "http://localhost:3000/api");

	const getLatestArticle = async () => {
		return (
			(await (await client.zenn.getLatestArticles.$get()).json()) ?? {
				title: "Error"
			}
		);
	};

	return (
		<div>
			<ZennPopup
				getArticle={getLatestArticle}
				triggerUI={
					<Badge variant="outline" className="mb-2 w-[200px] p-1 pl-2 pr-3 inline-flex justify-between">
						Check my latest articles.
						<FaArrowRight />
					</Badge>
				}
			/>
		</div>
	);
}
