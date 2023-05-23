import fastify from "fastify";
import cors from '@fastify/cors' 
import { env } from "./env";
import { PrismaClient } from "@prisma/client";
import { memoriesRoutes } from "./routes/memories";

const app = fastify();
app.register(cors, {
    origin: true
});
const prisma = new PrismaClient();

app.register(memoriesRoutes);
app.get("/users", async () => {
    const users = await prisma.user.findMany();
    return users;
});

app.listen({
    port: env.PORT
}).then(() => console.log(" 🚀 Server running on port", env.PORT));
