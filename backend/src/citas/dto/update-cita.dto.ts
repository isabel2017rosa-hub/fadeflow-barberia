import { IsOptional, IsString, Matches, IsUUID, IsDateString } from 'class-validator';
export class UpdateCitaDto { @IsOptional() @IsUUID() barberoId?:string; @IsOptional() @IsDateString() fecha?:string; @IsOptional() @Matches(/^([01]\d|2[0-3]):[0-5]\d$/) hora?:string; @IsOptional() @IsString() observaciones?:string; }
