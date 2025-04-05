import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/shared/services/prisma/prisma.service';
import { CreateEnergyBillDto, UpdateEnergyBillDto } from './energy-bills.dto';

@Injectable()
export class EnergyBillsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.energyBill.findMany();
  }

  async findOne(id: string) {
    return this.prisma.energyBill.findUnique({ where: { id } });
  }

  async create(data: CreateEnergyBillDto) {
    return this.prisma.energyBill.create({ data });
  }

  async update(id: string, data: UpdateEnergyBillDto) {
    return this.prisma.energyBill.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.energyBill.delete({ where: { id } });
  }
}
