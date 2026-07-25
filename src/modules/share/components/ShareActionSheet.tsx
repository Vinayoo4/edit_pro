import React, { useState } from 'react';
import { Share2, Copy, Check, QrCode } from 'lucide-react';
import { SharePayload } from '../types';
import { useShareActions } from '../hooks/useShareActions';
import { QRCard } from './QRCard';

interface ShareActionSheetProps {
  payload: SharePayload;
  onClose?: () => void;
}

export const ShareActionSheet: React.FC<ShareActionSheetProps> = ({ payload, onClose }) => {
  const { isSupported, executeShare, copyToClipboard } = useShareActions();
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleShare = async () => {
    await executeShare(payload);
    if (onClose) onClose();
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(payload);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (showQR) {
    return (
      <div className="w-full max-w-sm mx-auto flex flex-col items-center">
        <QRCard
          value={payload.qrValue}
          title={payload.title}
          subtitle="Scan to view"
        />
        <button
          onClick={() => setShowQR(false)}
          className="mt-4 px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
        >
          Back to Actions
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-neutral-100">
        <h3 className="font-medium text-neutral-900 truncate">{payload.title}</h3>
        <p className="text-xs text-neutral-500 mt-1 capitalize">{payload.type.replace('_', ' ')}</p>
      </div>

      <div className="p-2 flex flex-col gap-1">
        <button
          onClick={handleShare}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-neutral-50 text-left transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
              <Share2 className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-neutral-700">
              {isSupported ? 'Share via...' : 'Share'}
            </span>
          </div>
        </button>

        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-neutral-50 text-left transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neutral-100 text-neutral-600 rounded-full">
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </div>
            <span className="text-sm font-medium text-neutral-700">
              {copied ? 'Copied to clipboard' : 'Copy link & details'}
            </span>
          </div>
        </button>

        {payload.qrValue && (
          <button
            onClick={() => setShowQR(true)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-neutral-50 text-left transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neutral-100 text-neutral-600 rounded-full">
                <QrCode className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-neutral-700">Show QR Code</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
