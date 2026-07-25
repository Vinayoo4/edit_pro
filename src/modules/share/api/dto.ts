import { PublicShareViewModel, SharePayload, ShareTargetType } from '../types';

export interface GenerateSharePayloadInput {
  type: ShareTargetType;
  id: string;
  title: string;
  data: Record<string, any>;
  baseUrl?: string; // used to construct fallback URLs
}

export interface GenerateSharePayloadResponse {
  payload: SharePayload;
}

export interface GenerateQRInput {
  type: ShareTargetType;
  id: string;
  data: Record<string, any>;
  baseUrl?: string;
}

export interface GenerateQRResponse {
  qrValue: string;
  humanReadableValue: string;
}

export interface ShareReceiptInput {
  receiptId: string;
  receiptNumber: string;
  total: number;
  date: string;
  itemsCount: number;
  customerName?: string;
  baseUrl?: string;
}

export interface ShareCatalogItemInput {
  itemId: string;
  name: string;
  price?: number;
  description?: string;
  baseUrl?: string;
}

export interface ShareCatalogCategoryInput {
  categoryId: string;
  name: string;
  itemCount?: number;
  baseUrl?: string;
}

export interface SharePartyCardInput {
  partyId: string;
  name: string;
  phone?: string;
  email?: string;
  role?: string;
  baseUrl?: string;
}

export interface ShareBusinessProfileInput {
  businessId: string;
  name: string;
  phone?: string;
  address?: string;
  tagline?: string;
  baseUrl?: string;
}

export interface PublicShareViewResponse {
  view: PublicShareViewModel | null;
  error?: string;
}
