import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
export class UpdateClienteDto {
  @IsOptional() @IsString() @Length(2,100) nombre?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() @Length(7,30) telefono?: string;
  @IsOptional() @IsString() @Length(0,200) direccion?: string;
}
