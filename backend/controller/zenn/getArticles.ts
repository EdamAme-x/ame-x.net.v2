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
	return app
		.get("/zenn/getArticles", async (c: Context) => {
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
		})
		.get("/zenn/getLatestArticles", async (c: Context) => {
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
		})
		.post("/zenn/getArticleInfo", async (c: Context) => {
			const data = await c.req.json<{
				slug: string;
			}>();

			if (!data.slug) {
				return c.json(
					{
						error: "slug is required"
					},
					{
						status: 400
					}
				);
			}

			const resp = await fetch("https://zenn.dev/api/articles/" + data.slug, {
				headers: {
					accept: "*/*",
					"accept-language": "ja,en-US;q=0.9,en;q=0.8",
					"content-type": "application/json",
					"sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
					"sec-ch-ua-mobile": "?0",
					"sec-ch-ua-platform": '"Windows"',
					"sec-fetch-dest": "empty",
					"sec-fetch-mode": "cors",
					"sec-fetch-site": "same-origin"
				},
				referrer: "https://zenn.dev/" + ProjectConfig.zennId + "/articles/" + data.slug,
				referrerPolicy: "strict-origin-when-cross-origin",
				body: null,
				method: "GET",
				mode: "cors",
				credentials: "include"
			});

			return c.json((await resp.json())["article"]);
		});
}
