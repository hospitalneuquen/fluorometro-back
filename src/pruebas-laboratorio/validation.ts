import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePruebaLaboratorioDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 10)
  codigo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;
}

export class FindOneParams {
  @IsMongoId({ message: 'Must be a valid id value' })
  id: string;
}
