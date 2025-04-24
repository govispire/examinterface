
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ExamInterface from '@/components/exam/exam-interface';

export default function StudentDashboard() {
  const [showExam, setShowExam] = useState(false);
  const [tests] = useState([
    { id: 1, title: 'Mock Test 1', duration: '180 mins', questions: 100 },
    { id: 2, title: 'Practice Test', duration: '120 mins', questions: 75 }
  ]);

  if (showExam) {
    return <ExamInterface />;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Available Tests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <Card key={test.id}>
            <CardHeader>
              <CardTitle>{test.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>Duration: {test.duration}</p>
                <p>Questions: {test.questions}</p>
                <Button 
                  className="w-full mt-4" 
                  onClick={() => setShowExam(true)}
                >
                  Start Test
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
