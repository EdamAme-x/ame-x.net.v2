import { Suspense } from "react";
import type { Article } from "@/backend/controller/zenn/getArticles";
import { FaClock, FaComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export function ZennPopup({
	getArticle,
	triggerUI
}: {
	getArticle: () => Promise<Article>;
	triggerUI: React.ReactNode;
}) {
	return (
		<Dialog>
			<DialogTrigger>{triggerUI}</DialogTrigger>
			<DialogContent>
				<Suspense fallback={<ZennPopupFallback />}>
					<ZennPopupContent getArticle={getArticle} />
				</Suspense>
			</DialogContent>
		</Dialog>
	);
}

export function ZennPopupFallback() {
	return (
		<>
			<CreateContext
				title="Loading..."
				emoji="🤔"
				like="218"
				comments="9"
				date={new Date().toLocaleString().split(" ")[0]}
			/>
			<Button className="mx-1">Read</Button>
		</>
	);
}

export function ZennPopupContent({ getArticle }: { getArticle: () => Promise<Article> }) {
	const result = getArticle();

	const openArticle = async () => {
		const article = await result;
		window.open(article.proxy.url, "_blank");
	};

	return (
		<>
			<CreateContext
				title={result.then(article => article.title) as unknown as string}
				emoji={result.then(article => article.emoji) as unknown as string}
				like={result.then(article => article.liked_count) as unknown as string}
				comments={result.then(article => article.comments_count) as unknown as string}
				date={result.then(article => article.proxy.date.split(" ")[0]) as unknown as string}
			/>
			<Button className="mx-1" onClick={() => openArticle()}>
				Read
			</Button>
		</>
	);
}

export function CreateContext(props: { emoji: string; title: string; like: string; comments: string; date: string }) {
	return (
		<>
			<div className="flex w-full items-center mt-5">
				<Label className="w-[125px] h-[125px] flex justify-center items-center text-6xl">{props.emoji}</Label>
				<Card className="w-full">
					<CardHeader className="p-5 pt-2 pb-1">
						<CardTitle className="text-sm opacity-[0.8] leading-3 py-2">Title</CardTitle>
					</CardHeader>
					<CardContent className="text-xs sm:text-sm max-h-[105px]">
						{props.title.length > 35 ? props.title.slice(0, 35) + "..." : props.title}
					</CardContent>
				</Card>
			</div>
			<div className="flex flex-wrap w-full justify-center items-center my-3 gap-3">
				<Card className="min-w-[100px] max-w-1/2">
					<CardHeader className="p-5 pt-2 pb-1">
						<CardTitle className="text-sm opacity-[0.8] leading-3 py-2">Like</CardTitle>
					</CardHeader>
					<CardContent className="pb-2 w-full inline-flex justify-center">{props.like}</CardContent>
				</Card>
				<Card className="min-w-[100px] max-w-1/2">
					<CardHeader className="p-5 pt-2 pb-1">
						<CardTitle className="text-sm opacity-[0.8] leading-3 py-2">Comments</CardTitle>
					</CardHeader>
					<CardContent className="pb-2 w-full inline-flex justify-center">{props.comments}</CardContent>
				</Card>
				<Card className="min-w-[200px] max-w-1/2">
					<CardHeader className="p-5 pt-2 pb-1">
						<CardTitle className="text-sm opacity-[0.8] leading-3 py-2">Date</CardTitle>
					</CardHeader>
					<CardContent className="pb-2 w-full inline-flex justify-center">{props.date}</CardContent>
				</Card>
			</div>
		</>
	);
}
