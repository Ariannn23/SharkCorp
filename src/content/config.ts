import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    video: z.string().optional(), // ← Agregar esta línea
    category: z.enum(["Web", "Mobile", "SaaS"]),
    tags: z.array(z.string()),
    link: z.string().url(),
  }),
});

export const collections = {
  projects: projectsCollection,
};
