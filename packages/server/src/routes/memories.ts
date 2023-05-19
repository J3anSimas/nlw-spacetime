import { PrismaClient } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function memoriesRoutes(app: FastifyInstance) {
    app.get("/memories", async () => {
        const memories = await prisma.memory.findMany({
            orderBy: { createdAt: "asc" }
        });
        return memories.map(memory => {
            return {
                id: memory.memoryId,
                coverUrl: memory.coverUrl,
                excerpt: memory.content.substring(0, 115).concat("...")
            };
        });
    });
    app.get;
    app.get("/memories/:id", async (req, res) => {
        try {
            const { id }: { id: string } = req.params as { id: string };
            const paramsSchema = z.object({
                id: z.string().uuid()
            });
            const result = paramsSchema.safeParse(req.params);
            if (!result.success)
                throw new Error();
            const memories = await prisma.memory.findUniqueOrThrow({ where: { memoryId: id } });
            console.log(id);
            return memories;
        } catch {
            res.status(400).send("The id sent is invalid");
        }
    });
    app.post("/memories", async () => {
        const memories = await prisma.memory.findMany();
        return memories;
    });
    app.put("/memories", async () => {
        const memories = await prisma.memory.findMany();
        return memories;
    });
}