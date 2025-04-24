'use client';

import ExamInterface from '@/components/exam/exam-interface';
import { SummaryPage } from '@/components/exam/summary-page';
import { SolutionsPage } from '@/components/exam/solutions-page';
import { useExamStore } from '@/lib/stores/exam-store';

export default function Home() {
  const { showSummary, showSolutions } = useExamStore();
  
  if (showSolutions) {
    return <SolutionsPage />;
  }
  
  if (showSummary) {
    return <SummaryPage />;
  }
  
  return <ExamInterface />;
}