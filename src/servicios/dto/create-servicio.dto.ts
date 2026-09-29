import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';
export class CreateServicioDto { @IsString() @Length(2,100) nombre!: string; @IsOptional() @IsString() descripcion?: string; @IsInt() @Min(1) duracionMinutos!: number; @IsNumber({maxDecimalPlaces:2}) @Min(0) precio!: number; @IsOptional() @IsBoolean() activo?: boolean; }
