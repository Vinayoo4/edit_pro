import React from 'react';
import { ShareActionSheet } from './ShareActionSheet';
import { SharePayload } from '../types';

interface ReceiptShareCardProps {
  payload: SharePayload;
}

export const ReceiptShareCard: React.FC<ReceiptShareCardProps> = ({ payload }) => {
  const meta = payload.meta || {};

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-neutral-50 rounded-t-xl p-6 border-x border-t border-neutral-200 border-dashed border-b-0 relative">
        {/* Receipt edge zig-zag decoration if needed, simplified with border-dashed for now */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-1">{payload.title}</h2>
          {meta.total !== undefined && (
            <p className="text-2xl font-bold text-neutral-900">${Number(meta.total).toFixed(2)}</p>
          )}
        </div>

        <div className="space-y-2 text-sm text-neutral-600 font-mono bg-white p-4 rounded-lg border border-neutral-100">
          {payload.text.split('\n').map((line, i) => (
            <div key={i} className={line.startsWith('-') ? "pl-4" : ""}>
              {line}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-b-xl border border-neutral-200 shadow-sm p-2 pt-4">
        <ShareActionSheet payload={payload} />
      </div>
    </div>
  );
};
