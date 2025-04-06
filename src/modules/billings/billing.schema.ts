// src/billing/schemas/create-bill.schema.ts
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
  installation: createInstallationSchema,
  invoice: createInvoiceSchema,
  consumptionHistories: z.array(createConsumptionHistorySchema).optional(),
});

export type CreateBillType = z.infer<typeof createBillSchema>;
export class CreateBillDto extends createZodDto(createBillSchema) {}
