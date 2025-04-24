
'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, PlusCircle, LayoutDashboard } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-gray-600">Manage your exams and tests from here</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex flex-col items-center text-center">
            <LayoutDashboard className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Quick Stats</h2>
            <p className="text-muted-foreground mb-4">View your dashboard statistics</p>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-gray-600">Active Exams</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-gray-600">Active Tests</div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex flex-col items-center text-center">
            <FileText className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Manage Exams</h2>
            <p className="text-muted-foreground mb-4">Create and manage exam papers</p>
            <Link href="/admin/exams">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                View Exams
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col items-center text-center">
            <FileText className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Manage Tests</h2>
            <p className="text-muted-foreground mb-4">Create and manage practice tests</p>
            <Link href="/admin/tests">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                View Tests
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
