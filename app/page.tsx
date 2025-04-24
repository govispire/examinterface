
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Exam Portal</h1>
            <div className="space-x-4">
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">Welcome to Exam Portal</h2>
            <p className="text-xl text-gray-600">Your one-stop platform for online examinations</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>For Students</CardTitle>
                <CardDescription>Take exams and track your progress</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/auth/signup?role=student">
                  <Button className="w-full">Register as Student</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>For Administrators</CardTitle>
                <CardDescription>Create and manage exams</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/auth/signup?role=admin">
                  <Button className="w-full" variant="outline">Register as Admin</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
