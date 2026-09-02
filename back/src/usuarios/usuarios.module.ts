import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entity/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]), // Registramos la entidad aquí
  ],
})
export class UsuariosModule {}