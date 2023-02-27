import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSystemConfigDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalSpaces: number;
}
