import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anunciante } from '../entity/anunciante.entity';
import { SolicitarAnuncianteDto } from '../dto/solicitar-anunciante.dto';
import { Usuario } from '../../usuarios/entity/usuario.entity';
import { TipoAnunciante } from '../../catalogos/entity/tipo-anunciante.entity';

@Injectable()
export class AnunciantesService {
  constructor(
    @InjectRepository(Anunciante) private anuncianteRepo: Repository<Anunciante>,
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    @InjectRepository(TipoAnunciante) private tipoRepo: Repository<TipoAnunciante>,
  ) {}

  async solicitarAlta(idUsuario: number, dto: SolicitarAnuncianteDto) {
    const usuario = await this.usuarioRepo.findOneBy({ id: idUsuario });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const existeAnunciante = await this.anuncianteRepo.findOneBy({ idUsuario });
    if (existeAnunciante) throw new ConflictException('El usuario ya solicitó ser anunciante');

    const tipoAnunciante = await this.tipoRepo.findOneBy({ id: dto.idTipoAnunciante });
    if (!tipoAnunciante) throw new NotFoundException('Tipo de anunciante no válido');

    const nuevoAnunciante = this.anuncianteRepo.create({
      idUsuario,
      usuario,
      cuit: dto.cuit,
      numero_contacto: dto.numero_contacto,
      tipoAnunciante,
      verificado: false, // RN-4: No puede publicar hasta ser aprobado
    });

    return await this.anuncianteRepo.save(nuevoAnunciante);
  }

  async aprobarAnunciante(idUsuario: number) {
    const anunciante = await this.anuncianteRepo.findOneBy({ idUsuario });
    if (!anunciante) throw new NotFoundException('Solicitud de anunciante no encontrada');

    anunciante.verificado = true;
    await this.anuncianteRepo.save(anunciante);
    
    // Aquí se podría integrar el servicio de correos para notificar la aprobación
    return { mensaje: 'Identidad verificada correctamente. El anunciante ya puede publicar.' };
  }

  async rechazarAnunciante(idUsuario: number, motivo: string) {
    const anunciante = await this.anuncianteRepo.findOneBy({ idUsuario });
    if (!anunciante) throw new NotFoundException('Solicitud de anunciante no encontrada');

    // RN-26: Notificar motivo y permitir recargar (en este enfoque, eliminamos la solicitud fallida)
    await this.anuncianteRepo.remove(anunciante);
    
    // Integración futura: Enviar correo al usuario con el 'motivo' de rechazo
    return { mensaje: `Solicitud rechazada. Motivo: ${motivo}` };
  }

  async listarPendientes() {
    return await this.anuncianteRepo.find({
      where: { verificado: false },
      relations: ['usuario', 'tipoAnunciante'],
    });
  }
}