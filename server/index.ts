import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";

const inputTodoType = z.object({
  title: z.string(),
  description: z.string(),
});

const inputUserSignupType = z.object({
  email: z.string(),
  password: z.string(),
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

  signUp: publicProcedure.input(inputUserSignupType).mutation(async (opts) => {
    let email = opts.input.email;
    let password = opts.input.password;

    //database jazz here
    //authenticatio

    return {
      email: email,
      password: password,
      token: "dlfjk;lsdjfkdjflksdjf2",
    };
  }),
});

const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    let authHeader = opts.req.headers["autherization"];
    console.log(authHeader);
    return {
      username: "arvind@a.com",
    };
  },
});

server.listen(3000);

export type AppRouter = typeof appRouter;
