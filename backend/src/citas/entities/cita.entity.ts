import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoCita } from '../../common/enums/estado-cita.enum';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Barbero } from '../../barberos/entities/barbero.entity';
import { DetalleCita } from './detalle-cita.entity';
import { Pago } from '../../pagos/entities/pago.entity';

@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.citas, { nullable: false, onDelete: 'RESTRICT' })
  cliente!: Cliente;

  @ManyToOne(() => Barbero, (barbero) => barbero.citas, { nullable: false, onDelete: 'RESTRICT' })
  barbero!: Barbero;

  @Column({ type: 'date' })
  fecha!: string;

  @Column({ type: 'time' })
  hora!: string;

  @Column({ type: 'enum', enum: EstadoCita, default: EstadoCita.PROGRAMADA })
  estado!: EstadoCita;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @CreateDateColumn()
  fechaCreacion!: Date;

  @OneToMany(() => DetalleCita, (detalle) => detalle.cita, { cascade: true })
  detalles!: DetalleCita[];

  @OneToOne(() => Pago, (pago) => pago.cita)
  pago?: Pago;
}
