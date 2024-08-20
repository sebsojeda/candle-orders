import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

const prisma = new PrismaClient();
const server = fastify({ logger: true });

const fragranceCategorySchema = {
  type: "string",
  enum: [
    "Citrus",
    "Floral",
    "Fresh",
    "Fruity",
    "Herbaceous",
    "Smokey",
    "Woody",
  ],
};

const fragranceScheme = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    description: { type: "string" },
    category: fragranceCategorySchema,
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
    imageUrl: { type: "string" },
  },
};

server.post(
  "/fragrances",
  {
    schema: {
      body: {
        type: "object",
        required: ["name", "description", "category", "imageUrl"],
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          category: fragranceCategorySchema,
          imageUrl: { type: "string" },
        },
      },
      response: {
        201: fragranceScheme,
      },
    },
  },
  async function (req, res) {
    const { name, description, category, imageUrl } = req.body;
    const fragrance = await prisma.fragrance.create({
      data: { name, description, category, imageUrl },
    });
    res.status(201);
    return fragrance;
  }
);

server.patch(
  "/fragrances/:id",
  {
    schema: {
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "number" },
        },
      },
      body: {
        type: "object",
        required: ["name", "description", "category", "imageUrl"],
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          category: fragranceCategorySchema,
          imageUrl: { type: "string" },
        },
      },
      response: {
        200: fragranceScheme,
      },
    },
  },
  async function (req, res) {
    const { id } = req.params;
    const { name, description, category, imageUrl } = req.body;
    const fragrance = await prisma.fragrance.update({
      where: { id },
      data: { name, description, category, imageUrl },
    });
    res.status(200);
    return fragrance;
  }
);

server.delete(
  "/fragrances/:id",
  {
    schema: {
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "number" },
        },
      },
      response: {
        204: {
          type: "null",
        },
      },
    },
  },
  async function (req, res) {
    const { id } = req.params;
    await prisma.fragrance.delete({ where: { id } });
    res.status(204);
  }
);

server.get(
  "/fragrances",
  {
    schema: {
      response: {
        200: {
          type: "array",
          items: fragranceScheme,
        },
      },
    },
  },
  async function (req, res) {
    const fragrances = await prisma.fragrance.findMany();
    res.status(200);
    return fragrances;
  }
);

try {
  await server.listen({ port: 3000 });
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
