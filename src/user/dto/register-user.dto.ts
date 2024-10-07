import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsOptional()
  @Matches(/^[0-9]{10}$/, { message: 'Phone number must be valid' })
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
