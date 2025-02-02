import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to log incoming HTTP requests and their responses.
 * Logs request details, response status, and duration, and flags slow requests.
 */
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  /**
   * Logs the incoming request and its corresponding response details.
   *
   * @param req The incoming request object.
   * @param res The outgoing response object.
   * @param next The callback to pass control to the next middleware.
   */
  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, body } = req;
    const startTime = Date.now();
    const requestBody = { ...body };

    // Remove sensitive data (if any)
    delete requestBody.password;

    this.logger.log(
      `📥 Request: ${method} ${originalUrl} - Payload: ${JSON.stringify(
        requestBody,
      )}`,
    );

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const statusColor = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m'; // Red for errors, green for success
      const resetColor = '\x1b[0m';

      if (res.statusCode >= 400) {
        this.logger.warn(
          `${statusColor}❌ ERROR: ${method} ${originalUrl} - ${res.statusCode} (${duration}ms)${resetColor}`,
        );
      } else {
        this.logger.log(
          `${statusColor}✅ SUCCESS: ${method} ${originalUrl} - ${res.statusCode} (${duration}ms)${resetColor}`,
        );
      }

      // Flag slow requests (> 500ms)
      if (duration > 500) {
        this.logger.warn(`⚠️ SLOW REQUEST: ${method} ${originalUrl} took ${duration}ms`);
      }
    });

    next();
  }
}
