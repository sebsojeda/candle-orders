import fastify from "fastify";
import prismaPlugin from "./plugins/prisma";
import { fragrancesRoutes } from "./routes/fragrances";

const app = fastify({ logger: true });

app.register(prismaPlugin);

app.register(fragrancesRoutes, { prefix: "/fragrances" });

try {
  await app.listen({ port: 3000 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
