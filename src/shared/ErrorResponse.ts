export interface ErrorResponse {
  statusCode: number;
  code: string;
  timestamp: string;
  messages: string[];
  path: string;
}
