import { z } from 'zod';

export const IdRequired = z.object({
  id: z.number().int().positive(),
});
export type IdRequiredType = z.infer<typeof IdRequired>;

export const DateSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});
export type DateType = z.infer<typeof DateSchema>;

export const SystemSchema = IdRequired.merge(DateSchema);
export type SystemType = z.infer<typeof SystemSchema>;
