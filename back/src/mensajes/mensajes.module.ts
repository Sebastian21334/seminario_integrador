import { Module } from '@nestjs/common';
import { Mensaje } from './entity/mensaje.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Mensaje])],
})
export class MensajesModule {}
