import { Context, Hono } from "hono";

export default function Handler(app: Hono) {
	app.get("/test", async (c: Context) => {
		return c.text("test passed! just " + Date.now());
	});
}
