export function dateToIso(dateBr: string): string {
  const [day, month, year] = dateBr.split('/');
  if (!day || !month || !year) {
    throw new Error('Formato de data inválido. Use DD/MM/YYYY.');
  }
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

export function monthYearToIso(monthYearStr) {
  const monthMap = {
    JAN: '01',
    FEV: '02',
    MAR: '03',
    ABR: '04',
    MAI: '05',
    JUN: '06',
    JUL: '07',
    AGO: '08',
    SET: '09',
    OUT: '10',
    NOV: '11',
    DEZ: '12',
  };

  const [monthStr, yearStr] = monthYearStr.toUpperCase().split('/');
  const month = monthMap[monthStr];

  if (!month) {
    throw new Error(
      "Invalid month. Use 'MON/YY' or 'MON/YYYY', e.g., 'JAN/24' or 'JAN/2024'",
    );
  }

  let yearNum = parseInt(yearStr, 10);
  if (yearStr.length === 2) {
    yearNum += yearNum >= 70 ? 1900 : 2000; // Ajuste se quiser dar suporte a anos como '99'
  }

  if (isNaN(yearNum)) {
    throw new Error("Invalid year format. Use 'YY' or 'YYYY'");
  }

  return `${yearNum}/${month}`;
}
