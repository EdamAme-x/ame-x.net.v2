import { Suspense } from "react";
import type { Article } from "@/backend/controller/zenn/getArticles";
import { FaClock, FaCommentAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

import { Button } from "@/components/ui/button";
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
			<div className="w-[100px] h-[100px] flex justify-center items-center mx-auto text-6xl mt-5 mb-3">
				🤔
			</div>
			<Label className="mx-5 text-xl font-mono">Loading...</Label>
			<Label className="mx-5 text-xl inline-flex items-center justify-start space-x-4">
				<div className="inline-flex items-center space-x-3">
					<FcLike /> <Label>2189</Label>
				</div>
				<div className="inline-flex items-center space-x-3">
					<FaCommentAlt /> <Label>7</Label>
				</div>
			</Label>
			<Label className="mx-5 text-xl inline-flex items-center justify-start space-x-4">
				<div className="inline-flex items-center space-x-3">
					<FaClock /> <Label>{new Date().toLocaleString()}</Label>
				</div>
			</Label>
            <Button className="mx-5">Read</Button>
		</>
	);
}

export function ZennPopupContent({ getArticle }: { getArticle: () => Promise<Article> }) {
	const result = getArticle();

    const openArticle = async () => {
        const article = await result;
        window.open(article.proxy.url, "_blank");
    }

	return (
		<>
			<div className="w-[100px] h-[100px] flex justify-center items-center mx-auto text-6xl mt-5 mb-3">
				{result.then(article => article.emoji) as unknown as string}
			</div>
			<Label className="mx-5 text-xl font-mono">
				{result.then(article => article.title) as unknown as string}
			</Label>
			<Label className="mx-5 text-xl inline-flex items-center justify-start space-x-4">
				<div className="inline-flex items-center space-x-3">
					<FcLike /> <Label>{result.then(article => article.liked_count) as unknown as string}</Label>
				</div>
				<div className="inline-flex items-center space-x-3">
					<FaCommentAlt />{" "}
					<Label>{result.then(article => article.comments_count) as unknown as string}</Label>
				</div>
			</Label>
			<Label className="mx-5 text-xl inline-flex items-center justify-start space-x-4">
				<div className="inline-flex items-center space-x-3">
					<FaClock /> <Label>{result.then(article => article.proxy.date) as unknown as string}</Label>
				</div>
			</Label>
			<Button className="mx-5" onClick={() => openArticle()}>Read</Button>
		</>
	);
}
