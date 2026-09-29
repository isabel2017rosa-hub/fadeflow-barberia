import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AuthModule } from '../auth/auth.module';
import { Cita } from '../citas/entities/cita.entity'; 
import { Cliente } from '../clientes/entities/cliente.entity'; 
import { Barbero } from '../barberos/entities/barbero.entity'; 
import { Servicio } from '../servicios/entities/servicio.entity'; 
import { Pago } from '../pagos/entities/pago.entity'; 
import { ReportesController } from './reportes.controller'; 
import { ReportesService } from './reportes.service';

@Module({
    imports:[ AuthModule, TypeOrmModule.forFeature([Cita,Cliente,Barbero,Servicio,Pago])],
    controllers:[ReportesController],
    providers:[ReportesService]
}) 
export class ReportesModule{}
