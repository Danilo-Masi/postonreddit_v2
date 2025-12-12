import Fastify from "fastify";
import 'dotenv/config';
import authRoutes from "./routes/auth/auth.mjs";
import userRoute from "./routes/user/user.mjs";

const fastify = Fastify({ logger: true });

fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(userRoute, { prefix: "/user" });

try {
    await fastify.listen({ port: 3000 });
} catch (error) {
    fastify.log.error(err);
    process.exit(1);
}