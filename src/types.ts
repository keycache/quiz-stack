export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuestionSet {
  id: string;
  name: string;
  questions: QuizQuestion[];
}

export interface QuestionStats {
  id: string;
  attempts: number;
  correct: number;
  incorrect: number;
  successRate: number;
}

export interface QuizAttempt {
  date: string;
  questionSetId: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  hasAnswered: boolean;
  score: number;
  startTime: number;
}