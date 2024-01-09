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
	proxy: {
		url: string;
		avatar_url: string;
		date: string;
	};
};

export default function Handler(app: Hono) {
	return app.get("/zenn/getArticles", async (c: Context) => {
		const resp = await fetch(apiEndpoint);
		const data = await resp.json();
		const articles: Article[] = data.articles;
		articles.map(article => {
			article.proxy = {
				url: `https://zenn.dev/${article.user.username}/articles/${article.slug}`,
				avatar_url: article.user.avatar_small_url,
				date: new Date(article.published_at).toLocaleString("ja-JP")
			};
		});

		return c.json(articles);
	}).get("/zenn/getLatestArticles", async (c: Context) => {
		const resp = await fetch(apiEndpoint);
		const data = await resp.json();
		const articles: Article[] = data.articles;
		articles.map(article => {
			article.proxy = {
				url: `https://zenn.dev/${article.user.username}/articles/${article.slug}`,
				avatar_url: article.user.avatar_small_url,
				date: new Date(article.published_at).toLocaleString("ja-JP")
			};
		});

		const article: Article = articles[0];

		return c.json(article);
	});
}