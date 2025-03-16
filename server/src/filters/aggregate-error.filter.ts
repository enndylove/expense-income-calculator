import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(AggregateError)
export class AggregateErrorFilter implements ExceptionFilter {
  catch(error: AggregateError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errors = error.errors.map((err) =>
      err instanceof Error ? err.message : String(err),
    );

    console.error('AggregateError details:', {
      errors,
      stack: error.stack,
    });

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Multiple errors occurred',
      errors,
      timestamp: new Date().toISOString(),
    });
  }
}
