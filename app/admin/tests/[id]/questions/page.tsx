
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSupabase } from '@/lib/supabase/client';
import { toast } from '@/hooks/use-toast';

const SECTIONS = [
  'Quantitative Aptitude',
  'Reasoning',
  'English Language',
  'General Awareness',
  'Computer Knowledge'
];

export default function ManageQuestions() {
  const { supabase } = useSupabase();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentSection, setCurrentSection] = useState(SECTIONS[0]);

  const addQuestion = () => {
    setQuestions([...questions, {
      id: questions.length + 1,
      section: currentSection,
      text: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      type: 'mcq'
    }]);
  };

  const handleSave = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .insert(questions.map(q => ({
          text: q.text,
          type: q.type,
          options: q.options.map((text: string, i: number) => ({
            value: String.fromCharCode(97 + i),
            text
          })),
          correct_answer: q.correctAnswer,
          category: q.section
        })));

      if (error) throw error;
      toast({ title: "Success", description: "Questions saved successfully" });
    } catch (error) {
      console.error('Error saving questions:', error);
      toast({ 
        title: "Error", 
        description: "Failed to save questions",
        variant: "destructive"
      });
    }
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Questions</h1>
        <div className="flex gap-4">
          <Select value={currentSection} onValueChange={setCurrentSection}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              {SECTIONS.map(section => (
                <SelectItem key={section} value={section}>
                  {section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={addQuestion}>Add Question</Button>
          <Button onClick={handleSave} variant="default">Save All</Button>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <Card key={q.id} className="p-6">
            <div className="space-y-4">
              <div>
                <Label>Question {index + 1}</Label>
                <Textarea 
                  value={q.text}
                  onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                  placeholder="Enter question text"
                  className="mt-2"
                />
              </div>
              <div className="space-y-2">
                <Label>Options</Label>
                {q.options.map((option: string, optIndex: number) => (
                  <div key={optIndex} className="flex items-center gap-2">
                    <RadioGroupItem 
                      value={String.fromCharCode(97 + optIndex)}
                      checked={q.correctAnswer === String.fromCharCode(97 + optIndex)}
                      onClick={() => updateQuestion(index, 'correctAnswer', String.fromCharCode(97 + optIndex))}
                    />
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...q.options];
                        newOptions[optIndex] = e.target.value;
                        updateQuestion(index, 'options', newOptions);
                      }}
                      placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
