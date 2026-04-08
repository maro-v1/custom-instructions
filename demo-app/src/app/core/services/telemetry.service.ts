import { Injectable } from '@angular/core';
import { ApplicationInsights, SeverityLevel } from '@microsoft/applicationinsights-web';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TelemetryService {
  private appInsights: ApplicationInsights;

  constructor() {
    this.appInsights = new ApplicationInsights({
      config: {
        connectionString: environment.appInsights.connectionString,
        enableAutoRouteTracking: true,
      },
    });
    this.appInsights.loadAppInsights();
  }

  trackEvent(name: string, properties?: Record<string, string>): void {
    this.appInsights.trackEvent({ name }, properties);
  }

  trackTrace(message: string, severityLevel?: SeverityLevel): void {
    this.appInsights.trackTrace({ message, severityLevel });
  }

  trackException(error: unknown): void {
    this.appInsights.trackException({
      exception: error instanceof Error ? error : new Error(String(error)),
    });
  }
}
