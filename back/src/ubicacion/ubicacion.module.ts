import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provincia } from './entity/provincia.entity';
import { Ciudad } from './entity/ciudad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Provincia, Ciudad]),
  ],
})
export class UbicacionModule {}