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
  vocabulary: VocabularyItem[];
  listening: {
    functions: {
      title: string;
      description: string;
      details: {
        label: string;
        content: string;
      }[];
      examples: {
        speaker: string;
        text: string;
      }[];
    }[];
    english: string;
    korean: string;
    dialogs: {
      title: string;
      english: string;
      korean: string;
      exercises: QuizQuestion[];
    }[];
  };
  reading: {
    english: string;
    korean: string;
  };
  grammar: (GrammarPoint & { exercises: QuizQuestion[] })[];
  vocabularyQuiz: QuizQuestion[];
}
