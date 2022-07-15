import { BadRequestException } from '@nestjs/common';
import { ValidationException } from './errors';

export interface ValidationMessage {
  code: string;
  message: string;
}

export abstract class BaseController {
  validationMessagges: ValidationMessage[] = [];
  setValidationMessageList(messages: ValidationMessage[]) {
    this.validationMessagges = messages;
  }

  private convertValidationExceptionToResponse(error: ValidationException) {
    const objectError = { statusCode: 400, messageCode: error.getCode() };
    const validationMessage = this.validationMessagges.find(
      (msg) => msg.code == error.getCode(),
    );
    if (!!validationMessage)
      throw new BadRequestException(
        { ...objectError, message: validationMessage.message },
        validationMessage.message,
      );
    else throw new BadRequestException(objectError, 'Error desconocido');
  }

  protected manageResponseError(error: ValidationException) {
    if (error instanceof ValidationException) {
      this.convertValidationExceptionToResponse(error);
    }
    throw error;
  }
}
