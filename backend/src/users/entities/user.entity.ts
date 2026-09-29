import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RolUsuario } from '../../common/enums/roles.enum';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Barbero } from '../../barberos/entities/barbero.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ unique: true, length: 150 })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ type: 'enum', enum: RolUsuario, default: RolUsuario.CLIENTE })
  rol!: RolUsuario;

  @Column({ default: true })
  estado!: boolean;

  @CreateDateColumn()
  fechaRegistro!: Date;

  @OneToOne(() => Cliente, (cliente) => cliente.usuario)
  cliente?: Cliente;

  @OneToOne(() => Barbero, (barbero) => barbero.usuario)
  barbero?: Barbero;
}
