import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entity/usuario.entity';
import { Publicacion } from '../../publicaciones/entity/publicacion.entity';

@Entity('mensaje')
export class Mensaje {
  @PrimaryGeneratedColumn({ name: 'id_mensaje' })
  id: number;

  @Column({ type: 'varchar', length: 250 })
  texto: string;

  @Column({ type: 'timestamp' })
  fecha: Date;

  // -- Relaciones --
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_origen_usuario' })
  origenUsuario: Usuario;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_destino_usuario' })
  destinoUsuario: Usuario;

  @ManyToOne(() => Publicacion)
  @JoinColumn({ name: 'id_publicacion' })
  publicacion: Publicacion;
}