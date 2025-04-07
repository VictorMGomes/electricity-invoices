import { dateToIso } from '../utils/dateTransforms';
import { monthYearToIso } from '../utils/dateTransforms';

export const extractDataFromPDFText = (text) => {
  const extract = (regex, fallback = null, transform = (v) => v) => {
    const match = text.match(regex);
    return match ? transform(match[1]) : fallback;
  };

  const clientNumber = extract(/Nº DA INSTALAÇÃO\s+(\d{10})/);
  console.log('clientNumber', clientNumber);

  const name = extract(/\d{11}[-\d\s]+(\s+([A-Z]+))/);
  console.log('name', name);

  const installationNumber = extract(/Nº DA INSTALAÇÃO\s+\d{10}\s+(\d{10})/);
  console.log('installationNumber', installationNumber);

  const referenceMonth = monthYearToIso(
    extract(/Valor a pagar \(R\$\)\s+(\w{3}\/\d{4})/),
  );
  console.log('referenceMonth', referenceMonth);

  const dueDate = extract(/(\w{3}\/\d{4})\s+(\d{2}\/\d{2}\/\d{4})/);
  console.log('dueDate', dueDate);

  const emissionDate = dateToIso(
    extract(/Data de emissão:\s+(\d{2}\/\d{2}\/\d{4})/),
  );
  console.log('emissionDate', emissionDate);

  const electricEnergy_kWh = extract(
    /Energia Elétrica.*?(\d+)\s+kWh/,
    null,
    Number,
  );
  console.log('electricEnergy_kWh', electricEnergy_kWh);

  const electricEnergy_value = extract(
    /Energia Elétrica\s+kWh\s+\d+\s+(\d{1,10}[.,]?\d*)\s+([\d.,]+)/,
    null,
    (val) => parseFloat(val.replace(',', '.')),
  );
  console.log('electricEnergy_value', electricEnergy_value);

  const sceeEnergy_kWh = extract(/Energia SCEE.*?(\d+)\s+kWh/, null, Number);
  console.log('sceeEnergy_kWh', sceeEnergy_kWh);

  const sceeEnergy_value = extract(
    /Energia SCEE s\/ ICMS\s+kWh\s+\d+\s+(\d{1,10}[.,]?\d*)\s+([\d.,]+)/,
    null,
    (val) => parseFloat(val.replace(',', '.')),
  );
  console.log('sceeEnergy_value', sceeEnergy_value);

  const compensatedEnergy_kWh = extract(
    /Energia compensada GD.*?(\d+)\s+kWh/,
    null,
    Number,
  );
  console.log('compensatedEnergy_kWh', compensatedEnergy_kWh);

  const compensatedEnergy_value = extract(
    /Energia compensada GD I\s+kWh\s+\d+\s+\d+[.,]?\d*\s+(-?[\d.,]+)/,
    null,
    (val) => parseFloat(val.replace(',', '.')),
  );
  console.log('compensatedEnergy_value', compensatedEnergy_value);

  const publicLightingContribution = extract(
    /Contrib Ilum Publica Municipal\s+([\d.,]+)/,
    null,
    (val) => parseFloat(val.replace(',', '.')),
  );
  console.log('publicLightingContribution', publicLightingContribution);

  const totalAmount = extract(/TOTAL\s+([\d.,]+)/, null, (val) =>
    parseFloat(val.replace(',', '.')),
  );
  console.log('totalAmount', totalAmount);

  const consumptionData = [];
  const consumptionRegex = /(\w{3}\/\d{2})\s+(\d+)\s+(\d+[.,]?\d*)\s+(\d+)/g;
  let match;
  while ((match = consumptionRegex.exec(text)) !== null) {
    consumptionData.push({
      monthYear: monthYearToIso(match[1]),
      consumption_kWh: Number(match[2]),
      dailyAverage_kWh: parseFloat(match[3].replace(',', '.')),
      days: Number(match[4]),
    });
  }

  console.log('consumptionData', consumptionData);

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
