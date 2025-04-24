'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface SlidingPanelToggleProps {
  isOpen: boolean;
  position?: 'left' | 'right';
  onClick: () => void;
}

export function SlidingPanelToggle({
  isOpen,
  position = 'right',
  onClick
}: SlidingPanelToggleProps) {
  return (
    <div 
      className={cn(
        "absolute top-1/2 -translate-y-1/2",
        position === 'left' ? "-left-4" : "-right-4",
        "z-50"
      )}
    >
      <Button
        variant="secondary"
        size="icon"
        onClick={onClick}
        className={cn(
          "h-8 w-8 rounded-full shadow-md border",
          "hover:bg-secondary/80 transition-colors",
          "focus-visible:ring-2 focus-visible:ring-offset-2",
          "aria-expanded:bg-secondary/90"
        )}
        aria-label={isOpen ? "Close panel" : "Open panel"}
        aria-expanded={isOpen}
      >
        {position === 'left' ? (
          isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
        ) : (
          isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}