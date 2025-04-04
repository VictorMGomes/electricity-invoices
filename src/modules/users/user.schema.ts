import { z } from 'zod';
import { SystemSchema } from '@src/shared/services/system/system.schema';

export const UserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});
export type UserType = z.infer<typeof UserSchema>;

export const UserCreate = UserSchema;
export type UserCreateType = z.infer<typeof UserCreate>;

export const UserUpdate = UserSchema.merge(
  SystemSchema.partial().omit({ id: true }),
);
export type UserUpdateType = z.infer<typeof UserUpdate>;

export const UserDelete = SystemSchema.pick({ id: true });
export type UserDeleteType = z.infer<typeof UserDelete>;

export const UserFind = SystemSchema.pick({ id: true });
export type UserFindType = z.infer<typeof UserFind>;
