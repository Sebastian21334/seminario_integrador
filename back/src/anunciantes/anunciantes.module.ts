import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anunciante } from './entity/anunciante.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Anunciante]), 
      ],
})
export class AnunciantesModule {}
