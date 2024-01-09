"use client";

import { FaArrowRight } from "react-icons/fa";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { hc } from "hono/client";
import { zennRPC } from "@/backend";
import { isClient } from "@/utils/fingerprint/isClient";

export function LatestArticle() {
    const [openPopup, setOpenPopup] = useState<boolean>(false);

    const client = hc<zennRPC>(isClient() ? location.origin : "http://localhost:3000");

    const getLatestArticle = async () => {
        const result = await client.zenn.getLatestArticles.$get();
        // Suspense <=> state
    }

	return (
        <>
		    <Badge variant="outline" className="mb-2 w-[200px] p-1 pl-2 pr-3 inline-flex justify-between">
			    Check my latest articles.
			    <FaArrowRight />
    		</Badge>
        </>
	);
}