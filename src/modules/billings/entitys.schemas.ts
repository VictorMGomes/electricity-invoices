import { z } from 'zod';
import { uuidEntitySchema } from '@src/shared/services/system/system.schema';

export const clientSchema = z.object({
  clientNumber: z.string(),
  name: z.string(),
});
export const clientSchemaWithuuidEntity = clientSchema.extend(
  uuidEntitySchema.shape,
);
export const createClientSchema = clientSchema;
export const updateClientSchema = clientSchemaWithuuidEntity.omit({
  id: true,
});

export const installationSchema = z.object({
  installationNumber: z.string(),
  clientId: z.string().uuid(),
});
export const installationSchemaWithuuidEntity = installationSchema.extend(
  uuidEntitySchema.shape,
);
export const createInstallationSchema = installationSchema;
export const updateInstallationSchema = installationSchemaWithuuidEntity.omit({
  id: true,
});

export const invoiceSchema = z.object({
  installationId: z.string().uuid(),
  referenceMonth: z.coerce.date(),
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
});
export const invoiceSchemaWithuuidEntity = invoiceSchema.extend(
  uuidEntitySchema.shape,
);
export const createInvoiceSchema = invoiceSchema;
export const updateInvoiceSchema = invoiceSchemaWithuuidEntity.omit({
  id: true,
});

export const consumptionHistorySchema = z.object({
  installationId: z.string().uuid(),
  monthYear: z.coerce.date(),
  consumption_kWh: z.number().int(),
  dailyAverage_kWh: z.number(),
  days: z.number().int(),
});
export const consumptionHistorySchemaWithuuidEntity =
  consumptionHistorySchema.extend(uuidEntitySchema.shape);
export const createConsumptionHistorySchema = consumptionHistorySchema;
export const updateConsumptionHistorySchema =
  consumptionHistorySchemaWithuuidEntity.omit({
    id: true,
  });
