'use client';

import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface ImagePreviewProps {
  url: string;
  alt?: string;
  className?: string;
}

export function ImagePreview({ url, alt = 'Preview', className = '' }: ImagePreviewProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!url) {
      setStatus('idle');
      return;
    }

    setStatus('loading');
    const img = new Image();
    
    img.onload = () => {
      setStatus('success');
    };
    
    img.onerror = () => {
      setStatus('error');
    };
    
    img.src = url;
  }, [url]);

  if (!url) {
    return (
      <div className="mt-3 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
        <p className="text-gray-500 text-sm">Paste an image URL above to see live preview</p>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="mt-3 p-8 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center bg-blue-50">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin mr-2" />
        <p className="text-blue-700 font-medium">Loading image...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="mt-3 p-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
        <div className="flex items-center justify-center text-red-700 mb-2">
          <AlertCircle className="w-6 h-6 mr-2" />
          <p className="font-medium">Failed to load image</p>
        </div>
        <p className="text-sm text-red-600 text-center">
          The URL might be invalid or the image is not accessible
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="mt-3 border-2 border-green-300 rounded-lg bg-green-50 p-3">
        <div className="flex items-center text-green-700 mb-3">
          <CheckCircle className="w-5 h-5 mr-2" />
          <p className="font-medium text-sm">Image loaded successfully!</p>
        </div>
        <div className={`relative overflow-hidden rounded-lg ${className}`}>
          <img
            src={url}
            alt={alt}
            className="w-full h-auto max-h-64 object-contain bg-white"
          />
        </div>
      </div>
    );
  }

  return null;
}
