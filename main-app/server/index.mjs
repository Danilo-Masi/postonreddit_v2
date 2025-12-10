import Fastify from "fastify";
import authRoutes from "./routes/auth.mjs";

const fastify = Fastify({
    logger: true,
});

fastify.register(authRoutes)

try {
    await fastify.listen({ port: 3000 });
} catch (error) {
    fastify.log.error(err);
    process.exit(1);
}