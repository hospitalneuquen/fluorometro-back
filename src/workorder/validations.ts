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

  public constructor(listParams: ListParams) {
    this.dateFrom = listParams.dateFrom;
    this.dateTo = listParams.dateTo;
    this.numberFrom = listParams.numberFrom;
    this.dateTo = listParams.dateTo;
    this.sinceNumber = listParams.sinceNumber;
  }
}
