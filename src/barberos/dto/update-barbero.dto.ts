import { IsBoolean, IsEmail, IsOptional, IsString, Length, MinLength } from 'class-validator';
export class UpdateBarberoDto {
  @IsOptional() @IsString() @Length(2,100) nombre?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() @MinLength(8) password?: string;
  @IsOptional() @IsString() @Length(0,100) especialidad?: string;
  @IsOptional() @IsString() descripcion?: string;
  @IsOptional() @IsBoolean() disponible?: boolean;
}
