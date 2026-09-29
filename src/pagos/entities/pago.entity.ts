import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cita } from '../../citas/entities/cita.entity';
import { EstadoPago } from '../../common/enums/estado-pago.enum';
import { MetodoPago } from '../../common/enums/metodo-pago.enum';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => Cita, (cita) => cita.pago, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cita_id' })
  cita!: Cita;

  @CreateDateColumn()
  fecha!: Date;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  monto!: string;

  @Column({ type: 'enum', enum: MetodoPago })
  metodoPago!: MetodoPago;

  @Column({ type: 'enum', enum: EstadoPago, default: EstadoPago.PENDIENTE })
  estado!: EstadoPago;

  @Column({ length: 100, nullable: true })
  referencia?: string;
}
