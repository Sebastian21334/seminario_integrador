import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('metodo_pago')
export class MetodoPago {
  @PrimaryGeneratedColumn({ name: 'id_metodo_pago' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  descripcion: string;
}