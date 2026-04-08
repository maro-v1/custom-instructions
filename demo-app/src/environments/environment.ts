export const environment = {
  production: false,
  backendUrl: 'http://localhost:5000',
  msalConfig: {
    auth: {
      clientId: '#{MsalClientId}#',
      authority: 'https://login.microsoftonline.com/#{TenantId}#',
      redirectUri: 'http://localhost:4444',
    },
  },
  appInsights: {
    connectionString: '#{AppInsightsConnectionString}#',
  },
};
