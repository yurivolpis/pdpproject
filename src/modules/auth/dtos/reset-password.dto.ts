import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsJWT()
  token: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
