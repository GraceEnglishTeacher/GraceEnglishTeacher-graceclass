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

export interface AnalysisVocabulary {
  word: string;
  pos: string; // e.g. '명', '동', '형', '부', '전', '연결어'
  meaning: string;
}

export interface AnalysisGrammar {
  phrase: string;
  explanation: string;
}

export interface AnalysisSentence {
  english: string;
  korean: string;
  vocabulary: AnalysisVocabulary[];
  grammar: AnalysisGrammar[];
  highlights?: string[]; // words to highlight like verbs
  underlines?: string[];  // words to underline like keywords
  connectors?: string[];  // connectors to circle/badge like 'so', 'but'
}

export interface ReadingTopic {
  id: string;
  title: string;
  english: string;
  korean: string;
  exercises: QuizQuestion[];
  analysis?: AnalysisSentence[];
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
  reading: ReadingTopic[];
  grammar: (GrammarPoint & { exercises: QuizQuestion[] })[];
  vocabularyQuiz: QuizQuestion[];
}
