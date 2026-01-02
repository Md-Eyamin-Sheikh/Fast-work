'use client';

import { useState, useEffect } from 'react';
import { Link2 } from 'lucide-react';

interface AutoSlugInputProps {
  title: string;
  value: string;
  onChange: (slug: string) => void;
  label?: string;
}

export function AutoSlugInput({ title, value, onChange, label = 'URL Slug' }: AutoSlugInputProps) {
  const [isManuallyEdited, setIsManuallyEdited] = useState(false);

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  };

  useEffect(() => {
    if (!isManuallyEdited && title) {
      onChange(generateSlug(title));
    }
  }, [title, isManuallyEdited, onChange]);

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManuallyEdited(true);
    onChange(generateSlug(e.target.value));
  };

  const handleRegenerateSlug = () => {
    setIsManuallyEdited(false);
    onChange(generateSlug(title));
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Link2 className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={value}
          onChange={handleManualChange}
          className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-mono text-sm"
          placeholder="auto-generated-slug"
        />
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-500">
          {isManuallyEdited ? '✏️ Manually edited' : '🤖 Auto-generated from title'}
        </p>
        {isManuallyEdited && title && (
          <button
            type="button"
            onClick={handleRegenerateSlug}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Reset to auto-generate
          </button>
        )}
      </div>
    </div>
  );
}
