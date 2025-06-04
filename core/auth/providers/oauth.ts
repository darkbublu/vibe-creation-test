export class OAuthProvider {
  constructor(private config: OAuthConfig) {}
  //8

function handleOAuthCallback(code: string): Promise<OAuthTokens> {
  const response = await fetch('/api/auth/oauth/callback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

function initiateOAuthFlow(provider: OAuthProvider): Promise<void> {
  const authUrl = provider.getProviderUrl();
  // Open OAuth popup window
  window.open(authUrl, 'oauth', 'width=600,height=600');
}