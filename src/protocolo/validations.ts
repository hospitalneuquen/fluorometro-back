import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IsDateBeforeThan } from 'src/shared/validationDecorators/isDateBeforeThan.validation';
import { IsNotEqualThan } from 'src/shared/validationDecorators/isNotEqualThan.validation';

export class ListParams {
  @IsNotEmpty()
  dateFrom: string;
  @IsNotEmpty()
  dateTo: string;
  numberFrom?: number;
  numberTo?: number;
  sinceNumber?: number;
}

export class FindProtocolosParams {
  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  dateFrom: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  @IsNotEqualThan('dateFrom')
  @IsDateBeforeThan('dateFrom')
  dateTo: string;

  numberFrom?: number;
  numberTo?: number;
  sinceNumber?: number;
}
