import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

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

export class ListParams {
  itemCode: string;
  @IsNotEmpty()
  @IsString()
  orden_trabajo_id: string;
}

export class FindOneParams {
  @IsMongoId({ message: 'Must be a valid id value' })
  id: string;
}

export class FluorometerInputResultDTO {
  resultCode: string;
  status: string;
  code: string;
  counts: string;
  concentrationMgDl: string;
}
