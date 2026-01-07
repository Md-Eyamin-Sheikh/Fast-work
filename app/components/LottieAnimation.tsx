'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface LottieAnimationProps {
  path: string;
  className?: string;
}

export function LottieAnimation({ path, className }: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load animation');
        return res.json();
      })
      .then(setAnimationData)
      .catch((err) => {
        console.error('Error loading Lottie animation:', err);
        setError(true);
      });
  }, [path]);

  if (error) return null;

  if (!animationData) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className={className}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}
