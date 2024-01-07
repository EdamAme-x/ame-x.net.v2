import { Hono } from "hono";

import NotFoundHandler from "./controller/status/notFound";
import OnErrorHandler from "./controller/status/onError";
import TestHandler from "./controller/test/test";

const app = new Hono().basePath("/api");

TestHandler(app);
NotFoundHandler(app);
OnErrorHandler(app);

export default app;
export type RPC = typeof app;
export type byPath<T extends string = "/"> = T;
