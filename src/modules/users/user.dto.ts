import { createZodDto } from 'nestjs-zod';
import { UserCreate, UserDelete, UserFind, UserUpdate } from './user.schema';

export class CreateUserDto extends createZodDto(UserCreate) {}
export class UpdateUserDto extends createZodDto(UserUpdate) {}
export class DeleteUserDto extends createZodDto(UserDelete) {}
export class FindUserDto extends createZodDto(UserFind) {}
