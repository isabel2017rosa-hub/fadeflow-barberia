import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Cita } from './cita.entity';
import { Servicio } from '../../servicios/entities/servicio.entity';

@Entity('detalle_cita')
@Unique(['cita', 'servicio'])
export class DetalleCita {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Cita, (cita) => cita.detalles, { nullable: false, onDelete: 'CASCADE' })
  cita!: Cita;

  @ManyToOne(() => Servicio, (servicio) => servicio.detalles, { nullable: false, onDelete: 'RESTRICT' })
  servicio!: Servicio;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  precio!: string;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;
}
