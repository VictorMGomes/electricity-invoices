import { z } from 'zod';
import { uuidEntitySchema } from '@src/shared/services/system/system.schema';

export const clientSchema = z
  .object({
    clientNumber: z.string(),
    name: z.string(),
  })
  .extend(uuidEntitySchema.shape);
export const createClientSchema = clientSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const installationSchema = z
  .object({
    installationNumber: z.string(),
    clientId: z.string().uuid(),
  })
  .extend(uuidEntitySchema.shape);
export const createInstallationSchema = installationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const invoiceSchema = z
  .object({
    installationId: z.string().uuid(),
    referenceMonth: z.string(),
    dueDate: z.coerce.date(),
    emissionDate: z.coerce.date(),
    electricEnergy_kWh: z.number(),
    electricEnergy_value: z.number(),
    sceeEnergy_kWh: z.number(),
    sceeEnergy_value: z.number(),
    compensatedEnergy_kWh: z.number(),
    compensatedEnergy_value: z.number(),
    publicLightingContribution: z.number(),
    totalAmount: z.number(),
  })
  .extend(uuidEntitySchema.shape);
export const createInvoiceSchema = invoiceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const consumptionHistorySchema = z
  .object({
    installationId: z.string().uuid(),
    monthYear: z.string(),
    consumption_kWh: z.number().int(),
    dailyAverage_kWh: z.number(),
    days: z.number().int(),
  })
  .extend(uuidEntitySchema.shape);
export const createConsumptionHistorySchema = consumptionHistorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});
