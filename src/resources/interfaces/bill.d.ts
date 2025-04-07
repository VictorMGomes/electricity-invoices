export interface client {
  clientNumber: string;
  name: string;
}

export interface Installation {
  installationNumber: string;
  clientId: string;
}

export interface Invoice {
  installationId: string;
  referenceMonth: string;
  dueDate: string;
  emissionDate: string;
  electricEnergy_kWh: number;
  electricEnergy_value: number;
  sceeEnergy_kWh: number;
  sceeEnergy_value: number;
  compensatedEnergy_kWh: number;
  compensatedEnergy_value: number;
  publicLightingContribution: number;
  totalAmount: number;
}

export interface ConsumptionHistory {
  installationId: string;
  monthYear: Date;
  consumption_kWh: number;
  dailyAverage_kWh: number;
  days: number;
}

export interface Bill {
  client: client;
  installation: Installation;
  invoice: Invoice;
  consumptionHistories: ConsumptionHistory[];
}
