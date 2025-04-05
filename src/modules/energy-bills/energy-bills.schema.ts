import { z } from 'zod';
import { SystemSchema } from '@src/shared/services/system/system.schema';

export const EnergyBillSchema = z.object({
  clientNumber: z.string().min(1),
  referenceMonth: z.string().min(1),
  electricityQty: z.number(),
  electricityValue: z.number(),
  sceeQty: z.number(),
  sceeValue: z.number(),
  compensatedQty: z.number(),
  compensatedValue: z.number(),
  publicLighting: z.number(),
});

export type EnergyBillType = z.infer<typeof EnergyBillSchema>;

export const EnergyBillCreate = EnergyBillSchema;
export type EnergyBillCreateType = z.infer<typeof EnergyBillCreate>;

export const EnergyBillUpdate = EnergyBillSchema.partial().merge(
  SystemSchema.partial().omit({ id: true }),
);
export type EnergyBillUpdateType = z.infer<typeof EnergyBillUpdate>;

export const EnergyBillDelete = SystemSchema.pick({ id: true });
export type EnergyBillDeleteType = z.infer<typeof EnergyBillDelete>;

export const EnergyBillFind = SystemSchema.pick({ id: true });
export type EnergyBillFindType = z.infer<typeof EnergyBillFind>;
