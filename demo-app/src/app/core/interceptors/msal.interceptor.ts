// MsalInterceptor is provided by @azure/msal-angular and registered via DI in app.config.ts.
// This file documents the pattern: it attaches Azure AD bearer tokens to outbound HTTP requests
// matching the protectedResourceMap defined in MSAL_INTERCEPTOR_CONFIG.
//
// Do NOT create a custom token interceptor — use the MSAL-provided one.
// See app.config.ts for the interceptor registration and protected resource configuration.

export { MsalInterceptor } from '@azure/msal-angular';
