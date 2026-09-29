import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Barbero } from './entities/barbero.entity'; import { User } from '../users/entities/user.entity'; import { RolUsuario } from '../common/enums/roles.enum'; import { CreateBarberoDto } from './dto/create-barbero.dto'; import { UpdateBarberoDto } from './dto/update-barbero.dto';
@Injectable() export class BarberosService {
  constructor(@InjectRepository(Barbero) private readonly repo: Repository<Barbero>, @InjectRepository(User) private readonly users: Repository<User>) {}
  findAll() { return this.repo.find({ relations: { citas: true } }); }
  async findOne(id:string){const x=await this.repo.findOne({where:{id},relations:{citas:true}});if(!x)throw new NotFoundException('Barbero no encontrado.');return x;}
  async create(dto:CreateBarberoDto){const email=dto.email.toLowerCase().trim();if(await this.users.findOne({where:{email}}))throw new ConflictException('El correo ya está registrado.');const u=await this.users.save(this.users.create({nombre:dto.nombre,email,password:await bcrypt.hash(dto.password,10),rol:RolUsuario.BARBERO,estado:true}));return this.repo.save(this.repo.create({usuario:u,especialidad:dto.especialidad,descripcion:dto.descripcion,disponible:true}));}
  async update(id:string,dto:UpdateBarberoDto){const x=await this.findOne(id);if(dto.nombre)x.usuario.nombre=dto.nombre;if(dto.email)x.usuario.email=dto.email.toLowerCase().trim();if(dto.password)x.usuario.password=await bcrypt.hash(dto.password,10);await this.users.save(x.usuario);if(dto.especialidad!==undefined)x.especialidad=dto.especialidad;if(dto.descripcion!==undefined)x.descripcion=dto.descripcion;if(dto.disponible!==undefined)x.disponible=dto.disponible;return this.repo.save(x);}
  async remove(id:string){const x=await this.findOne(id);x.disponible=false;x.usuario.estado=false;await this.users.save(x.usuario);await this.repo.save(x);return{message:'Barbero desactivado correctamente.'};}
}
