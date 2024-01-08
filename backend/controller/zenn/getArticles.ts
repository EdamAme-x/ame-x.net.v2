import { ProjectConfig } from "@/data/config";
import { Context, Hono } from "hono";

const apiEndpoint = `https://zenn.dev/api/articles?username=${ProjectConfig.zennId}&order=latest`;

export type Article = {
	id: number;
	post_type: "Article" | "Scrap";
	title: string;
	slug: string;
	comments_count: number;
	liked_count: number;
	body_letters_count: number;
	article_type: "tech" | "idea";
	emoji: string;
	is_suspending_private: boolean;
	published_at: string;
	body_updated_at: string;
	source_repo_updated_at: null | unknown;
	pinned: boolean;
	path: string;
	user: {
		id: number;
		username: string;
		name: string;
		avatar_small_url: string;
	};
	publication: null | unknown;
};

export default function Handler(app: Hono) {
	app.get("/zenn/getArticles", async (c: Context) => {
		const resp = await fetch(apiEndpoint);
		const data = await resp.json();
		const articles: Article[] = data.articles;

		return c.json(articles);
	});
}
