import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/shared/services/prisma/prisma.service';
import { CreateBillDto } from './billing.schema';
import {
  Client,
  Installation,
  Invoice,
  ConsumptionHistory,
} from '@prisma/client';

@Injectable()
export class BillingService {
  constructor(private readonly prisma: PrismaService) {}

  async createOne(data: CreateBillDto) {
    const { client, installation, invoice, consumptionHistories = [] } = data;

    const existingClient: Client = await this.prisma.client.upsert({
      where: { clientNumber: client.clientNumber },
      update: {},
      create: {
        clientNumber: client.clientNumber,
        name: client.name,
      },
    });

    const existingInstallation: Installation =
      await this.prisma.installation.upsert({
        where: { installationNumber: installation.installationNumber },
        update: {},
        create: {
          installationNumber: installation.installationNumber,
          clientId: existingClient.id,
        },
      });

    const existingInvoice: Invoice = await this.prisma.invoice.upsert({
      where: {
        referenceMonth_installationId: {
          referenceMonth: invoice.referenceMonth,
          installationId: existingInstallation.id,
        },
      },
      update: {},
      create: {
        referenceMonth: invoice.referenceMonth,
        dueDate: invoice.dueDate,
        emissionDate: invoice.emissionDate,

        installationId: existingInstallation.id,

        electricEnergy_kWh: invoice.electricEnergy_kWh,
        electricEnergy_value: invoice.electricEnergy_value,

        sceeEnergy_kWh: invoice.sceeEnergy_kWh,
        sceeEnergy_value: invoice.sceeEnergy_value,

        compensatedEnergy_kWh: invoice.compensatedEnergy_kWh,
        compensatedEnergy_value: invoice.compensatedEnergy_value,

        publicLightingContribution: invoice.publicLightingContribution,
        totalAmount: invoice.totalAmount,
      },
    });

    const createdHistories: ConsumptionHistory[] = [];

    for (const ch of consumptionHistories) {
      const history = await this.prisma.consumptionHistory.upsert({
        where: {
          installationId_monthYear: {
            installationId: existingInstallation.id,
            monthYear: ch.monthYear,
          },
        },
        update: {},
        create: {
          installationId: existingInstallation.id,
          monthYear: ch.monthYear,
          consumption_kWh: ch.consumption_kWh,
          dailyAverage_kWh: ch.dailyAverage_kWh,
          days: ch.days,
        },
      });

      createdHistories.push(history);
    }

    return {
      message: 'Bill successfully processed',
      clientId: existingClient.id,
      installationId: existingInstallation.id,
      invoiceId: existingInvoice.id,
      consumptionHistoryCount: createdHistories.length,
    };
  }

  async findAll() {
    return this.prisma.invoice.findMany();
  }
}
