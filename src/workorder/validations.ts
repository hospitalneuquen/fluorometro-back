import { IsNotEmpty } from 'class-validator';

export class ListParams {
  @IsNotEmpty()
  dateFrom: string;
  @IsNotEmpty()
  dateTo: string;
  numberFrom?: number;
  numberTo?: number;
  sinceNumber?: number;
}

export class FindWorkOrdersParams {
  @IsNotEmpty()
  dateFrom: string;
  @IsNotEmpty()
  dateTo: string;
  numberFrom?: number;
  numberTo?: number;
  sinceNumber?: number;
}
