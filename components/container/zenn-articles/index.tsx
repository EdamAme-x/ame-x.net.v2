"use client";

import { Suspense, useEffect, useState } from "react";
import { zennRPC } from "@/backend";
import { Article } from "@/backend/controller/zenn/getArticles";
import { isClient } from "@/utils/fingerprint/isClient";
import { hc } from "hono/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CreateContext } from "@/components/zenn/popup";

export function ZennArticles() {
	const [articles, setArticles] = useState<Article[] | null>(null);

	useEffect(() => {
		const client = hc<zennRPC>(isClient() ? location.origin + "/api" : "http://localhost:3000/api");
		client.zenn.getArticles
			.$get()
			.then(res => res.json())
			.then(data => {
				setArticles(data);
			})
			.catch(console.log);
	}, []);

	return (
		<div className="w-full flex justify-center">
			<Carousel className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[1000px] mt-4">
				<Suspense fallback={<ZennArticlesFallback />}>
					{articles ? <ZennArticlesResult articles={articles} /> : null}
				</Suspense>
			</Carousel>
		</div>
	);
}

function ZennArticlesFallback() {
	return (
		<>
			<CarouselContent className="-ml-1">
				<CarouselItem className="pl-1 md:basis-1/2">
					<div className="p-1">
						<Card>
							<CardContent className="w-full h-full">
								<CreateContext
									title="Loading..."
									emoji="🤔"
									like={218}
									comments={9}
									date={new Date().toLocaleString().split(" ")[0]}
								/>
								<Button className="mx-1 w-full">Read</Button>
							</CardContent>
						</Card>
					</div>
				</CarouselItem>
				<CarouselItem className="pl-1 md:basis-1/2">
					<div className="p-1">
						<Card>
							<CardContent className="w-full h-full">
								<CreateContext
									title="Loading..."
									emoji="🤔"
									like={218}
									comments={9}
									date={new Date().toLocaleString().split(" ")[0]}
								/>
								<Button className="mx-1 w-full">Read</Button>
							</CardContent>
						</Card>
					</div>
				</CarouselItem>
			</CarouselContent>
		</>
	);
}

function ZennArticlesResult({ articles }: { articles: Article[] }) {
	function openArticle(url: string) {
		window.open(url, "_blank");
	}

	return (
		<>
			<CarouselContent className="-ml-1">
				{articles.map((article, index) => (
					<CarouselItem key={index} className="pl-1 md:basis-1/2">
						<div className="p-1">
							<Card>
								<CardContent className="w-full h-full">
									<CreateContext
										title={article.title}
										emoji={article.emoji}
										like={article.liked_count}
										comments={article.comments_count}
										date={article.proxy.date.split(" ")[0]}
									/>
									<Button className="mx-1 w-full" onClick={() => openArticle(article.proxy.url)}>
										Read
									</Button>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</>
	);
}
