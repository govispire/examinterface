'use client';

import { useState } from 'react';
import { Timer } from './timer';
import { QuestionPanel } from './question-panel';
import { NavigationPanel } from './navigation-panel';
import { ActionButtons } from './action-buttons';
import { UserHeader } from './user-header';
import { useExamStore } from '@/lib/stores/exam-store';
import { Info, ChevronRight, ChevronLeft, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export default function ExamInterface() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const { 
    currentSection, 
    currentSectionIndex, 
    sections, 
    setCurrentSectionIndex,
    moveToNextSection,
    currentQuestionId
  } = useExamStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  if (!currentSection) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Header */}
      <header className="h-[50px] bg-[#333] text-white border-b fixed top-0 left-0 right-0 z-30">
        <div className="h-full px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/ibps-logo.png" alt="IBPS" className="h-8" />
            <h1 className="text-lg font-medium">SBI PO Mains 2024-25 Mock - 01</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:text-blue-200">
              <Info className="w-4 h-4 mr-2" />
              View Instructions
            </Button>
            <UserHeader />
          </div>
        </div>
      </header>

      {/* Sections Bar */}
      <div className="h-[40px] bg-[#f0f0f0] border-b fixed top-[50px] left-0 right-0 z-20 overflow-x-auto">
        <div className="h-full flex items-center px-2">
          {sections.map((section, index) => (
            <Button
              key={section.id}
              variant={currentSectionIndex === index ? "default" : "ghost"}
              className={cn(
                "h-[34px] rounded px-4 font-medium text-sm transition-colors mx-1",
                currentSectionIndex === index 
                  ? "bg-[#4a90e2] text-white" 
                  : "text-gray-700 hover:bg-gray-200"
              )}
              onClick={() => setCurrentSectionIndex(index)}
            >
              {section.name}
              {currentSectionIndex === index && (
                <ChevronRight className="w-3 h-3 ml-1" />
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Question Info Bar */}
      <div className="h-[35px] bg-[#f8f9fa] border-b fixed top-[90px] left-0 right-0 z-20">
        <div className="h-full px-4 flex justify-between items-center">
          <div className="text-sm flex items-center gap-4">
            <span>Question Type: Multiple Choice Question</span>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-600">+1.5</span>
              <span className="text-red-500">-0.375</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Text Size:</span>
              <Select defaultValue="medium">
                <SelectTrigger className="h-7 w-24">
                  <SelectValue placeholder="Medium" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">View in:</span>
              <Select defaultValue="english">
                <SelectTrigger className="h-7 w-24">
                  <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="h-[35px] bg-[#4a90e2] text-white fixed top-[125px] left-0 right-0 z-20">
        <div className="h-full px-4 flex justify-end items-center">
          <Timer initialTime={3600} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-[160px] pb-[80px]">
        <div className="relative h-full">
          {/* Question Area */}
          <div className={cn(
            "transition-all duration-300",
            isNavOpen ? "mr-[300px]" : "mr-0"
          )}>
            <div className="p-4">
              <QuestionPanel />
            </div>
          </div>

          {/* Navigation Panel */}
          <div className={cn(
            "fixed top-[160px] bottom-[80px] w-[300px] bg-white border-l transition-all duration-300",
            isNavOpen ? "right-0" : "-right-[300px]"
          )}>
            <NavigationPanel />
            
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-[#4a90e2] text-white w-6 h-12 flex items-center justify-center rounded-l-md"
            >
              {isNavOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Buttons */}
      <div className="fixed right-[320px] bottom-[100px] flex flex-col gap-2 z-20">
        <Button
          variant="outline"
          size="icon"
          className="bg-white shadow-md"
          onClick={scrollToTop}
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white shadow-md"
          onClick={scrollToBottom}
        >
          <ArrowDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-20">
        <div className={cn(
          "p-4",
          isNavOpen ? "mr-[300px]" : "mr-0",
          "transition-all duration-300"
        )}>
          <ActionButtons showSkipSection onSkipSection={moveToNextSection} />
        </div>
      </div>
    </div>
  );
}