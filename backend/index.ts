import { Hono } from "hono";

import NotFoundHandler from "./controller/status/notFound";
import TestHandler from "./controller/test";
import OnErrorHandler from "./controller/status/onError";

const app = new Hono().basePath("/api");

TestHandler(app);
NotFoundHandler(app);
OnErrorHandler(app);

export default app;
export type RPC = typeof app;
