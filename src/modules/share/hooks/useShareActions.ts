import { useState, useCallback } from 'react';
import { SharePayload } from '../types';
import { normalizeShareText } from '../services/shareDomain';

interface UseShareActionsReturn {
  isSupported: boolean;
  isSharing: boolean;
  error: string | null;
  shareViaWebAPI: (payload: SharePayload) => Promise<boolean>;
  copyToClipboard: (payload: SharePayload) => Promise<boolean>;
  executeShare: (payload: SharePayload) => Promise<void>;
}

export function useShareActions(): UseShareActionsReturn {
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSupported = typeof navigator !== 'undefined' && 'share' in navigator;

  const shareViaWebAPI = useCallback(async (payload: SharePayload): Promise<boolean> => {
    if (!isSupported) return false;

    setIsSharing(true);
    setError(null);
    try {
      await navigator.share({
        title: payload.title,
        text: payload.text,
        url: payload.url,
      });
      return true;
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to share');
      }
      return false;
    } finally {
      setIsSharing(false);
    }
  }, [isSupported]);

  const copyToClipboard = useCallback(async (payload: SharePayload): Promise<boolean> => {
    setIsSharing(true);
    setError(null);
    try {
      const textToCopy = normalizeShareText(payload);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          return true;
        } catch (err) {
          setError('Failed to copy to clipboard');
          return false;
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to copy to clipboard');
      return false;
    } finally {
      setIsSharing(false);
    }
  }, []);

  const executeShare = useCallback(async (payload: SharePayload): Promise<void> => {
    // Attempt native share first, fallback to copy if unsupported or fails
    if (isSupported) {
      const success = await shareViaWebAPI(payload);
      if (success) return;
    }

    await copyToClipboard(payload);
  }, [isSupported, shareViaWebAPI, copyToClipboard]);

  return {
    isSupported,
    isSharing,
    error,
    shareViaWebAPI,
    copyToClipboard,
    executeShare
  };
}
