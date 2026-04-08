import { ErrorHandler, Injectable } from '@angular/core';
import { TelemetryService } from '../services/telemetry.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private readonly telemetry: TelemetryService) {}

  handleError(error: unknown): void {
    // Forward all unhandled errors to Application Insights
    this.telemetry.trackException(error);

    // Also log to console for local development
    console.error('Unhandled error:', error);
  }
}
