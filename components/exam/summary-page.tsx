'use client';

import { useExamStore } from '@/lib/stores/exam-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Printer, TrendingDown, TrendingUp, Clock, Target } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function SummaryPage() {
  const { sections, examStartTime, returnToTest, viewSolutions } = useExamStore();
  
  // Calculate total time taken
  const timeTaken = examStartTime ? Math.floor((Date.now() - examStartTime) / 1000) : 0;
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Calculate section-wise and total scores
  const calculateSectionScore = (section: any) => {
    return section.questions.reduce((score: number, question: any) => {
      if (question.selectedAnswer === question.correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  const totalScore = sections.reduce((total, section) => {
    return total + calculateSectionScore(section);
  }, 0);

  const totalQuestions = sections.reduce((total, section) => {
    return total + section.questions.length;
  }, 0);

  // Calculate performance metrics
  const totalAttempted = sections.reduce((total, section) => {
    return total + section.questions.filter(q => q.selectedAnswer).length;
  }, 0);

  const accuracy = Math.round((totalScore / totalAttempted) * 100) || 0;
  const attemptRate = Math.round((totalAttempted / totalQuestions) * 100);
  const avgTimePerQuestion = Math.round(timeTaken / totalAttempted);

  // Identify strengths and weaknesses
  const sectionPerformance = sections.map(section => {
    const attempted = section.questions.filter(q => q.selectedAnswer).length;
    const correct = calculateSectionScore(section);
    const accuracy = (correct / attempted) * 100 || 0;
    return {
      name: section.name,
      accuracy,
      attempted,
      total: section.questions.length,
      timeSpent: section.timeSpent || 0,
      correct
    };
  });

  const sortedByAccuracy = [...sectionPerformance].sort((a, b) => b.accuracy - a.accuracy);
  const strongestSection = sortedByAccuracy[0];
  const weakestSection = sortedByAccuracy[sortedByAccuracy.length - 1];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <div className="max-w-[1000px] mx-auto px-4 space-y-6">
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={returnToTest}
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Test
          </Button>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={viewSolutions}
            >
              <Target className="w-4 h-4" />
              View Solutions
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handlePrint}
            >
              <Printer className="w-4 h-4" />
              Print Summary
            </Button>
          </div>
        </div>

        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Performance Analysis</h1>
          
          <div className="grid gap-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600">Overall Score</div>
                <div className="text-2xl font-bold">{totalScore}/{totalQuestions}</div>
                <div className="text-sm text-blue-600 mt-1">
                  {Math.round((totalScore / totalQuestions) * 100)}% Overall
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-green-600">Accuracy Rate</div>
                <div className="text-2xl font-bold">{accuracy}%</div>
                <div className="text-sm text-green-600 mt-1">
                  {totalScore} correct of {totalAttempted} attempted
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-purple-600">Attempt Rate</div>
                <div className="text-2xl font-bold">{attemptRate}%</div>
                <div className="text-sm text-purple-600 mt-1">
                  {totalAttempted} of {totalQuestions} questions
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-sm text-orange-600">Time Management</div>
                <div className="text-2xl font-bold">{formatTime(timeTaken)}</div>
                <div className="text-sm text-orange-600 mt-1">
                  ~{avgTimePerQuestion}s per question
                </div>
              </div>
            </div>

            {/* Performance Insights */}
            <Card className="p-4 border-2 border-blue-100">
              <h2 className="text-lg font-semibold mb-3">Key Insights</h2>
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Strongest Area: {strongestSection.name}</h3>
                    <p className="text-sm text-gray-600">
                      {strongestSection.accuracy.toFixed(1)}% accuracy with {strongestSection.correct} correct answers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingDown className="w-5 h-5 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Area for Improvement: {weakestSection.name}</h3>
                    <p className="text-sm text-gray-600">
                      {weakestSection.accuracy.toFixed(1)}% accuracy with {weakestSection.correct} correct answers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Time Management</h3>
                    <p className="text-sm text-gray-600">
                      Average {avgTimePerQuestion} seconds per question
                      {avgTimePerQuestion > 120 ? ' - Consider improving speed' : ' - Good pace'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-purple-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Recommended Focus Areas</h3>
                    <ul className="text-sm text-gray-600 list-disc ml-4">
                      {weakestSection.accuracy < 50 && (
                        <li>Strengthen core concepts in {weakestSection.name}</li>
                      )}
                      {attemptRate < 80 && (
                        <li>Work on attempting more questions within time limit</li>
                      )}
                      {accuracy < 70 && (
                        <li>Focus on improving accuracy through practice tests</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Section-wise Analysis */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Section-wise Performance</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Section</TableHead>
                    <TableHead>Attempted</TableHead>
                    <TableHead>Correct</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Time Spent</TableHead>
                    <TableHead>Avg Time/Question</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sectionPerformance.map((section) => (
                    <TableRow key={section.name}>
                      <TableCell className="font-medium">{section.name}</TableCell>
                      <TableCell>{section.attempted}/{section.total}</TableCell>
                      <TableCell>{section.correct}</TableCell>
                      <TableCell>{section.accuracy.toFixed(1)}%</TableCell>
                      <TableCell>{formatTime(section.timeSpent)}</TableCell>
                      <TableCell>
                        {section.attempted ? Math.round(section.timeSpent / section.attempted) : 0}s
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Action Plan */}
            <Card className="p-4 border-2 border-green-100">
              <h2 className="text-lg font-semibold mb-3">Improvement Strategy</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Short-term Goals</h3>
                  <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                    <li>Increase accuracy in {weakestSection.name} to at least {Math.min(weakestSection.accuracy + 20, 100).toFixed(0)}%</li>
                    <li>Reduce average time per question to {Math.max(avgTimePerQuestion - 30, 60)} seconds</li>
                    <li>Improve attempt rate to minimum 85% of total questions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Recommended Practice Plan</h3>
                  <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                    <li>Focus 60% of study time on {weakestSection.name}</li>
                    <li>Practice timed mock tests to improve speed</li>
                    <li>Review all incorrect answers to understand mistakes</li>
                    <li>Create flashcards for frequently tested concepts</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Detailed Question Review */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Question-wise Analysis</h2>
              {sections.map((section) => (
                <div key={section.id} className="mb-6">
                  <h3 className="text-md font-medium mb-3">{section.name}</h3>
                  <div className="space-y-4">
                    {section.questions.map((question, index) => (
                      <div key={question.id} className="bg-white p-4 rounded-lg border">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">Question {index + 1}</div>
                          <div className={`px-2 py-1 rounded text-sm ${
                            question.selectedAnswer === question.correctAnswer
                              ? 'bg-green-100 text-green-700'
                              : question.selectedAnswer
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {question.selectedAnswer === question.correctAnswer
                              ? 'Correct'
                              : question.selectedAnswer
                              ? 'Incorrect'
                              : 'Not Attempted'}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{question.text}</p>
                        {question.selectedAnswer && (
                          <div className="text-sm">
                            <span className="text-gray-500">Your Answer: </span>
                            <span className={question.selectedAnswer === question.correctAnswer
                              ? 'text-green-600'
                              : 'text-red-600'
                            }>
                              {question.options.find(opt => opt.value === question.selectedAnswer)?.text}
                            </span>
                          </div>
                        )}
                        {question.correctAnswer && (
                          <div className="text-sm">
                            <span className="text-gray-500">Correct Answer: </span>
                            <span className="text-green-600">
                              {question.options.find(opt => opt.value === question.correctAnswer)?.text}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}