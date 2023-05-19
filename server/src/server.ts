import fastify from "fastify";
import { env } from "./env";
import { PrismaClient } from "@prisma/client";

const app = fastify();
const prisma = new PrismaClient();

app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    return users;
});

app.listen({
    port: env.PORT
}).then(() => console.log(" 🚀 Server running on port", env.PORT));