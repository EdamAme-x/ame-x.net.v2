import { Hono } from "hono";

import NotFoundHandler from "./controller/status/notFound";
import OnErrorHandler from "./controller/status/onError";
import TestHandler from "./controller/test/test";
import ZennGetArticlesHandler from "./controller/zenn/getArticles";

const app = new Hono().basePath("/api");

TestHandler(app);
NotFoundHandler(app);
OnErrorHandler(app);
ZennGetArticlesHandler(app);

export default app;
export type RPC = typeof app;
export type byPath<T extends string = "/"> = T;
