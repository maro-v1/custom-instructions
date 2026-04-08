export const environment = {
  production: true,
  backendUrl: '#{BackendUrl}#',
  msalConfig: {
    auth: {
      clientId: '#{MsalClientId}#',
      authority: 'https://login.microsoftonline.com/#{TenantId}#',
      redirectUri: '#{RedirectUri}#',
    },
  },
  appInsights: {
    connectionString: '#{AppInsightsConnectionString}#',
  },
};
