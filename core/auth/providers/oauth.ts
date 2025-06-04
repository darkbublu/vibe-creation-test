interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  provider: 'google' | 'github' | 'microsoft';
}

interface OAuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export class OAuthProvider {
  constructor(private config: OAuthConfig) {}

  public getProviderUrl(): string {
    switch (this.config.provider) {
      case 'google':
        return 'https://accounts.google.com/o/oauth2/v2/auth';
      case 'github':
        return 'https://github.com/login/oauth/authorize';
      case 'microsoft':
        return 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
      default:
        throw new Error('Unsupported provider');
    }
  }
}

export async function initiateOAuthFlow(provider: OAuthProvider): Promise<void> {
  const authUrl = provider.getProviderUrl();
  // Open OAuth popup window
  window.open(authUrl, 'oauth', 'width=600,height=600');
}

export async function handleOAuthCallback(code: string): Promise<OAuthTokens> {
  const response = await fetch('/api/auth/oauth/callback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error('OAuth authentication failed');
  }

  return response.json();
}

//725