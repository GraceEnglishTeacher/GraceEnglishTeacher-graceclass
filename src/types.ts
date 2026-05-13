export interface VocabularyItem {
  word: string;
  meaning: string;
  example?: string;
}

export interface GrammarPoint {
  title: string;
  explanation: string;
  examples: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options?: string[];
  answer: string | number; // index for multiple choice or string for short answer
  type: 'multiple-choice' | 'short-answer';
}

export interface WorksheetData {
  title: string;
  unit: string;
  mainText: {
    english: string;
    korean: string;
  };
  vocabulary: VocabularyItem[];
  grammar: GrammarPoint[];
  quiz: QuizQuestion[];
}
