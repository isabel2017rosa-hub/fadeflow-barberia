import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Barbero } from './entities/barbero.entity'; 
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module'; 
import { BarberosController } from './barberos.controller'; 
import { BarberosService } from './barberos.service';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([Barbero, User])],
    controllers:[BarberosController],
    providers:[BarberosService],
    exports:[BarberosService]
}) export class BarberosModule{}
