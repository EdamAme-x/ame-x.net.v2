import { Hono } from "hono";

import TestHandler from "./controller/test";

const app = new Hono();

TestHandler(app);

export default app;
export type RPC = typeof app;
