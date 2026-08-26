export type AnalyticsEvent =
  | 'view_product'
  | 'select_size'
  | 'add_to_cart'
  | 'begin_checkout'
  | 'address_started'
  | 'address_completed'
  | 'delivery_selected'
  | 'payment_method_selected'
  | 'upi_intent_opened'
  | 'payment_success'
  | 'payment_failed'
  | 'payment_pending'
  | 'payment_retry'
  | 'cod_selected'
  | 'partial_cod_confirmed'
  | 'order_created'
  | 'order_cancelled';

export interface AnalyticsEventData {
  product_id?: string;
  product_name?: string;
  size?: string;
  price?: number;
  value?: number;
  payment_type?: 'PREPAID' | 'PARTIAL_COD';
  method?: string;
  pincode?: string;
  city?: string;
  state?: string;
  error_message?: string;
  order_id?: string;
  [key: string]: any;
}

export function trackEvent(event: AnalyticsEvent, data?: AnalyticsEventData) {
  if (typeof window !== 'undefined') {
    // Console audit log for analytics monitoring
    console.log(`[Analytics Event: ${event}]`, data || {});

    // Support window.dataLayer for Google Analytics / GTM
    if (Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push({
        event,
        ...data,
        timestamp: new Date().toISOString(),
      });
    }

    // Support custom window event dispatching
    const customEvent = new CustomEvent('bahamut_analytics', {
      detail: { event, data, timestamp: new Date().toISOString() },
    });
    window.dispatchEvent(customEvent);
  }
}
