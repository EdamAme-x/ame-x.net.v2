import { Context, Hono } from "hono";

export type GlobalErrorResponse = {
	error: {
		message: Error;
		status: number;
	};
};

export default async function Handler(app: Hono) {
	app.onError(async (err: Error, c: Context) => {
		return c.json<GlobalErrorResponse>({
			error: {
				message: err,
				status: 500
			}
		});
	});
}
