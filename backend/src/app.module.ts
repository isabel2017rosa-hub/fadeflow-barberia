import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { BarberosModule } from './barberos/barberos.module';
import { ServiciosModule } from './servicios/servicios.module';
import { CitasModule } from './citas/citas.module';
import { PagosModule } from './pagos/pagos.module';
import { ReportesModule } from './reportes/reportes.module';
import { User } from './users/entities/user.entity';
import { Cliente } from './clientes/entities/cliente.entity';
import { Barbero } from './barberos/entities/barbero.entity';
import { Servicio } from './servicios/entities/servicio.entity';
import { Cita } from './citas/entities/cita.entity';
import { DetalleCita } from './citas/entities/detalle-cita.entity';
import { Pago } from './pagos/entities/pago.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.getOrThrow<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT') ?? 5432),
        username: config.getOrThrow<string>('DB_USERNAME'),
        password: config.getOrThrow<string>('DB_PASSWORD'),
        database: config.getOrThrow<string>('DB_NAME'),
        entities: [User, Cliente, Barbero, Servicio, Cita, DetalleCita, Pago],
        synchronize: false,
      }),
    }),
    AuthModule,
    ClientesModule,
    BarberosModule,
    ServiciosModule,
    CitasModule,
    PagosModule,
    ReportesModule,
  ],
})
export class AppModule {}
