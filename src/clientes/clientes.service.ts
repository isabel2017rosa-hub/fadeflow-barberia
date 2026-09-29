import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { User } from '../users/entities/user.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { RolUsuario } from '../common/enums/roles.enum';

@Injectable()
export class ClientesService {
  constructor(@InjectRepository(Cliente) private readonly repo: Repository<Cliente>, @InjectRepository(User) private readonly users: Repository<User>) {}

  findAll() { return this.repo.find({ relations: { citas: true } }); }
  async findOne(id: string) { const item = await this.repo.findOne({ where: { id }, relations: { citas: true } }); if (!item) throw new NotFoundException('Cliente no encontrado.'); return item; }

  async create(dto: CreateClienteDto) {
    const email = dto.email.toLowerCase().trim();
    if (await this.users.findOne({ where: { email } })) throw new ConflictException('El correo ya está registrado.');
    const user = await this.users.save(this.users.create({ nombre: dto.nombre, email, password: await bcrypt.hash('Temporal123!', 10), rol: RolUsuario.CLIENTE, estado: true }));
    return this.repo.save(this.repo.create({ usuario: user, telefono: dto.telefono, direccion: dto.direccion }));
  }

  async update(id: string, dto: UpdateClienteDto) {
    const cliente = await this.findOne(id);
    if (dto.nombre || dto.email) {
      if (dto.nombre) cliente.usuario.nombre = dto.nombre;
      if (dto.email) cliente.usuario.email = dto.email.toLowerCase().trim();
      await this.users.save(cliente.usuario);
    }
    if (dto.telefono !== undefined) cliente.telefono = dto.telefono;
    if (dto.direccion !== undefined) cliente.direccion = dto.direccion;
    return this.repo.save(cliente);
  }

  async remove(id: string) { const cliente = await this.findOne(id); cliente.usuario.estado = false; await this.users.save(cliente.usuario); return { message: 'Cliente desactivado correctamente.' }; }
}
