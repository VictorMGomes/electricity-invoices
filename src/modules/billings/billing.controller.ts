import { Body, Controller, Post, UsePipes, Get } from '@nestjs/common';
import { BillingService } from './billing.service';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import { createBillSchema, CreateBillDto } from './billing.schema';
import { apiDocGenerator } from '@src/shared/config/swagger.config';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get()
  @apiDocGenerator()
  findAll() {
    return this.billingService.findAll();
  }

  @Post()
  @apiDocGenerator()
  @UsePipes(new ZodValidationPipe(createBillSchema))
  async createBill(@Body() data: CreateBillDto) {
    return this.billingService.createOne(data);
  }
}
