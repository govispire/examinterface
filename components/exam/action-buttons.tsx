'use client';

import { useExamStore } from '@/lib/stores/exam-store';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  showSkipSection?: boolean;
  onSkipSection?: () => void;
}

export function ActionButtons({ showSkipSection, onSkipSection }: ActionButtonsProps) {
  const { 
    markForReview,
    clearResponse,
    saveAndNext,
    submitExam,
    currentQuestionId,
    setCurrentQuestion
  } = useExamStore();

  const isFirstQuestion = currentQuestionId === 1;

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestion(currentQuestionId - 1);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="h-9 px-4 text-sm font-medium border-gray-300"
          onClick={() => markForReview(currentQuestionId)}
        >
          Mark for Review & Next
        </Button>
        <Button
          variant="outline"
          className="h-9 px-4 text-sm font-medium border-gray-300"
          onClick={() => clearResponse(currentQuestionId)}
        >
          Clear Response
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {!isFirstQuestion && (
          <Button 
            variant="outline"
            className="h-9 px-4 text-sm font-medium border-gray-300"
            onClick={handlePrevious}
          >
            Previous
          </Button>
        )}
        <Button 
          className="h-9 px-4 text-sm font-medium bg-[#4a90e2] hover:bg-[#357abd] text-white"
          onClick={saveAndNext}
        >
          Save & Next
        </Button>
        {showSkipSection && (
          <Button 
            className="h-9 px-4 text-sm font-medium bg-[#5bc0de] hover:bg-[#46b8da] text-white"
            onClick={onSkipSection}
          >
            Skip Section
          </Button>
        )}
        <Button 
          className="h-9 px-4 text-sm font-medium bg-[#d9534f] hover:bg-[#c9302c] text-white"
          onClick={submitExam}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}