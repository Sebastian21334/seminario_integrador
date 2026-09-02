import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Publicacion } from '../../publicaciones/entity/publicacion.entity';
import { Reserva } from '../../reservas/entity/reserva.entity';

@Entity('fecha')
export class Fecha {
  @PrimaryGeneratedColumn({ name: 'id_fecha' })
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'boolean', default: true })
  disponible: boolean;

  // -- Relaciones --
  @ManyToOne(() => Publicacion)
  @JoinColumn({ name: 'id_publicacion' })
  publicacion: Publicacion;

  @ManyToOne(() => Reserva, { nullable: true })
  @JoinColumn({ name: 'id_reserva' })
  reserva: Reserva;
}