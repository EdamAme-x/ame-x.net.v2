import { MyInfo } from "@/data/myinfo";
import { Context, Hono } from "hono";

export default function Handler(app: Hono) {
	return app.get("/myinfo", async (c: Context) => {
		return c.json(MyInfo);
	});
}
