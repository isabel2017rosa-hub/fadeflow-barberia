import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
export class CreateBarberoDto { @IsString() @Length(2,100) nombre!: string; @IsEmail() email!: string; @IsString() @Length(8,100) password!: string; @IsOptional() @IsString() @Length(0,100) especialidad?: string; @IsOptional() @IsString() descripcion?: string; }
