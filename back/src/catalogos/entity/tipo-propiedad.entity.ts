import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipo_propiedad')
export class TipoPropiedad {
  @PrimaryGeneratedColumn({ name: 'id_tipo_propiedad' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string;
}