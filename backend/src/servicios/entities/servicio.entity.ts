import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DetalleCita } from '../../citas/entities/detalle-cita.entity';

@Entity('servicios')
export class Servicio {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'int' })
  duracionMinutos!: number;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  precio!: string;

  @Column({ default: true })
  activo!: boolean;

  @OneToMany(() => DetalleCita, (detalle) => detalle.servicio)
  detalles!: DetalleCita[];
}
