export class UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  user = 'user',
  admin = 'admin',
}

