import { IShareService } from './contracts';
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
import {
  buildGenericSharePayload,
  buildQRValue,
  buildReceiptSharePayload,
  buildCatalogItemSharePayload,
  buildCatalogCategorySharePayload,
  buildPartySharePayload,
  buildBusinessProfileSharePayload
} from '../services/shareDomain';
import { ShareTargetType } from '../types';

/**
 * Local implementation of the IShareService.
 * Can be used directly by the frontend, or wrapped by API handlers.
 */
class ShareService implements IShareService {
  async generateSharePayload(input: GenerateSharePayloadInput): Promise<GenerateSharePayloadResponse> {
    const payload = buildGenericSharePayload(input);
    return { payload };
  }

  async generateQR(input: GenerateQRInput): Promise<GenerateQRResponse> {
    const qrValue = buildQRValue(input.type, input.id, input.baseUrl);
    return {
      qrValue,
      humanReadableValue: qrValue // simplified for now
    };
  }

  async shareReceipt(input: ShareReceiptInput): Promise<GenerateSharePayloadResponse> {
    const payload = buildReceiptSharePayload(input);
    return { payload };
  }

  async shareCatalogItem(input: ShareCatalogItemInput): Promise<GenerateSharePayloadResponse> {
    const payload = buildCatalogItemSharePayload(input);
    return { payload };
  }

  async shareCatalogCategory(input: ShareCatalogCategoryInput): Promise<GenerateSharePayloadResponse> {
    const payload = buildCatalogCategorySharePayload(input);
    return { payload };
  }

  async sharePartyCard(input: SharePartyCardInput): Promise<GenerateSharePayloadResponse> {
    const payload = buildPartySharePayload(input);
    return { payload };
  }

  async shareBusinessProfile(input: ShareBusinessProfileInput): Promise<GenerateSharePayloadResponse> {
    const payload = buildBusinessProfileSharePayload(input);
    return { payload };
  }

  async getPublicShareView(type: string, id: string): Promise<PublicShareViewResponse> {
    // In a real environment, this would fetch data from respective modules/databases.
    // Here we provide a minimal mock behavior to support the required frontend.

    if (!type || !id) {
       return { view: null, error: 'Invalid type or id' };
    }

    const t = type as ShareTargetType;

    // Simulate returning a minimal public view
    return {
      view: {
        id,
        type: t,
        title: `Public View for ${t}`,
        subtitle: `ID: ${id}`,
        lines: [
          'This is a read-only public summary.',
          'Data is securely shared.',
        ],
        createdAt: new Date().toISOString()
      }
    };
  }
}

export const shareService = new ShareService();
