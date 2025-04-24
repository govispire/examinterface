import { create } from 'zustand';

interface Question {
  id: number;
  text: string;
  options: Array<{
    value: string;
    text: string;
  }>;
  selectedAnswer?: string;
  correctAnswer?: string;
  explanation?: string;
  markedForReview: boolean;
  visited: boolean;
  type: 'mcq' | 'data-interpretation';
  dataset?: {
    type: 'bar' | 'line' | 'pie';
    labels: string[];
    data: number[] | number[][];
  };
}

interface Section {
  id: string;
  name: string;
  questions: Question[];
  timeSpent?: number;
}

interface ExamStore {
  sections: Section[];
  currentSectionIndex: number;
  currentQuestionId: number;
  examStartTime: number;
  showSummary: boolean;
  showSolutions: boolean;
  setCurrentQuestion: (id: number) => void;
  setAnswer: (questionId: number, answer: string) => void;
  markForReview: (questionId: number) => void;
  clearResponse: (questionId: number) => void;
  saveAndNext: () => void;
  submitExam: () => void;
  moveToNextSection: () => void;
  returnToTest: () => void;
  viewSolutions: () => void;
  returnToSummary: () => void;
  setCurrentSectionIndex: (index: number) => void;
  currentSection: Section;
  questions: Question[];
  currentQuestion?: Question;
}

const generateQuantitativeQuestions = (): Question[] => {
  const questions: Question[] = [
    {
      id: 1,
      text: "Study the pie chart showing the percentage distribution of employees across different departments. If 40% of employees from Marketing are from MBA and the ratio of non-MBA males to females is 4:5 respectively, then approximately what percent of females are non-MBA Marketing employees?",
      options: [
        { value: 'a', text: '71.4%' },
        { value: 'b', text: '74.8%' },
        { value: 'c', text: '75.5%' },
        { value: 'd', text: '70.5%' },
        { value: 'e', text: '72.6%' },
      ],
      correctAnswer: 'a',
      explanation: "Let's solve this step by step:\n1. Marketing department has 13% of total employees\n2. 40% are MBA graduates, so 60% are non-MBA\n3. Non-MBA ratio of males to females is 4:5\n4. Total parts = 4 + 5 = 9\n5. Females = 5/9 of 60% = (5/9) × 60 = 33.33%\n6. Therefore, 71.4% of females are non-MBA employees",
      markedForReview: false,
      visited: false,
      type: 'data-interpretation',
      dataset: {
        type: 'pie',
        labels: ['HR', 'Accounts', 'Production', 'Sales', 'Marketing', 'Logistics'],
        data: [18, 20, 24, 15, 13, 10]
      }
    },
    {
      id: 2,
      text: "The bar graph shows monthly sales data for a retail store. If the average sales for Q2 (Apr-Jun) increased by 15% compared to Q1 (Jan-Mar), what were the total sales in June?",
      options: [
        { value: 'a', text: '₹82,500' },
        { value: 'b', text: '₹85,000' },
        { value: 'c', text: '₹87,500' },
        { value: 'd', text: '₹90,000' }
      ],
      correctAnswer: 'c',
      explanation: "Let's calculate:\n1. Q1 average = (75000 + 70000 + 80000)/3 = ₹75,000\n2. Q2 average = Q1 average × 1.15 = ₹86,250\n3. Q2 total = ₹86,250 × 3 = ₹258,750\n4. April + May = ₹85,000 + ₹86,250 = ₹171,250\n5. June = ₹258,750 - ₹171,250 = ₹87,500",
      markedForReview: false,
      visited: false,
      type: 'data-interpretation',
      dataset: {
        type: 'bar',
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        data: [75000, 70000, 80000, 85000, 86250]
      }
    },
    {
      id: 3,
      text: "The line graph shows the temperature variation over a week. What is the average rate of increase in temperature per day from Monday to Wednesday?",
      options: [
        { value: 'a', text: '2.5°C' },
        { value: 'b', text: '3.0°C' },
        { value: 'c', text: '3.5°C' },
        { value: 'd', text: '4.0°C' }
      ],
      correctAnswer: 'b',
      explanation: "To find the average rate:\n1. Monday temperature: 22°C\n2. Wednesday temperature: 28°C\n3. Total increase = 28 - 22 = 6°C\n4. Number of intervals = 2 days\n5. Average rate = 6°C ÷ 2 = 3°C per day",
      markedForReview: false,
      visited: false,
      type: 'data-interpretation',
      dataset: {
        type: 'line',
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [22, 25, 28, 27, 26, 29, 30]
      }
    },
    {
      id: 30,
      text: "Based on the pie chart showing market share distribution, if Company A's revenue is ₹50 crores and represents 25% of the total market, what is the combined revenue of companies C and D?",
      options: [
        { value: 'a', text: '₹65 crores' },
        { value: 'b', text: '₹70 crores' },
        { value: 'c', text: '₹75 crores' },
        { value: 'd', text: '₹80 crores' }
      ],
      correctAnswer: 'c',
      explanation: "Let's solve step by step:\n1. If ₹50 crores is 25%, total market = ₹200 crores\n2. Company C (20%) = ₹40 crores\n3. Company D (17.5%) = ₹35 crores\n4. Combined revenue = ₹75 crores",
      markedForReview: false,
      visited: false,
      type: 'data-interpretation',
      dataset: {
        type: 'pie',
        labels: ['Company A', 'Company B', 'Company C', 'Company D', 'Others'],
        data: [25, 27.5, 20, 17.5, 10]
      }
    }
  ];

  for (let i = 4; i <= 29; i++) {
    questions.push({
      id: i,
      text: `Question ${i} text...`,
      options: [
        { value: 'a', text: 'Option A' },
        { value: 'b', text: 'Option B' },
        { value: 'c', text: 'Option C' },
        { value: 'd', text: 'Option D' }
      ],
      correctAnswer: 'a',
      markedForReview: false,
      visited: false,
      type: 'mcq'
    });
  }

  return questions;
};

