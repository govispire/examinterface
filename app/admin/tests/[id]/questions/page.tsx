
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function ManageQuestions() {
  const [questions, setQuestions] = useState<any[]>([]);

  const addQuestion = () => {
    setQuestions([...questions, {
      id: questions.length + 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    }]);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Questions</h1>
        <Button onClick={addQuestion}>Add Question</Button>
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <Card key={q.id} className="p-6">
            <div className="space-y-4">
              <div>
                <Label>Question {index + 1}</Label>
                <Textarea 
                  placeholder="Enter question text"
                  className="mt-2"
                />
              </div>

              <div className="space-y-2">
                <Label>Options</Label>
                <RadioGroup>
                  {[0, 1, 2, 3].map((optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem value={optionIndex.toString()} />
                      <Input placeholder={`Option ${optionIndex + 1}`} />
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
