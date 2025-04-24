'use client';

import { useState } from 'react';
import { useSupabase } from '@/lib/supabase/client';

interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  sections?: any[];
}

export function useExams() {
  const [isLoading, setIsLoading] = useState(false);
  const { supabase } = useSupabase();

  const fetchExams = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('exams')
        .select(`
          *,
          sections:exam_sections(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching exams:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const createExam = async (examData: any) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('exams')
        .insert([
          {
            ...examData,
            status: 'draft',
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating exam:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    exams: [],
    isLoading,
    fetchExams,
    createExam,
  };
}