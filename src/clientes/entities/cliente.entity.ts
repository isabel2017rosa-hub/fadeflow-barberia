import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Cita } from '../../citas/entities/cita.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User, (user) => user.cliente, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: User;

  @Column({ length: 30, nullable: true })
  telefono?: string;

  @Column({ length: 200, nullable: true })
  direccion?: string;

  @OneToMany(() => Cita, (cita) => cita.cliente)
  citas!: Cita[];
}
