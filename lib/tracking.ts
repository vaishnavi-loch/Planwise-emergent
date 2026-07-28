// Analytics seam. Env-gated. Body of `send` is intentionally minimal today — wire to your
// Engine Room / GA4 endpoint later. No third-party scripts ship at launch.

export type TrackEvent =
  | { name: 'page_view'; path: string }
  | { name: 'cta_click'; label: string; page: string }
  | { name: 'form_submit'; form: string; page: string };

async function send(event: TrackEvent): Promise<void> {
  const endpoint = process.env.ENGINE_ROOM_ENDPOINT;
  if (!endpoint) {
    // No endpoint configured — the site runs fine and events are dropped locally.
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log('[track:noop]', event);
    }
    return;
  }
  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...event, ts: Date.now() }),
      keepalive: true
    });
  } catch {
    // Never let analytics break the page.
  }
}

export function track(event: TrackEvent): void {
  // Fire-and-forget; safe from both client and server.
  void send(event);
}
