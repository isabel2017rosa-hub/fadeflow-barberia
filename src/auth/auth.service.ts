import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RolUsuario } from '../common/enums/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Cliente) private readonly clientes: Repository<Cliente>,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase().trim();
    const exists = await this.users.findOne({ where: { email } });
    if (exists) throw new ConflictException('El correo ya está registrado.');

    const user = this.users.create({
      nombre: dto.nombre.trim(),
      email,
      password: await bcrypt.hash(dto.password, 10),
      rol: RolUsuario.CLIENTE,
      estado: true,
    });
    const saved = await this.users.save(user);
    await this.clientes.save(this.clientes.create({ usuario: saved, telefono: dto.telefono, direccion: dto.direccion }));

    return { message: 'Usuario registrado satisfactoriamente.', user: this.publicUser(saved) };
  }

  async login(dto: LoginDto) {
    const user = await this.users.createQueryBuilder('user').addSelect('user.password').where('LOWER(user.email) = LOWER(:email)', { email: dto.email.trim() }).getOne();
    if (!user || !user.estado || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }
    const access_token = await this.jwt.signAsync({ sub: user.id, email: user.email, rol: user.rol });
    return { message: 'Autenticación satisfactoria.', access_token, user: this.publicUser(user) };
  }

  async me(userId: string) {
    const user = await this.users.findOne({ where: { id: userId }, relations: { cliente: true, barbero: true } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado.');
    return this.publicUser(user);
  }

  private publicUser(user: User) {
    return { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol, estado: user.estado, fechaRegistro: user.fechaRegistro };
  }
}
