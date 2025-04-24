'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlidingPanelProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  width?: string;
  position?: 'left' | 'right';
  className?: string;
  zIndex?: number;
  showOverlay?: boolean;
  showToggle?: boolean;
  togglePosition?: 'left' | 'right';
}

export function SlidingPanel({
  children,
  isOpen,
  onOpenChange,
  width = '320px',
  position = 'right',
  className,
  zIndex = 50,
  showOverlay = true,
  showToggle = true,
  togglePosition = 'left',
}: SlidingPanelProps) {
  const panelStyles = {
    width,
    [position]: isOpen ? '0' : `-${width}`,
    zIndex,
  };

  const toggleButtonPosition = {
    [togglePosition === 'left' ? 'left' : 'right']: togglePosition === 'left' ? '-24px' : '-24px',
    transform: 'translateY(-50%)',
  };

  return (
    <>
      {showOverlay && isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
          style={{ zIndex: zIndex - 1 }}
          onClick={() => onOpenChange(false)}
        />
      )}
      <div
        className={cn(
          "fixed bg-white border shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
          position === 'left' ? 'left-0' : 'right-0',
          className
        )}
        style={panelStyles}
      >
        {children}
        
        {showToggle && (
          <button
            onClick={() => onOpenChange(!isOpen)}
            className="absolute top-1/2 bg-primary text-white w-6 h-12 flex items-center justify-center rounded-md"
            style={toggleButtonPosition}
          >
            {position === 'right' ? 
              (isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />) : 
              (isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />)
            }
          </button>
        )}
      </div>
    </>
  );
}