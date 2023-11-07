import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";

//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

async function main() {
  const response = await trpc.createTodo.mutate({
    title: "trpc",
    description: "learning trpc !!!!",
  });

  console.log(response);
}

async function main2() {
  const response = await trpc.signUp.mutate({
    email: "trpc@arvind.com",
    password: "learning1234",
  });

  console.log(response);
}

main2();
