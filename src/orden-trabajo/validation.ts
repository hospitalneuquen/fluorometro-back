import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ListParams {
  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  dateFrom: string;
  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  dateTo: string;
  numberFrom?: number;
  numberTo?: number;
  sinceNumber?: number;
}
