/**
 * Google Analytics 4 — Enhanced Ecommerce tracking utilities
 *
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID in your .env.local file:
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

// ── gtag type declaration ─────────────────────────────────────────────────────
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

function gtag(command: 'config' | 'event' | 'js' | 'set', targetId: string, params?: Record<string, unknown>) {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) return;
  window.gtag(command, targetId, params);
}

// ── Page view (called on route change) ───────────────────────────────────────
export function trackPageView(url: string) {
  gtag('config', GA_ID, { page_path: url });
}

// ── GA4 item schema ───────────────────────────────────────────────────────────
interface GA4Item {
  item_id: string;
  item_name: string;
  item_category?: string;
  price?: number;
  quantity?: number;
  item_variant?: string;
}

function makeItem(
  id: string,
  name: string,
  category: string,
  price: number,
  quantity = 1,
  variant?: string
): GA4Item {
  return { item_id: id, item_name: name, item_category: category, price, quantity, ...(variant ? { item_variant: variant } : {}) };
}

// ── Ecommerce events ──────────────────────────────────────────────────────────

/** Fired when a product detail page is viewed */
export function trackViewItem(product: { id: string; name: string; category: string; price: number; sku: string }) {
  gtag('event', 'view_item', {
    currency: 'GBP',
    value: product.price,
    items: [makeItem(product.sku, product.name, product.category, product.price)],
  });
}

/** Fired when a product list (category / search results) is rendered */
export function trackViewItemList(
  products: { id: string; name: string; category: string; price: number; sku: string }[],
  listName: string
) {
  gtag('event', 'view_item_list', {
    item_list_name: listName,
    items: products.map((p, i) =>
      makeItem(p.sku, p.name, p.category, p.price, 1)
    ),
  });
}

/** Fired when an item is added to the cart */
export function trackAddToCart(product: { id: string; name: string; category: string; price: number; sku: string }, quantity: number) {
  gtag('event', 'add_to_cart', {
    currency: 'GBP',
    value: product.price * quantity,
    items: [makeItem(product.sku, product.name, product.category, product.price, quantity)],
  });
}

/** Fired when an item is removed from the cart */
export function trackRemoveFromCart(product: { id: string; name: string; category: string; price: number; sku: string }, quantity: number) {
  gtag('event', 'remove_from_cart', {
    currency: 'GBP',
    value: product.price * quantity,
    items: [makeItem(product.sku, product.name, product.category, product.price, quantity)],
  });
}

/** Fired when the cart drawer is opened or /cart page visited */
export function trackViewCart(items: { product: { sku: string; name: string; category: string; price: number }; quantity: number }[], subtotal: number) {
  gtag('event', 'view_cart', {
    currency: 'GBP',
    value: subtotal,
    items: items.map((i) =>
      makeItem(i.product.sku, i.product.name, i.product.category, i.product.price, i.quantity)
    ),
  });
}

/** Fired when /checkout page loads (step 1) */
export function trackBeginCheckout(items: { product: { sku: string; name: string; category: string; price: number }; quantity: number }[], value: number) {
  gtag('event', 'begin_checkout', {
    currency: 'GBP',
    value,
    items: items.map((i) =>
      makeItem(i.product.sku, i.product.name, i.product.category, i.product.price, i.quantity)
    ),
  });
}

/** Fired when the user submits their shipping address (step 2) */
export function trackAddShippingInfo(items: { product: { sku: string; name: string; category: string; price: number }; quantity: number }[], value: number, shippingTier: string) {
  gtag('event', 'add_shipping_info', {
    currency: 'GBP',
    value,
    shipping_tier: shippingTier,
    items: items.map((i) =>
      makeItem(i.product.sku, i.product.name, i.product.category, i.product.price, i.quantity)
    ),
  });
}

/** Fired when the user submits their payment details (step 3) */
export function trackAddPaymentInfo(items: { product: { sku: string; name: string; category: string; price: number }; quantity: number }[], value: number) {
  gtag('event', 'add_payment_info', {
    currency: 'GBP',
    value,
    payment_type: 'Credit Card',
    items: items.map((i) =>
      makeItem(i.product.sku, i.product.name, i.product.category, i.product.price, i.quantity)
    ),
  });
}

/** Fired on the order confirmation page — the main conversion event */
export function trackPurchase(
  orderId: string,
  items: { product: { sku: string; name: string; category: string; price: number }; quantity: number }[],
  subtotal: number,
  shipping: number,
  total: number
) {
  gtag('event', 'purchase', {
    transaction_id: orderId,
    currency: 'GBP',
    value: total,
    shipping,
    tax: 0,
    items: items.map((i) =>
      makeItem(i.product.sku, i.product.name, i.product.category, i.product.price, i.quantity)
    ),
  });
}

// ── Lead / enquiry events ─────────────────────────────────────────────────────

/** Fired when an Enquire button is clicked (Peracide / D&J pages) */
export function trackEnquiry(productName: string, source: string) {
  gtag('event', 'generate_lead', {
    currency: 'GBP',
    value: 0,
    source,
    product_name: productName,
  });
}

/** Fired when the contact form is submitted */
export function trackContactForm(enquiryType: string) {
  gtag('event', 'generate_lead', {
    source: 'contact_form',
    enquiry_type: enquiryType,
  });
}

/** Generic custom event for anything else */
export function trackEvent(action: string, params: Record<string, unknown> = {}) {
  gtag('event', action, params);
}
