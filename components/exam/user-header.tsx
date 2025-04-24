'use client';

import { User } from 'lucide-react';

export function UserHeader() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
        <User className="w-5 h-5" />
      </div>
      <span className="font-medium">Mohammed</span>
    </div>
  );
}