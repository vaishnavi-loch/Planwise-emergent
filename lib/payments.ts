// Payments seam. Stripe intentionally NOT integrated at launch. When STRIPE_SECRET_KEY is
// set in env, implement createCheckoutSession() below and switch any membership CTA to call it.

export interface CheckoutRequest {
  tierId: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}

export interface CheckoutResult {
  url: string;
}

export async function createCheckoutSession(_req: CheckoutRequest): Promise<CheckoutResult> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('Payments disabled: STRIPE_SECRET_KEY is not set.');
  }
  // Left as a stub — implement Stripe SDK call once credentials are provided.
  throw new Error('createCheckoutSession is a stub. Implement Stripe integration here.');
}

export function paymentsEnabled(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
