import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicacion } from './entity/publicacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Publicacion]),
  ],
})
export class PublicacionesModule {}