import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../../usuarios/entity/usuario.entity';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario) private usersRepo: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // 1. Verificamos que el email no exista
    const existe = await this.usersRepo.findOneBy({ email: dto.email });
    if (existe) {
      throw new ConflictException('El email ya está registrado');
    }

    // 2. Encriptamos la contraseña
    const passwordHash = await bcrypt.hash(dto.contrasenia, 10);

    // 3. Guardamos el usuario (por ahora sin rol, luego se lo asignamos)
    const nuevoUsuario = this.usersRepo.create({
      ...dto,
      contrasenia: passwordHash,
    });

    await this.usersRepo.save(nuevoUsuario);
    return { mensaje: 'Usuario registrado exitosamente' };
  }

  async login(dto: LoginDto) {
    // 1. Buscamos al usuario
    const user = await this.usersRepo.findOneBy({ email: dto.email });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    // 2. Comparamos las contraseñas
    const passValida = await bcrypt.compare(dto.contrasenia, user.contrasenia);
    if (!passValida) throw new UnauthorizedException('Credenciales inválidas');

    // 3. Generamos el Token
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}