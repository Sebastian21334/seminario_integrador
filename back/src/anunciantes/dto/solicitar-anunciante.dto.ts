import { IsNotEmpty, IsString, MaxLength, IsNumber } from 'class-validator';

export class SolicitarAnuncianteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  cuit: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  numero_contacto: string;

  @IsNumber()
  idTipoAnunciante: number; 
}
