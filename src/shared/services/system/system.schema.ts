import { z } from 'zod';

export const idSchema = z.object({
  id: z.number().int().positive(),
});
export type idSchemaType = z.infer<typeof idSchema>;

export const uuidSchema = z.object({
  id: z.string().uuid(),
});
export type uuidSchemaType = z.infer<typeof uuidSchema>;

export const dateSchema = z.object({
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});
export type dateSchemaType = z.infer<typeof dateSchema>;

export const idEntitySchema = idSchema.merge(dateSchema);
export type idEntitySchemaType = z.infer<typeof idEntitySchema>;

export const uuidEntitySchema = uuidSchema.merge(dateSchema);
export type uuidEntitySchemaType = z.infer<typeof uuidEntitySchema>;
