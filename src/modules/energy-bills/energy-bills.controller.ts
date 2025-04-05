import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EnergyBillsService } from '@src/modules/energy-bills/energy-bills.service';
import { CreateEnergyBillDto, UpdateEnergyBillDto } from './energy-bills.dto';
import { apiDocGenerator } from '@src/shared/config/swagger.config';

@Controller('energy-bills')
export class EnergyBillsController {
  constructor(private readonly energyBillsService: EnergyBillsService) {}

  @Get()
  @apiDocGenerator()
  findAll() {
    return this.energyBillsService.findAll();
  }

  @Get(':id')
  @apiDocGenerator()
  findOne(@Param('id') id: string) {
    return this.energyBillsService.findOne(id);
  }

  @Post()
  @apiDocGenerator()
  createOne(@Body() createEnergyBillDto: CreateEnergyBillDto) {
    return this.energyBillsService.create(createEnergyBillDto);
  }

  @Put(':id')
  @apiDocGenerator()
  updateOne(@Param('id') id: string, @Body() data: UpdateEnergyBillDto) {
    return this.energyBillsService.update(id, data);
  }

  @Delete(':id')
  @apiDocGenerator()
  deleteOne(@Param('id') id: string) {
    return this.energyBillsService.delete(id);
  }
}
