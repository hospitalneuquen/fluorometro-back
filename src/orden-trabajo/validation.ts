import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ListParams {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  dateFrom: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  dateTo: string;

  @ApiProperty()
  numberFrom?: number;
  numberTo?: number;
  sinceNumber?: number;
}
