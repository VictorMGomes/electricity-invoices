import { dateToIso } from '../utils/dateTransforms';
import { monthYearToIso } from '../utils/dateTransforms';

export const extractDataFromPDFText = (text: string) => {
  const extract = (regex, fallback = null, transform = (v: any) => v) => {
    const match = text.match(regex);
    return match ? transform(match[1]) : fallback;
  };

  const clientNumber = extract(/Nº DA INSTALAÇÃO\s+(\d{10})/);

  const name = extract(/\d{11}[-\d\s]+(\s+([A-Z]+))/);

  const installationNumber = extract(/Nº DA INSTALAÇÃO\s+\d{10}\s+(\d{10})/);

  const referenceMonth = monthYearToIso(
    extract(/Valor a pagar \(R\$\)\s+(\w{3}\/\d{4})/),
  );

  const dueDate = extract(/(\w{3}\/\d{4})\s+(\d{2}\/\d{2}\/\d{4})/);

  const emissionDate = dateToIso(
    extract(/Data de emissão:\s+(\d{2}\/\d{2}\/\d{4})/),
  );

  const electricEnergy_kWh = extract(
    /Energia Elétrica.*?kWh\s+([\d.,]+)/,
    null,
    (val) => parseFloat(val.replace(/\./g, '').replace(',', '.')),
  );

  const electricEnergy_value = extract(
    /Energia Elétrica\s+kWh\s+\d+\s+(\d{1,10}[.,]?\d*)\s+([\d.,]+)/,
    null,
    (val) => parseFloat(val.replace(',', '.')),
  );

  const sceeEnergy_kWh = extract(
    /Energia SCEE.*?kWh\s+([\d.,]+)/,
    null,
    (val) => parseFloat(val.replace(/\./g, '').replace(',', '.')),
  );

  const sceeEnergy_value = extract(
    /Energia SCEE s\/ ICMS\s+kWh\s+[\d.]+\s+[\d,]+\s+([\d.]+,[\d]+)/,
    null,
    (val) => parseFloat(val.replace(/\./g, '').replace(',', '.')),
  );

  const compensatedEnergy_kWh = extract(
    /Energia compensada GD I\s+kWh\s+[\d.]+\s+([\d,]+)/,
    null,
    (val) => parseFloat(val.replace(',', '.')),
  );

  const compensatedEnergy_value = extract(
    /Energia compensada GD I\s+kWh\s+[\d.]+\s+[\d,]+\s+(-?[\d.]+,[\d]+)/,
    null,
    (val) => parseFloat(val.replace(/\./g, '').replace(',', '.')),
  );

  const publicLightingContribution = extract(
    /Contrib Ilum Publica Municipal\s+([\d.,]+)/,
    null,
    (val) => parseFloat(val.replace(',', '.')),
  );

  const totalAmount = extract(/TOTAL\s+([\d.,]+)/, null, (val) =>
    parseFloat(val.replace(',', '.')),
  );

  const consumptionData = [];
  const consumptionRegex = /(\w{3}\/\d{2})\s+(\d+)\s+(\d+[.,]?\d*)\s+(\d+)/g;
  let match;
  while ((match = consumptionRegex.exec(text)) !== null) {
    consumptionData.push({
      monthYear: monthYearToIso(match[1]),
      consumption_kWh: Number(match[2].replace(/\./g, '')),
      dailyAverage_kWh: parseFloat(match[3].replace(',', '.')),
      days: Number(match[4]),
    });
  }

  return {
    client: {
      clientNumber,
      name,
    },
    installation: {
      installationNumber,
    },
    invoice: {
      referenceMonth,
      dueDate,
      emissionDate,
      electricEnergy_kWh,
      electricEnergy_value,
      sceeEnergy_kWh,
      sceeEnergy_value,
      compensatedEnergy_kWh,
      compensatedEnergy_value,
      publicLightingContribution,
      totalAmount,
    },
    consumptionHistories: consumptionData,
  };
};
