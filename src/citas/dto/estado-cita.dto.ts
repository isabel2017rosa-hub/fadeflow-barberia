import { IsEnum } from 'class-validator'; import { EstadoCita } from '../../common/enums/estado-cita.enum'; export class EstadoCitaDto { @IsEnum(EstadoCita) estado!: EstadoCita; }
