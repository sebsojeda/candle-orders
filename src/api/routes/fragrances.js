const Categories = {
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

const Fragrance = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    description: { type: "string" },
    category: Categories,
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
    imageUrl: { type: "string" },
  },
};

const Error = {
  type: "object",
  properties: {
    statusCode: { type: "number" },
    message: { type: "string" },
  },
};

const getFragrancesOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Fragrance,
      },
    },
  },
};

const createFragranceOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name", "description", "category", "imageUrl"],
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        category: Categories,
        imageUrl: { type: "string" },
      },
    },
    response: {
      201: Fragrance,
    },
  },
};

const updateFragranceOpts = {
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
        category: Categories,
        imageUrl: { type: "string" },
      },
    },
    response: {
      200: Fragrance,
      404: Error,
    },
  },
};

const deleteFragranceOpts = {
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
      404: Error,
    },
  },
};

export function fragrancesRoutes(server, options, done) {
  server.get("/", getFragrancesOpts, async function (req, res) {
    res.status(200);
    return await server.prisma.fragrance.findMany();
  });

  server.post("/", createFragranceOpts, async function (req, res) {
    const { name, description, category, imageUrl } = req.body;

    res.status(201);
    return await server.prisma.fragrance.create({
      data: { name, description, category, imageUrl },
    });
  });

  server.patch("/:id", updateFragranceOpts, async function (req, res) {
    const { id } = req.params;
    const { name, description, category, imageUrl } = req.body;

    const fragrance = await server.prisma.fragrance.findUnique({
      where: { id },
    });

    if (!fragrance) {
      res.status(404);
      return { statusCode: 404, message: "Not Found" };
    } else {
      res.status(200);
      return await server.prisma.fragrance.update({
        where: { id },
        data: { name, description, category, imageUrl },
      });
    }
  });

  server.delete("/:id", deleteFragranceOpts, async function (req, res) {
    const { id } = req.params;

    const fragrance = await server.prisma.fragrance.findUnique({
      where: { id },
    });

    if (!fragrance) {
      res.status(404);
      return { statusCode: 404, message: "Not Found" };
    } else {
      res.status(204);
      await server.prisma.fragrance.delete({ where: { id } });
    }
  });

  done();
}
