import Fastify from "fastify";
import 'dotenv/config';
// Cors plugin
import fastifyCors from "@fastify/cors";
// Cookie plugin
import fastifyCookie from "@fastify/cookie";
// Routes
import authRoutes from "./routes/auth/auth.mjs";
import userRoute from "./routes/user/user.mjs";
import billingRoutes from "./routes/billing/billing.mjs";
import redditRoute from "./routes/reddit/reddit.mjs";
import postRoutes from "./routes/post/post.mjs";

const fastify = Fastify({ logger: true });

fastify.register(fastifyCors, {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
});

fastify.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
    hook: "onRequest"
});

fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(userRoute, { prefix: "/user" });
fastify.register(billingRoutes, { prefix: "/billing" });
fastify.register(redditRoute, { prefix: "/reddit" });
fastify.register(postRoutes, { prefix: "/post" });

try {
    await fastify.listen({ port: 3000 });
} catch (error) {
    fastify.log.error(error);
    process.exit(1);
}