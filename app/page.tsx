
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ExamInterface from '@/components/exam/exam-interface';
import { SummaryPage } from '@/components/exam/summary-page';
import { SolutionsPage } from '@/components/exam/solutions-page';
import { useExamStore } from '@/lib/stores/exam-store';

export default function Home() {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const { showSummary, showSolutions } = useExamStore();

  if (selectedExam) {
    if (showSolutions) {
      return <SolutionsPage />;
    }
    
    if (showSummary) {
      return <SummaryPage />;
    }
    
    return <ExamInterface />;
  }

  const mockExams = [
    {
      id: '1',
      title: 'SBI PO Mock Test 2024',
      duration: '180 minutes',
      questions: '100 questions'
    },
    {
      id: '2',
      title: 'IBPS Clerk Mock Test 2024',
      duration: '160 minutes',
      questions: '90 questions'
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Available Exams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockExams.map((exam) => (
          <Card key={exam.id} className="p-6">
            <h2 className="text-xl font-semibold mb-3">{exam.title}</h2>
            <div className="text-gray-600 space-y-2 mb-4">
              <p>Duration: {exam.duration}</p>
              <p>Total Questions: {exam.questions}</p>
            </div>
            <Button 
              className="w-full"
              onClick={() => setSelectedExam(exam.id)}
            >
              Start Exam
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
