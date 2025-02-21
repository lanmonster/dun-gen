import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { oakCors } from "@tajpouria/cors";
import DunGen from "./dun-gen.ts";
import mulberry32 from "./rng/mulberry.ts";

export const app = new Application();
const router = new Router();

router.get("/gen", (context) => {
  const url = new URL(context.request.url);
  const seed = Number(url.searchParams.get("seed") ?? 0);
  const dimension = Number(url.searchParams.get("dimension") ?? 0);
  console.log({ seed, dimension });
  try {
    const generator = new DunGen(dimension);
    let world;
    const rng = mulberry32(seed);
    let tries = 0;
    while (true) {
      tries++;
      try {
        world = generator.generate(rng);
        break;
      } catch (e) {
        console.log({ tries, e });
        if (tries > 5) {
          throw new Error("tried 5 times and this is the best I could do");
        }
      }
    }
    context.response.body = JSON.stringify(
      world.map((c) => c.options()),
    );
  } catch (e) {
    if (e instanceof Error) {
      context.response.status = 500;
      context.response.body = e.message;
      console.log("error", e);
    }
  }
});
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

if (import.meta.main) {
  console.log("Server listening on port http://localhost:8000");
  await app.listen({ port: 8000 });
}
