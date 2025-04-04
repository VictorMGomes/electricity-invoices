import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from '@src/modules/users/users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { apiDocGenerator } from '@src/shared/config/swagger.config';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @apiDocGenerator()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @apiDocGenerator()
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @apiDocGenerator()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @apiDocGenerator()
  update(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  @apiDocGenerator()
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
