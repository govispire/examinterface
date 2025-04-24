'use client';

import { useExamStore } from '@/lib/stores/exam-store';
import { Button } from '@/components/ui/button';
import { NavigationPanel } from './navigation-panel';
import { Info, ChevronRight, Clock, ChevronLeft, ChevronRightIcon } from 'lucide-react';
import { UserHeader } from './user-header';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { SlidingPanel } from '@/components/ui/sliding-panel';
import { Separator } from '@/components/ui/separator';

export function SolutionsPage() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const { 
    currentSection, 
    currentSectionIndex, 
    sections, 
    currentQuestion, 
    returnToSummary,
    setCurrentQuestion,
    currentQuestionId
  } = useExamStore();

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestionId]);

  if (!currentSection || !currentQuestion) return null;

  const isFirstQuestion = currentQuestionId === 1;
  const isLastQuestion = currentQuestionId === sections[currentSectionIndex].questions.length;

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestion(currentQuestionId - 1);
    }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestion(currentQuestionId + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      {/* Main Header */}
      <header className="h-[60px] bg-white border-b fixed top-0 left-0 right-0 z-30">
        <div className="h-full max-w-[1400px] mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/ibps-logo.png" alt="IBPS" className="h-8" />
            <h1 className="text-lg font-medium">Solutions Review</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[#4A90E2] flex items-center gap-2"
              onClick={returnToSummary}
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Summary</span>
            </Button>
            <UserHeader />
          </div>
        </div>
      </header>

      {/* Section Header */}
      <div className="h-[40px] bg-[#4A90E2] text-white fixed top-[60px] left-0 right-0 z-20">
        <div className="h-full max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="h-full text-white hover:bg-blue-600 px-4 rounded-none flex items-center gap-2"
              >
                <span className="font-medium">{currentSection.name}</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
              <div className="text-sm text-white/80">
                Question {currentQuestion.id} of {sections[currentSectionIndex].questions.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 pt-[100px] pb-[80px]">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex gap-6 relative">
            {/* Question Area */}
            <div className={cn(
              "transition-all duration-300 ease-in-out",
              isNavOpen ? "lg:mr-[320px]" : "mr-0",
              "w-full"
            )}>
              <div className="bg-white rounded-lg shadow-sm">
                {/* Question Header */}
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-lg font-medium">Question {currentQuestion.id}</h2>
                        <span className="text-sm text-muted-foreground px-3 py-1 bg-gray-100 rounded-full">
                          {currentSection.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Question Content */}
                <div className="p-6 space-y-6">
                  <div className="text-gray-800 text-lg leading-relaxed">
                    {currentQuestion.text}
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => {
                      const isSelected = option.value === currentQuestion.selectedAnswer;
                      const isCorrect = option.value === currentQuestion.correctAnswer;
                      
                      return (
                        <div
                          key={option.value}
                          className={cn(
                            "p-4 rounded-lg border-2 transition-all duration-300",
                            isCorrect && "border-[#4CAF50] bg-green-50",
                            isSelected && !isCorrect && "border-[#F44336] bg-red-50",
                            !isSelected && !isCorrect && "border-gray-200"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <p className={cn(
                                "text-base",
                                isCorrect && "text-[#4CAF50] font-medium",
                                isSelected && !isCorrect && "text-[#F44336]",
                                !isSelected && !isCorrect && "text-gray-700"
                              )}>
                                {option.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Performance Comparison */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-3">Performance Analysis</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">Your Response</div>
                        <div className={cn(
                          "flex items-center gap-2",
                          currentQuestion.selectedAnswer === currentQuestion.correctAnswer
                            ? "text-green-600"
                            : "text-red-600"
                        )}>
                          <span className="font-medium">
                            {currentQuestion.selectedAnswer === currentQuestion.correctAnswer ? "Correct" : "Wrong"}
                          </span>
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">45s</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">Top Performer</div>
                        <div className="flex items-center gap-2 text-green-600">
                          <span className="font-medium">Correct</span>
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">29s</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Explanation */}
                  {currentQuestion.explanation && (
                    <div className="mt-6 space-y-4">
                      <Separator />
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <h4 className="font-medium text-blue-800 mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Detailed Solution
                        </h4>
                        <div className="space-y-4">
                          <p className="text-blue-700 whitespace-pre-line text-base leading-relaxed">
                            {currentQuestion.explanation}
                          </p>
                          {currentQuestion.type === 'data-interpretation' && currentQuestion.chart && (
                            <img 
                              src={currentQuestion.chart} 
                              alt="Question Chart" 
                              className="max-w-full h-auto rounded-lg border border-blue-200"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Panel */}
            <SlidingPanel
              isOpen={isNavOpen}
              onOpenChange={setIsNavOpen}
              width="320px"
              zIndex={40}
              className="top-[100px] bottom-[80px]"
              showOverlay={false}
              showToggle={true}
              togglePosition="left"
            >
              <NavigationPanel />
            </SlidingPanel>
          </div>
        </div>
      </div>

      {/* Fixed Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className={cn(
            "py-4",
            isNavOpen ? "lg:mr-[320px]" : "mr-0",
            "transition-all duration-300 ease-in-out"
          )}>
            <div className="flex justify-center items-center gap-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={isFirstQuestion}
                className={cn(
                  "min-w-[140px] h-11 text-[15px] font-medium",
                  "transition-all duration-300 ease-in-out",
                  "border-gray-300 hover:bg-gray-50",
                  "flex items-center justify-center gap-2",
                  isFirstQuestion && "opacity-50 cursor-not-allowed"
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-semibold text-primary">
                    {currentQuestionId}
                  </span>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-500">
                    {sections[currentSectionIndex].questions.length}
                  </span>
                </div>
                <div className="h-8 w-[1px] bg-gray-200" />
                <div className="text-sm text-gray-500 font-medium">
                  {currentSection.name}
                </div>
              </div>

              <Button
                variant="outline"
                onClick={handleNext}
                disabled={isLastQuestion}
                className={cn(
                  "min-w-[140px] h-11 text-[15px] font-medium",
                  "transition-all duration-300 ease-in-out",
                  "border-gray-300 hover:bg-gray-50",
                  "flex items-center justify-center gap-2",
                  isLastQuestion && "opacity-50 cursor-not-allowed"
                )}
              >
                Next
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
                style={{ 
                  width: `${(currentQuestionId / sections[currentSectionIndex].questions.length) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}