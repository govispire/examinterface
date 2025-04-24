/*
  # Exam Management System Schema

  1. New Tables
    - `exams`
      - Basic exam information and settings
    - `exam_sections`
      - Section configuration for each exam
    - `questions`
      - Question bank with various types
    - `section_questions`
      - Maps questions to sections
    - `question_attachments`
      - Handles images and other attachments

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Create exam status enum
CREATE TYPE exam_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE question_type AS ENUM ('mcq', 'descriptive', 'data_interpretation');

-- Exams table
CREATE TABLE IF NOT EXISTS exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  duration integer NOT NULL, -- in minutes
  status exam_status DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  is_randomized boolean DEFAULT false,
  passing_percentage integer DEFAULT 35,
  instructions text
);

-- Exam sections table
CREATE TABLE IF NOT EXISTS exam_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid REFERENCES exams(id) ON DELETE CASCADE,
  name text NOT NULL,
  instructions text,
  duration integer, -- section-specific duration in minutes (optional)
  question_count integer NOT NULL,
  marks_per_question integer NOT NULL DEFAULT 1,
  sequence integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  type question_type NOT NULL DEFAULT 'mcq',
  options jsonb, -- for MCQ options
  correct_answer text,
  explanation text,
  difficulty_level integer CHECK (difficulty_level BETWEEN 1 AND 5),
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  category text NOT NULL,
  subcategory text
);

-- Section questions mapping
CREATE TABLE IF NOT EXISTS section_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid REFERENCES exam_sections(id) ON DELETE CASCADE,
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
  sequence integer,
  marks integer NOT NULL DEFAULT 1,
  is_mandatory boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Question attachments
CREATE TABLE IF NOT EXISTS question_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
  file_path text NOT NULL,
  file_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_attachments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can perform all actions on exams"
  ON exams
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM auth.users WHERE role = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE role = 'admin'));

CREATE POLICY "Admins can perform all actions on exam sections"
  ON exam_sections
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM auth.users WHERE role = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE role = 'admin'));

CREATE POLICY "Admins can perform all actions on questions"
  ON questions
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM auth.users WHERE role = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE role = 'admin'));

-- Create indexes
CREATE INDEX idx_exam_status ON exams(status);
CREATE INDEX idx_question_category ON questions(category);
CREATE INDEX idx_section_exam ON exam_sections(exam_id);
CREATE INDEX idx_section_questions_mapping ON section_questions(section_id, question_id);

-- Add triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_exams_updated_at
    BEFORE UPDATE ON exams
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exam_sections_updated_at
    BEFORE UPDATE ON exam_sections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questions_updated_at
    BEFORE UPDATE ON questions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();