import { Hono } from "hono";

import NotFoundHandler from "./controller/status/notFound";
import OnErrorHandler from "./controller/status/onError";
import TestHandler from "./controller/test/test";
import ZennGetArticlesHandler from "./controller/zenn/getArticles";

const app = new Hono().basePath("/api");

NotFoundHandler(app);
OnErrorHandler(app);

const zenn = ZennGetArticlesHandler(app);
export type zennRPC = typeof zenn;

const test = TestHandler(app);
export type testRPC = typeof test;

export type byPath<T extends string = "/"> = T;
export default app;
