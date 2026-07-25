import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { shareService } from './api/shareService';
import { PublicShareViewModel } from './types';
import { Hexagon, ArrowLeft } from 'lucide-react';

export const SharePublicPage: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [data, setData] = useState<PublicShareViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      if (!type || !id) {
        setError('Invalid share link.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Map the URL param to our internal ShareTargetType
        const mappedType = mapUrlToShareType(type);
        const res = await shareService.getPublicShareView(mappedType, id);

        if (res.error) {
          setError(res.error);
        } else if (res.view) {
          setData(res.view);
        } else {
          setError('Shared content not found.');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while loading shared content.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [type, id]);

  const mapUrlToShareType = (urlType: string): string => {
    switch(urlType) {
      case 'receipt': return 'sale_receipt';
      case 'item': return 'catalog_item';
      case 'category': return 'catalog_category';
      case 'party': return 'party_card';
      case 'business': return 'business_profile';
      default: return urlType;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-neutral-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-neutral-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 text-center max-w-sm w-full">
          <p className="text-neutral-500 mb-6">{error || 'Content not found'}</p>
          <Link to="/" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" /> Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Minimal Public Header */}
      <header className="bg-white border-b border-neutral-200 py-3 px-4">
        <div className="max-w-md mx-auto flex items-center justify-center gap-2">
           <Hexagon className="w-5 h-5 text-blue-600" />
           <span className="font-semibold text-neutral-900 text-sm tracking-wide">SALTEDHASH OS</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-4 sm:p-6 w-full max-w-md mx-auto">
        <div className="w-full bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="p-6 border-b border-neutral-100 text-center">
            <h1 className="text-xl font-bold text-neutral-900 mb-1">{data.title}</h1>
            {data.subtitle && <p className="text-sm text-neutral-500">{data.subtitle}</p>}
          </div>

          <div className="p-6 bg-neutral-50">
            {data.lines && data.lines.length > 0 ? (
              <div className="space-y-3">
                {data.lines.map((line, idx) => (
                  <p key={idx} className="text-sm text-neutral-700">{line}</p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-400 text-center italic">No details available</p>
            )}
          </div>

          {data.actionUrl && (
            <div className="p-4 border-t border-neutral-100">
              <a
                href={data.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg text-sm font-medium transition-colors"
              >
                View Details
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
