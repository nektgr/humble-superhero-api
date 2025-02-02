import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);
  
    catch(exception: HttpException, host: ArgumentsHost) {
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
  
      // ✅ Log the structured error message
      this.logger.warn(
        `🚨 [HTTP ${status}] ${errorResponse.path} - ${JSON.stringify(
          errorResponse.errorMessage,
        )}`,
      );
  
      response.status(status).json(errorResponse);
    }
  }
  