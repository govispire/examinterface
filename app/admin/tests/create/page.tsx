
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useSupabase } from '@/lib/supabase/client';
import { toast } from '@/hooks/use-toast';

export default function CreateTest() {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [uploading, setUploading] = useState(false);
  
  const form = useForm({
    defaultValues: {
      title: '',
      duration: 180,
      totalQuestions: 100,
      instructions: '',
      questionFile: null
    }
  });

  const SECTIONS = [
    'Quantitative Aptitude',
    'Reasoning',
    'English Language',
    'General Awareness',
    'Computer Knowledge'
  ];

  const onSubmit = async (data: any) => {
    try {
      setUploading(true);
      
      // Create the test structure with sections
      const formattedTest = {
        ...data,
        sections: SECTIONS.map(section => ({
          name: section,
          questions: []
        }))
      };
      
      // Create test
      const { data: test, error: testError } = await supabase
        .from('tests')
        .insert({
          title: data.title,
          duration: data.duration,
          total_questions: data.totalQuestions,
          instructions: data.instructions,
          status: 'draft'
        })
        .select()
        .single();

      if (testError) throw testError;

      if (data.questionFile) {
        const fileReader = new FileReader();
        fileReader.onload = async (e) => {
          const questions = JSON.parse(e.target?.result as string);
          
          // Insert questions
          const { error: questionsError } = await supabase
            .from('questions')
            .insert(questions.map((q: any) => ({
              ...q,
              test_id: test.id
            })));

          if (questionsError) throw questionsError;
        };
        fileReader.readAsText(data.questionFile);
      }

      toast({
        title: "Success",
        description: "Test created successfully"
      });
      router.push('/admin/tests');
    } catch (error) {
      console.error('Error creating test:', error);
      toast({
        title: "Error",
        description: "Failed to create test",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Create New Test</h1>
      <Card className="max-w-2xl mx-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter test title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalQuestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Questions</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Instructions</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="questionFile"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Upload Questions (JSON)</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept=".json"
                      onChange={(e) => onChange(e.target.files?.[0])}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a JSON file containing the questions
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={uploading}>
                {uploading ? 'Creating...' : 'Create Test'}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
