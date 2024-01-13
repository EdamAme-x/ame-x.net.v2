import { Hono } from "hono";

import MyInfoHandler from "./controller/myinfo";
import NotFoundHandler from "./controller/status/notFound";
import OnErrorHandler from "./controller/status/onError";
import TestHandler from "./controller/test";
import ZennGetArticlesHandler from "./controller/zenn/getArticles";

const app = new Hono().basePath("/api");

NotFoundHandler(app);
OnErrorHandler(app);

const zenn = ZennGetArticlesHandler(app);
export type zennRPC = typeof zenn;

const test = TestHandler(app);
export type testRPC = typeof test;

const myinfo = MyInfoHandler(app);
export type myinfoRPC = typeof myinfo;

export type byPath<T extends string = "/"> = T;
export default app;
