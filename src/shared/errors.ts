export class ValidationException extends Error {
  constructor(private code: string, message: string) {
    super(message);
  }
  getCode(): string {
    return this.code;
  }
}
