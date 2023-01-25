import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateWorklistDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  work_order_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 10)
  study_code: string;
}