const generateReasoningQuestions = (): Question[] => {
  return Array(30).fill(null).map((_, index) => ({
    id: index + 1,
    text: `Reasoning question ${index + 1}: Analyze the given pattern and identify the missing element.`,
    options: [
      { value: 'a', text: 'Option A - First logical choice' },
      { value: 'b', text: 'Option B - Second logical choice' },
      { value: 'c', text: 'Option C - Third logical choice' },
      { value: 'd', text: 'Option D - Fourth logical choice' },
    ],
    correctAnswer: 'b',
    markedForReview: false,
    visited: false,
    type: 'mcq',
  }));
};

const generateEnglishQuestions = (): Question[] => {
  return Array(30).fill(null).map((_, index) => ({
    id: index + 1,
    text: `English question ${index + 1}: Choose the most appropriate word to fill in the blank in the following sentence.`,
    options: [
      { value: 'a', text: 'Word A' },
      { value: 'b', text: 'Word B' },
      { value: 'c', text: 'Word C' },
      { value: 'd', text: 'Word D' },
    ],
    correctAnswer: 'c',
    markedForReview: false,
    visited: false,
    type: 'mcq',
  }));
};

const generateGeneralAwarenessQuestions = (): Question[] => {
  return Array(30).fill(null).map((_, index) => ({
    id: index + 1,
    text: `General Awareness question ${index + 1}: Which of the following statements is correct about the recent economic policy?`,
    options: [
      { value: 'a', text: 'Statement A about economic policy' },
      { value: 'b', text: 'Statement B about economic policy' },
      { value: 'c', text: 'Statement C about economic policy' },
      { value: 'd', text: 'Statement D about economic policy' },
    ],
    correctAnswer: 'd',
    markedForReview: false,
    visited: false,
    type: 'mcq',
  }));
};

const generateComputerKnowledgeQuestions = (): Question[] => {
  return Array(30).fill(null).map((_, index) => ({
    id: index + 1,
    text: `Computer Knowledge question ${index + 1}: What is the primary function of the following component in a computer system?`,
    options: [
      { value: 'a', text: 'Function A of the component' },
      { value: 'b', text: 'Function B of the component' },
      { value: 'c', text: 'Function C of the component' },
      { value: 'd', text: 'Function D of the component' },
    ],
    correctAnswer: 'a',
    markedForReview: false,
    visited: false,
    type: 'mcq',
  }));
};

