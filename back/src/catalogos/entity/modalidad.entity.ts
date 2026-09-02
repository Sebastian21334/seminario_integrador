import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('modalidad')
export class Modalidad {
  @PrimaryGeneratedColumn({ name: 'id_modalidad' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string;
}