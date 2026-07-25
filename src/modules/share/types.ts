export type ShareTargetType =
  | 'sale_receipt'
  | 'catalog_item'
  | 'catalog_category'
  | 'party_card'
  | 'business_profile'
  | 'payment_reference'
  | 'booking_entry'
  | 'custom_link';

export interface SharePayload {
  type: ShareTargetType;
  title: string;
  text: string;
  url?: string;
  qrValue: string;
  meta?: Record<string, unknown>;
  createdAt: string; // ISO format date string
}

export interface QRDisplayData {
  title: string;
  subtitle?: string;
  qrValue: string;
  humanReadableValue: string;
  actionLabel?: string;
}

export interface PublicShareViewModel {
  id: string;
  type: ShareTargetType;
  title: string;
  subtitle?: string;
  lines: string[];
  actionUrl?: string;
  createdAt: string;
}

// Minimal stub for business settings/preferences, used by repository
export interface ShareSettings {
  defaultShareMethod?: 'native' | 'copy';
  businessName?: string;
  businessPhone?: string;
  businessAddress?: string;
  businessTagline?: string;
}
