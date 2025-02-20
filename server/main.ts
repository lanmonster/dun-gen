import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import routeStaticFilesFrom from "./util/routeStaticFilesFrom.ts";
import { oakCors } from "@tajpouria/cors";
import DunGen from "./dun-gen.ts";

export const app = new Application();
const router = new Router();

router.get("/gen", (context) => {
  const url = new URL(context.request.url);
  const seed = Number(url.searchParams.get("seed") ?? 0);
  const dimension = Number(url.searchParams.get("dimension") ?? 0);
  try {
    const world = new DunGen(seed, dimension).generate();
    context.response.body = JSON.stringify(
      world.map((c) => c.options()),
      //.map((c) => c.render()),
    );
  } catch (e) {
        context.response.body = e
        context.response.status = 500
  }
});
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(routeStaticFilesFrom([
  `${Deno.cwd()}/client/dist`,
  `${Deno.cwd()}/client/public`,
]));

if (import.meta.main) {
  console.log("Server listening on port http://localhost:8000");
  await app.listen({ port: 8000 });
}
