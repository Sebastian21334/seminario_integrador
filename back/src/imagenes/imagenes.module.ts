import { Module } from '@nestjs/common';
import { Imagen } from './entity/imagen.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [ TypeOrmModule.forFeature([Imagen]) ],
})
export class ImagenesModule {}
