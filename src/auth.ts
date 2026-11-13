export interface AuthTokenRequest {
  endpoint: string;
  sessionName: string;
  role: 0 | 1;
}

export async function requestSessionToken(request: AuthTokenRequest, signal?: AbortSignal): Promise<string> {
  const response = await fetch(request.endpoint.trim(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionName: request.sessionName,
      role: request.role,
      videoWebRtcMode: 1,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Auth endpoint returned HTTP ${response.status}.`);
  }

  const body: unknown = await response.json();
  if (
    !body ||
    typeof body !== 'object' ||
    !('signature' in body) ||
    typeof body.signature !== 'string' ||
    !body.signature.trim()
  ) {
    throw new Error('Auth endpoint did not return a signature.');
  }

  return body.signature;
}
