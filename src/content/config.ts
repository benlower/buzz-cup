// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define your collection(s)
const playersCollection = defineCollection({
  schema: ({ image }) => z.object({
    draft: z.boolean(),
    name: z.string(),
    title: z.string(),
    avatar: image().refine((img) => img.width >= 400, {
      message: "Avatar image must be at least 400 pixels wide!",
    }),
    avatarAlt: z.string(),
    publishDate: z.string().transform(str => new Date(str)),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  players: playersCollection,
};