import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePruebaLaboratorioDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 10)
  codigo: string;
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
