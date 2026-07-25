import {
  SharePayload,
  ShareTargetType
} from '../types';
import {
  ShareReceiptInput,
  ShareCatalogItemInput,
  ShareCatalogCategoryInput,
  SharePartyCardInput,
  ShareBusinessProfileInput,
  GenerateSharePayloadInput
} from '../api/dto';

/**
 * Domain layer responsible for pure functions that build payloads, format text, and construct QR values.
 */

export function buildQRValue(type: ShareTargetType, id: string, baseUrl?: string): string {
  const origin = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');

  // Use route-safe URLs for QR codes
  switch (type) {
    case 'sale_receipt':
      return `${origin}/share/receipt/${id}`;
    case 'catalog_item':
      return `${origin}/share/item/${id}`;
    case 'catalog_category':
      return `${origin}/share/category/${id}`;
    case 'party_card':
      return `${origin}/share/party/${id}`;
    case 'business_profile':
      return `${origin}/share/business`;
    default:
      return `${origin}/share/${type}/${id}`;
  }
}

export function buildReceiptSharePayload(input: ShareReceiptInput): SharePayload {
  const text = `Receipt: ${input.receiptNumber}\nDate: ${input.date}\nTotal: $${input.total.toFixed(2)}${input.customerName ? `\nCustomer: ${input.customerName}` : ''}`;
  const url = buildQRValue('sale_receipt', input.receiptId, input.baseUrl);

  return {
    type: 'sale_receipt',
    title: `Receipt ${input.receiptNumber}`,
    text,
    url,
    qrValue: url,
    meta: {
      receiptNumber: input.receiptNumber,
      total: input.total,
    },
    createdAt: new Date().toISOString(),
  };
}

export function buildCatalogItemSharePayload(input: ShareCatalogItemInput): SharePayload {
  const priceText = input.price !== undefined ? ` - $${input.price.toFixed(2)}` : '';
  const descText = input.description ? `\n${input.description}` : '';
  const text = `Check out ${input.name}${priceText}${descText}`;
  const url = buildQRValue('catalog_item', input.itemId, input.baseUrl);

  return {
    type: 'catalog_item',
    title: input.name,
    text,
    url,
    qrValue: url,
    createdAt: new Date().toISOString(),
  };
}

export function buildCatalogCategorySharePayload(input: ShareCatalogCategoryInput): SharePayload {
  const itemCountText = input.itemCount !== undefined ? ` (${input.itemCount} items)` : '';
  const text = `Explore our category: ${input.name}${itemCountText}`;
  const url = buildQRValue('catalog_category', input.categoryId, input.baseUrl);

  return {
    type: 'catalog_category',
    title: `Category: ${input.name}`,
    text,
    url,
    qrValue: url,
    createdAt: new Date().toISOString(),
  };
}

export function buildPartySharePayload(input: SharePartyCardInput): SharePayload {
  const phoneText = input.phone ? `\nPhone: ${input.phone}` : '';
  const emailText = input.email ? `\nEmail: ${input.email}` : '';
  const text = `Contact: ${input.name}${phoneText}${emailText}`;
  const url = buildQRValue('party_card', input.partyId, input.baseUrl);

  return {
    type: 'party_card',
    title: `${input.name} - Contact`,
    text,
    url,
    qrValue: url,
    createdAt: new Date().toISOString(),
  };
}

export function buildBusinessProfileSharePayload(input: ShareBusinessProfileInput): SharePayload {
  const phoneText = input.phone ? `\nPhone: ${input.phone}` : '';
  const addressText = input.address ? `\nAddress: ${input.address}` : '';
  const taglineText = input.tagline ? `\n${input.tagline}` : '';
  const text = `${input.name}${taglineText}${phoneText}${addressText}`;
  const url = buildQRValue('business_profile', input.businessId, input.baseUrl);

  return {
    type: 'business_profile',
    title: input.name,
    text,
    url,
    qrValue: url,
    createdAt: new Date().toISOString(),
  };
}

export function buildGenericSharePayload(input: GenerateSharePayloadInput): SharePayload {
  const title = input.title;
  const text = `Shared: ${input.title}`;
  const url = buildQRValue(input.type, input.id, input.baseUrl);

  return {
    type: input.type,
    title,
    text,
    url,
    qrValue: url,
    meta: input.data,
    createdAt: new Date().toISOString(),
  };
}

export function normalizeShareText(payload: SharePayload): string {
  // Construct a fallback string for environments that don't support Web Share
  const urlPart = payload.url ? `\n\nLink: ${payload.url}` : '';
  return `${payload.title}\n\n${payload.text}${urlPart}`;
}

export function validateShareInput(input: any, requiredFields: string[]): boolean {
  if (!input) return false;
  for (const field of requiredFields) {
    if (input[field] === undefined || input[field] === null) {
      return false;
    }
  }
  return true;
}
