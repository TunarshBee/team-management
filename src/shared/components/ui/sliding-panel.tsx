/**
 * Sliding Side Panel component
 * Features: Slides in from right, backdrop overlay, smooth animations
 */

'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export interface ISlidingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

const SlidingPanel: React.FC<ISlidingPanelProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = 'w-96',
}) => {
  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when panel is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/50 bg-opacity-50 z-40 transition-opacity duration-300'
        onClick={onClose}
      />

      {/* Sliding Panel */}
      <div
        className={`fixed top-0 right-0 h-full ${width} bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col`}
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-bazara-gray-light flex-shrink-0'>
          <h2 className='text-xl font-semibold text-foreground'>{title}</h2>
          <Button
            variant='ghost'
            size='icon'
            onClick={onClose}
            className='text-bazara-gray-light hover:text-bazara-gray'
          >
            <X className='h-5 w-5' />
          </Button>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto p-6'>{children}</div>
      </div>
    </>
  );
};

export default SlidingPanel;
