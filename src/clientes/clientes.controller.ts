import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolUsuario } from '../common/enums/roles.enum';

@ApiTags('Clientes') @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Controller('clientes')
export class ClientesController {
  constructor(private readonly service: ClientesService) {}
  @Get() @Roles(RolUsuario.ADMINISTRADOR, RolUsuario.BARBERO) findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Post() @Roles(RolUsuario.ADMINISTRADOR) create(@Body() dto: CreateClienteDto) { return this.service.create(dto); }
  @Patch(':id') @Roles(RolUsuario.ADMINISTRADOR) update(@Param('id') id: string, @Body() dto: UpdateClienteDto) { return this.service.update(id, dto); }
  @Delete(':id') @Roles(RolUsuario.ADMINISTRADOR) remove(@Param('id') id: string) { return this.service.remove(id); }
}
