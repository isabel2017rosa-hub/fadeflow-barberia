import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Cliente } from './entities/cliente.entity'; 
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module'; 
import { ClientesController } from './clientes.controller'; 
import { ClientesService } from './clientes.service';

@Module({ 
    imports: [AuthModule, TypeOrmModule.forFeature([Cliente, User])], 
    controllers: [ClientesController], 
    providers: [ClientesService], 
    exports: [ClientesService] 
}) 
export class ClientesModule {}
