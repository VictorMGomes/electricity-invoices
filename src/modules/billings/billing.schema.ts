import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

import {
  createClientSchema,
  createInstallationSchema,
  createInvoiceSchema,
  createConsumptionHistorySchema,
  clientSchema,
  installationSchema,
  invoiceSchema,
  consumptionHistorySchema,
} from './entitys.schemas';

export const BillSchema = z.object({
  client: clientSchema,
  installation: installationSchema,
  invoice: invoiceSchema,
  consumptionHistories: z.array(consumptionHistorySchema).optional(),
});

export const createBillSchema = z.object({
  client: createClientSchema,
  installation: createInstallationSchema.omit({ clientId: true }),
  invoice: createInvoiceSchema.omit({ installationId: true }),
  consumptionHistories: z
    .array(createConsumptionHistorySchema.omit({ installationId: true }))
    .optional(),
});

export type CreateBillType = z.infer<typeof createBillSchema>;
export class CreateBillDto extends createZodDto(createBillSchema) {}
