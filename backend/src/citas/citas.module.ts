import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AuthModule } from '../auth/auth.module';
import { Cita } from './entities/cita.entity'; 
import { DetalleCita } from './entities/detalle-cita.entity'; 
import { Cliente } from '../clientes/entities/cliente.entity'; 
import { Barbero } from '../barberos/entities/barbero.entity'; 
import { Servicio } from '../servicios/entities/servicio.entity'; 
import { CitasController } from './citas.controller'; 
import { CitasService } from './citas.service';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([Cita, DetalleCita, Cliente, Barbero, Servicio])],
    controllers:[CitasController],
    providers:[CitasService],
    exports:[CitasService]
}) 
export class CitasModule{}
