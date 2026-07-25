import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCardProps {
  value: string;
  title?: string;
  subtitle?: string;
  size?: number;
  className?: string;
}

export const QRCard: React.FC<QRCardProps> = ({
  value,
  title,
  subtitle,
  size = 200,
  className = ''
}) => {
  if (!value) {
    return (
      <div className={`p-4 rounded-xl border border-neutral-200 bg-neutral-50 flex flex-col items-center justify-center text-center ${className}`}>
        <p className="text-sm text-neutral-500">QR code unavailable</p>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-xl border border-neutral-200 bg-white flex flex-col items-center text-center shadow-sm ${className}`}>
      {title && <h3 className="text-lg font-semibold text-neutral-900 mb-1">{title}</h3>}
      {subtitle && <p className="text-sm text-neutral-500 mb-6">{subtitle}</p>}

      <div className="bg-white p-2 rounded-lg inline-block border border-neutral-100 shadow-sm">
        <QRCodeSVG
          value={value}
          size={size}
          level="M"
          includeMargin={false}
        />
      </div>

      <div className="mt-6 w-full px-4">
        <p className="text-xs text-neutral-400 break-all select-all font-mono">{value}</p>
      </div>
    </div>
  );
};
