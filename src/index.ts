import { anthropic } from "@ai-sdk/anthropic";
import { serve } from "@hono/node-server";
import { Output, streamObject, streamText } from "ai";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { stream } from "hono/streaming";
import "dotenv/config";
import { z } from "zod";

const app = new Hono();

app.use("/*", cors());

app.post("/api/chat", async (c) => {
  const { messages } = await c.req.json();

  const result = streamText({
    model: anthropic("claude-3-5-haiku-latest"),
    // experimental_output: Output.object({
    //   schema: z.object({ jsx: z.string() }),
    // }),
    messages,
    onError: (err) => console.log(err),
  });

  // Mark the response as a v1 data stream:
  c.header("X-Vercel-AI-Data-Stream", "v1");
  c.header("Content-Type", "text/plain; charset=utf-8");

  return stream(c, (stream) => stream.pipe(result.toDataStream()));
});

serve({
  fetch: app.fetch,
  port: 8080,
});
