import { PrismaClient } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function memoriesRoutes(app: FastifyInstance) {
    app.get("/memories", async (_, res) => {
        try {
            const memories = await prisma.memory.findMany({orderBy: { createdAt: "asc" },});
            return memories.map((memory) => {
                return {
                    id: memory.memoryId,
                    coverUrl: memory.coverUrl,
                    excerpt: memory.content.substring(0, 115).concat("..."),
                };
            });
        } catch {
            res.status(500).send();
        }
    });
    app.get("/memories/:id", async (req, res) => {
        try {
            // const { id }: { id: string } = req.params as { id: string };
            const paramsSchema = z.object({ id: z.string().uuid() });
            const { id } = paramsSchema.parse(req.params);

            const memories = await prisma.memory.findUniqueOrThrow({where: { memoryId: id },});
            console.log(id);
            return memories;
        } catch {
            res.status(400).send("The id sent is invalid");
        }
    });

    app.post("/memories", async (req, res) => {
        try {
            const bodySchema = z.object({
                content: z.string(),
                isPublic: z.coerce.boolean().default(false),
                coverUrl: z.string(),
            });
            const { isPublic, content, coverUrl } = bodySchema.parse(req.body);
            const memory = await prisma.memory.create({
                data: {
                    content,
                    coverUrl,
                    isPublic,
                    userUserId: "9b2dea75-16ef-47a6-a99c-6b36c8c4d716",
                },
            });
            res.status(201).send({ memory: memory.memoryId });
        } catch (error) {
            res.status(400).send("Invalid properties sent");
        }
    });

    app.put("/memories/:id", async (req, res) => {
        try {
            const paramsSchema = z.object({ id: z.string().uuid() });
            const { id } = paramsSchema.parse(req.params);
            const bodySchema = z.object({
                content: z.string(),
                isPublic: z.coerce.boolean().default(false),
                coverUrl: z.string(),
            });
            const { isPublic, content, coverUrl } = bodySchema.parse(req.body);
            const memory = await prisma.memory.update({
                where: { memoryId: id },
                data: {
                    content,
                    coverUrl,
                    isPublic
                },
            });
            res.status(201).send({ memory: memory.memoryId });
        } catch (error) {
            res.status(400).send("Invalid properties sent");
        }
    });

    app.delete("/memories/:id", async (req, res) => {
        try {
            const paramsSchema = z.object({ id: z.string().uuid() });
            const { id } = paramsSchema.parse(req.params);

            const memory = await prisma.memory.delete({ where: { memoryId: id, } });

            return memory.memoryId;
        } catch {
            res.status(400).send("The id sent is invalid");
        }
    });
}
