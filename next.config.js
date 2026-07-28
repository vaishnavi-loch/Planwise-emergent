/** @type {import('next').NextConfig} */
// Dev preview needs to load /_next/* assets cross-origin from the Emergent preview host,
// and be embedded in the Emergent preview iframe. Allow both for dev; production can
// tighten frame-ancestors to 'none' via a CDN/reverse-proxy header override.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "img-src 'self' data: blob:",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "connect-src 'self' https:",
      // Allow embedding in Emergent's preview iframe. Tighten to 'none' at deploy time.
      "frame-ancestors 'self' https://*.emergentagent.com https://*.emergent.host https://*.emergentcf.cloud",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  }
];

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Next 15 dev-server: whitelist the preview hostnames so /_next/* assets load cross-origin.
  allowedDevOrigins: [
    '*.preview.emergentagent.com',
    '*.emergentagent.com',
    '*.emergent.host',
    '*.emergentcf.cloud',
    '*.preview.emergentcf.cloud'
  ],
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  }
};
