import { createZodDto } from 'nestjs-zod';
import {
  EnergyBillCreate,
  EnergyBillDelete,
  EnergyBillFind,
  EnergyBillUpdate,
} from './energy-bills.schema';

export class CreateEnergyBillDto extends createZodDto(EnergyBillCreate) {}
export class UpdateEnergyBillDto extends createZodDto(EnergyBillUpdate) {}
export class DeleteEnergyBillDto extends createZodDto(EnergyBillDelete) {}
export class FindEnergyBillDto extends createZodDto(EnergyBillFind) {}
