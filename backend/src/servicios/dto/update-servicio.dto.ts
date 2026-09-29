import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';
export class UpdateServicioDto {
  @IsOptional() @IsString() @Length(2,100) nombre?: string;
  @IsOptional() @IsString() descripcion?: string;
  @IsOptional() @IsInt() @Min(1) duracionMinutos?: number;
  @IsOptional() @IsNumber({maxDecimalPlaces:2}) @Min(0) precio?: number;
  @IsOptional() @IsBoolean() activo?: boolean;
}
