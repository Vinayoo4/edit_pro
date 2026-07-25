import { ShareSettings } from '../types';

/**
 * ShareRepository manages local configuration for sharing preferences.
 * For this local-first module, we'll store preferences in localStorage
 * to remain lightweight and sync-free where complex IndexedDB isn't necessary.
 */
class ShareRepository {
  private STORAGE_KEY = 'saltedhash_share_settings';

  public getShareSettings(): ShareSettings {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as ShareSettings;
      }
    } catch (e) {
      console.warn('Failed to parse share settings from localStorage', e);
    }
    return {};
  }

  public updateShareSettings(settings: Partial<ShareSettings>): void {
    const current = this.getShareSettings();
    const updated = { ...current, ...settings };
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save share settings to localStorage', e);
    }
  }

  public getBusinessShareProfile(): Partial<ShareSettings> {
    const settings = this.getShareSettings();
    return {
      businessName: settings.businessName,
      businessPhone: settings.businessPhone,
      businessAddress: settings.businessAddress,
      businessTagline: settings.businessTagline,
    };
  }
}

export const shareRepository = new ShareRepository();
