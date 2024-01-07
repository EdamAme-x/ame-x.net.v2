import { ProjectConfig } from "@/data/config";
import { Context, Hono } from "hono";

export default async function Handler(app: Hono) {
	app.notFound(async (c: Context) => {
		return c.text(`Oops! There is nothing here!  In other words, 404 Not Found.
Well, well, well, follow me on Twitter @${ProjectConfig.twitterId} :)
                                                                                    `);
	});
}
