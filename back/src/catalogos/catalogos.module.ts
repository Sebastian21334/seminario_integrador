import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entity/rol.entity';
import { TipoAnunciante } from './entity/tipo-anunciante.entity';
import { TipoPropiedad } from './entity/tipo-propiedad.entity';
import { MetodoPago } from './entity/metodo-pago.entity';
import { Modalidad } from './entity/modalidad.entity';
import { TipoMoneda } from './entity/tipo-moneda.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rol, TipoAnunciante, TipoPropiedad, Modalidad, MetodoPago, TipoMoneda]), 
  ],
})
export class CatalogosModule {}