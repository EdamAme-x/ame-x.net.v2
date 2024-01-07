import { Context, Hono } from "hono";

export default async function Handler(app: Hono) {
	app.get("/test", async (c: Context) => {
		return c.text("test passed! just " + Date.now());
	});
}
