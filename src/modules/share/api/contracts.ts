import {
  GenerateSharePayloadInput,
  GenerateSharePayloadResponse,
  GenerateQRInput,
  GenerateQRResponse,
  ShareReceiptInput,
  ShareCatalogItemInput,
  ShareCatalogCategoryInput,
  SharePartyCardInput,
  ShareBusinessProfileInput,
  PublicShareViewResponse
} from './dto';

/**
 * Service contracts for the Share module.
 * This ensures strict inputs/outputs that can easily be mapped to HTTP later.
 */
export interface IShareService {
  generateSharePayload(input: GenerateSharePayloadInput): Promise<GenerateSharePayloadResponse>;
  generateQR(input: GenerateQRInput): Promise<GenerateQRResponse>;

  shareReceipt(input: ShareReceiptInput): Promise<GenerateSharePayloadResponse>;
  shareCatalogItem(input: ShareCatalogItemInput): Promise<GenerateSharePayloadResponse>;
  shareCatalogCategory(input: ShareCatalogCategoryInput): Promise<GenerateSharePayloadResponse>;
  sharePartyCard(input: SharePartyCardInput): Promise<GenerateSharePayloadResponse>;
  shareBusinessProfile(input: ShareBusinessProfileInput): Promise<GenerateSharePayloadResponse>;

  getPublicShareView(type: string, id: string): Promise<PublicShareViewResponse>;
}