const examSections: Section[] = [
  {
    id: 'quantitative-aptitude',
    name: 'Quantitative Aptitude',
    questions: generateQuantitativeQuestions(),
  },
  {
    id: 'reasoning',
    name: 'Reasoning',
    questions: generateReasoningQuestions(),
  },
  {
    id: 'english',
    name: 'English Language',
    questions: generateEnglishQuestions(),
  },
  {
    id: 'general-awareness',
    name: 'General Awareness',
    questions: generateGeneralAwarenessQuestions(),
  },
  {
    id: 'computer-knowledge',
    name: 'Computer Knowledge',
    questions: generateComputerKnowledgeQuestions(),
  }
];

export const useExamStore = create<ExamStore>((set, get) => ({
  sections: examSections,
  currentSectionIndex: 0,
  currentQuestionId: 1,
  examStartTime: Date.now(),
  showSummary: false,
  showSolutions: false,

  currentSection: examSections[0],
  questions: examSections[0].questions,

  setCurrentQuestion: (id) => {
    set((state) => ({
      currentQuestionId: id,
      sections: state.sections.map((section, idx) => 
        idx === state.currentSectionIndex
          ? {
              ...section,
              questions: section.questions.map((q) =>
                q.id === id ? { ...q, visited: true } : q
              ),
            }
          : section
      ),
    }));
  },

  setAnswer: (questionId, answer) =>
    set((state) => ({
      sections: state.sections.map((section, idx) =>
        idx === state.currentSectionIndex
          ? {
              ...section,
              questions: section.questions.map((q) =>
                q.id === questionId ? { ...q, selectedAnswer: answer } : q
              ),
            }
          : section
      ),
    })),

  markForReview: (questionId) =>
    set((state) => ({
      sections: state.sections.map((section, idx) =>
        idx === state.currentSectionIndex
          ? {
              ...section,
              questions: section.questions.map((q) =>
                q.id === questionId ? { ...q, markedForReview: !q.markedForReview } : q
              ),
            }
          : section
      ),
    })),

  clearResponse: (questionId) =>
    set((state) => ({
      sections: state.sections.map((section, idx) =>
        idx === state.currentSectionIndex
          ? {
              ...section,
              questions: section.questions.map((q) =>
                q.id === questionId ? { ...q, selectedAnswer: undefined } : q
              ),
            }
          : section
      ),
    })),

  saveAndNext: () => {
    const { currentQuestionId, questions } = get();
    if (currentQuestionId < questions.length) {
      set({ currentQuestionId: currentQuestionId + 1 });
    }
  },

  moveToNextSection: () => {
    const { currentSectionIndex, sections } = get();
    if (currentSectionIndex < sections.length - 1) {
      const nextIndex = currentSectionIndex + 1;
      set({
        currentSectionIndex: nextIndex,
        currentQuestionId: 1,
        currentSection: sections[nextIndex],
        questions: sections[nextIndex].questions,
      });
    }
  },

  setCurrentSectionIndex: (index) => {
    const { sections } = get();
    if (index >= 0 && index < sections.length) {
      set({
        currentSectionIndex: index,
        currentQuestionId: 1,
        currentSection: sections[index],
        questions: sections[index].questions,
      });
    }
  },

  submitExam: () => {
    const currentTime = Date.now();
    set((state) => ({
      showSummary: true,
      sections: state.sections.map((section) => ({
        ...section,
        timeSpent: Math.floor((currentTime - state.examStartTime) / state.sections.length),
      })),
    }));
  },

  returnToTest: () => {
    set({ showSummary: false });
  },

  viewSolutions: () => {
    set({ showSolutions: true, showSummary: false });
  },

  returnToSummary: () => {
    set({ showSolutions: false, showSummary: true });
  },

  get currentQuestion() {
    const { questions, currentQuestionId } = get();
    return questions.find(q => q.id === currentQuestionId);
  },
}));