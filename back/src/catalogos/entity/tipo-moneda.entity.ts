// tipo-moneda.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipo_moneda')
export class TipoMoneda {
  @PrimaryGeneratedColumn({ name: 'id_tipo_moneda' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string;
}