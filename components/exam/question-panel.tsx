'use client';

import { useExamStore } from '@/lib/stores/exam-store';
import { RadioGroup } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

function CustomRadio({ value, checked, onChange }: { 
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div 
      role="radio"
      aria-checked={checked}
      tabIndex={0}
      className={cn(
        "relative w-[13px] h-[13px] rounded-full border border-gray-300",
        "transition-all duration-200 ease-in-out cursor-pointer",
        "hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
        "flex items-center justify-center"
      )}
      onClick={() => onChange(value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onChange(value);
        }
      }}
    >
      {checked && (
        <div 
          className="absolute w-[7px] h-[7px] rounded-full bg-[#0000FF]"
          style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}
        />
      )}
      <input
        type="radio"
        className="sr-only"
        checked={checked}
        onChange={() => onChange(value)}
        value={value}
      />
    </div>
  );
}

export function QuestionPanel() {
  const { currentQuestion, setAnswer } = useExamStore();

  if (!currentQuestion) return null;

  const handleOptionChange = (value: string) => {
    setAnswer(currentQuestion.id, value);
  };

  return (
    <div className="space-y-6">
      {/* Question Number and Text */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Question No. {currentQuestion.id}</h2>
        <p className="text-[16px] leading-relaxed text-gray-700">
          {currentQuestion.text}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <div 
            key={index} 
            className={cn(
              "flex items-start space-x-3 p-3 rounded",
              "hover:bg-gray-50 cursor-pointer transition-colors duration-200",
              "focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2"
            )}
            onClick={() => handleOptionChange(option.value)}
          >
            <CustomRadio
              value={option.value}
              checked={option.value === currentQuestion.selectedAnswer}
              onChange={handleOptionChange}
            />
            <Label 
              htmlFor={`option-${index}`}
              className="text-[14px] leading-relaxed cursor-pointer flex-1 select-none"
            >
              {option.text}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}