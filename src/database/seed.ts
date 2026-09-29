import 'reflect-metadata';
import * as bcrypt from 'bcrypt';
import dataSource from './data-source';
import { User } from '../users/entities/user.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Barbero } from '../barberos/entities/barbero.entity';
import { Servicio } from '../servicios/entities/servicio.entity';
import { RolUsuario } from '../common/enums/roles.enum';

async function seed() {
  await dataSource.initialize();
  const users = dataSource.getRepository(User); const clientes = dataSource.getRepository(Cliente); const barberos = dataSource.getRepository(Barbero); const servicios = dataSource.getRepository(Servicio);
  const adminEmail='admin@barberia.local';
  if(!(await users.findOne({where:{email:adminEmail}}))) await users.save(users.create({nombre:'Administrador',email:adminEmail,password:await bcrypt.hash('Admin123!',10),rol:RolUsuario.ADMINISTRADOR,estado:true}));
  let bu=await users.findOne({where:{email:'barbero@barberia.local'}}); if(!bu) bu=await users.save(users.create({nombre:'Carlos Barber',email:'barbero@barberia.local',password:await bcrypt.hash('Barbero123!',10),rol:RolUsuario.BARBERO,estado:true})); if(!(await barberos.findOne({where:{usuario:{id:bu.id}}}))) await barberos.save(barberos.create({usuario:bu,especialidad:'Corte clásico y barba',descripcion:'Barbero de prueba',disponible:true}));
  let cu=await users.findOne({where:{email:'cliente@barberia.local'}}); if(!cu) cu=await users.save(users.create({nombre:'Cliente Demo',email:'cliente@barberia.local',password:await bcrypt.hash('Cliente123!',10),rol:RolUsuario.CLIENTE,estado:true})); if(!(await clientes.findOne({where:{usuario:{id:cu.id}}}))) await clientes.save(clientes.create({usuario:cu,telefono:'3000000000',direccion:'Dirección de prueba'}));
  const items=[['Corte de cabello','Corte masculino',45,25000],['Barba y bigote','Perfilado y arreglo de barba',30,18000],['Corte + barba','Servicio combinado',70,38000]] as const;
  for(const [nombre,descripcion,duracionMinutos,precio] of items) if(!(await servicios.findOne({where:{nombre}}))) await servicios.save(servicios.create({nombre,descripcion,duracionMinutos,precio:String(precio),activo:true}));
  await dataSource.destroy(); console.log('Seed completado.');
}
seed().catch(async(error)=>{console.error(error);if(dataSource.isInitialized)await dataSource.destroy();process.exit(1);});
