import { PublicUserDto } from "~/dtos/public-user.dto";

export class AuthenticationDto {
  user: PublicUserDto;
  accessToken: string;
}