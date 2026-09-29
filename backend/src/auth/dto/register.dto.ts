import { IsEmail, IsOptional, IsString, Length, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(2, 100)
  nombre!: string;

  @IsEmail()
  @Length(5, 150)
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsString()
  @Length(7, 30)
  telefono?: string;

  @IsOptional()
  @IsString()
  @Length(0, 200)
  direccion?: string;
}
