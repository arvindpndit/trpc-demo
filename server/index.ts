import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";

const inputTodoType = z.object({
  title: z.string(),
  description: z.string(),
});

const appRouter = router({
  createTodo: publicProcedure.input(inputTodoType).mutation(async (options) => {
    const title = options.input.title;
    const description = options.input.description;

    console.log("from server");

    return {
      id: "1",
      msg: "successfully created todo",
    };
  }),
});

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);

export type AppRouter = typeof appRouter;
