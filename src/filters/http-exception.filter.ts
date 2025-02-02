import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * Exception filter to catch HTTP exceptions and return a structured error response.
 * Logs the error and sends a JSON response containing the status code, timestamp, request path, and error message.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  /**
   * Handles HTTP exceptions.
   *
   * @param exception The thrown HttpException.
   * @param host The arguments host containing the request/response context.
   */
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      errorMessage: exceptionResponse['message'] || exception.message,
    };

    // Log the structured error message
    this.logger.warn(
      `🚨 [HTTP ${status}] ${errorResponse.path} - ${JSON.stringify(
        errorResponse.errorMessage,
      )}`,
    );

    response.status(status).json(errorResponse);
  }
}
