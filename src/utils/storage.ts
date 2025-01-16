import { QuizAttempt, QuestionSet, QuestionStats } from '../types';

export const saveQuestionSet = (questionSet: QuestionSet) => {
  const sets = getAllQuestionSets();
  sets.push(questionSet);
  localStorage.setItem('questionSets', JSON.stringify(sets));
};

export const getAllQuestionSets = (): QuestionSet[] => {
  const sets = localStorage.getItem('questionSets');
  return sets ? JSON.parse(sets) : [];
};

export const saveQuestionStats = (stats: QuestionStats) => {
  const allStats = getAllQuestionStats();
  const index = allStats.findIndex(s => s.id === stats.id);
  
  if (index >= 0) {
    allStats[index] = stats;
  } else {
    allStats.push(stats);
  }
  
  localStorage.setItem('questionStats', JSON.stringify(allStats));
};

export const getAllQuestionStats = (): QuestionStats[] => {
  const stats = localStorage.getItem('questionStats');
  return stats ? JSON.parse(stats) : [];
};

export const saveQuizAttempt = (attempt: QuizAttempt) => {
  const attempts = getAllQuizAttempts();
  attempts.push(attempt);
  localStorage.setItem('quizAttempts', JSON.stringify(attempts));
};

export const getAllQuizAttempts = (): QuizAttempt[] => {
  const attempts = localStorage.getItem('quizAttempts');
  return attempts ? JSON.parse(attempts) : [];
};