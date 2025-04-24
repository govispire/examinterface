'use client';

import { useExamStore } from '@/lib/stores/exam-store';
import { cn } from '@/lib/utils';

export function NavigationPanel() {
  const { 
    questions, 
    currentQuestionId, 
    setCurrentQuestion,
    currentSection
  } = useExamStore();

  if (!currentSection) return null;

  const getQuestionStatus = (id: number) => {
    const question = questions.find(q => q.id === id);
    if (!question) return 'not-visited';
    if (!question.visited) return 'not-visited';
    if (question.selectedAnswer && question.markedForReview) return 'answered-marked';
    if (question.selectedAnswer) return 'answered';
    if (question.markedForReview) return 'marked';
    return 'not-answered';
  };

  const getStatusStyles = (status: string) => {
    const baseStyles = 'w-8 h-8 text-xs font-medium transition-all flex items-center justify-center';
    
    switch (status) {
      case 'answered':
        return cn(baseStyles, 'bg-[#5cb85c] text-white rounded');
      case 'marked':
        return cn(baseStyles, 'bg-[#9b59b6] text-white rounded-full');
      case 'answered-marked':
        return cn(baseStyles, 'bg-[#3498db] text-white border-2 border-[#2980b9] rounded');
      case 'not-answered':
        return cn(baseStyles, 'bg-[#d9534f] text-white rounded');
      default:
        return cn(baseStyles, 'bg-gray-100 text-gray-700 border border-gray-300 rounded');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Legend */}
      <div className="p-3 bg-[#f8f9fa] border-b">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
            <span>Not Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#d9534f] rounded"></div>
            <span>Not Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#5cb85c] rounded"></div>
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#9b59b6] rounded-full"></div>
            <span>Marked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#3498db] border-2 border-[#2980b9] rounded"></div>
            <span>Answered & Marked</span>
          </div>
        </div>
      </div>

      {/* Section Name */}
      <div className="bg-[#4a90e2] text-white p-2 text-sm font-medium">
        {currentSection.name}
      </div>

      {/* Question Grid */}
      <div className="p-3 grid grid-cols-5 gap-2 overflow-y-auto">
        {questions.map((question) => {
          const status = getQuestionStatus(question.id);
          const isActive = currentQuestionId === question.id;
          
          return (
            <button
              key={question.id}
              className={cn(
                getStatusStyles(status),
                isActive && 'ring-2 ring-offset-1 ring-[#4a90e2]'
              )}
              onClick={() => setCurrentQuestion(question.id)}
            >
              {question.id}
            </button>
          );
        })}
      </div>
    </div>
  );
}