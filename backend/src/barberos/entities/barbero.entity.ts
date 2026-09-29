import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Cita } from '../../citas/entities/cita.entity';

@Entity('barberos')
export class Barbero {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User, (user) => user.barbero, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: User;

  @Column({ length: 100, nullable: true })
  especialidad?: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ default: true })
  disponible!: boolean;

  @OneToMany(() => Cita, (cita) => cita.barbero)
  citas!: Cita[];
}
