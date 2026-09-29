import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Barbero } from '../barberos/entities/barbero.entity';
import { Servicio } from '../servicios/entities/servicio.entity';
import { Cita } from '../citas/entities/cita.entity';
import { DetalleCita } from '../citas/entities/detalle-cita.entity';
import { Pago } from '../pagos/entities/pago.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'barberia_db',
  entities: [User, Cliente, Barbero, Servicio, Cita, DetalleCita, Pago],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
