import React, { useState, useEffect } from 'react';
import { ChevronRight, AlertCircle, Eye } from 'lucide-react';
import { QuizQuestion, QuizState, QuestionStats } from '../types';
import { saveQuestionStats, saveQuizAttempt } from '../utils/storage';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
  questionSetId: string;
}

export default function Quiz({ questions, onComplete, questionSetId }: QuizProps) {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswer: null,
    hasAnswered: false,
    score: 0,
    startTime: Date.now(),
  });
  const [showOptions, setShowOptions] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const currentQuestion = questions[state.currentQuestionIndex];

  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    if (showOptions && !state.hasAnswered) {
      setShuffledOptions(shuffleArray(currentQuestion.options));
    }
  }, [currentQuestion, showOptions]);

  const handleAnswerSelect = (answer: string) => {
    if (state.hasAnswered) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    setState(prev => ({
      ...prev,
      selectedAnswer: answer,
      hasAnswered: true,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));

    // Update question stats
    const stats: QuestionStats = {
      id: currentQuestion.id,
      attempts: 1,
      correct: isCorrect ? 1 : 0,
      incorrect: isCorrect ? 0 : 1,
      successRate: isCorrect ? 100 : 0,
    };
    saveQuestionStats(stats);
  };

  const handleNext = () => {
    if (state.currentQuestionIndex === questions.length - 1) {
      const timeSpent = Date.now() - state.startTime;
      saveQuizAttempt({
        date: new Date().toISOString(),
        questionSetId,
        score: state.score,
        totalQuestions: questions.length,
        timeSpent,
      });
      onComplete();
    } else {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        hasAnswered: false,
      }));
      setShowOptions(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Question {state.currentQuestionIndex + 1} of {questions.length}
        </span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Score: {state.score}
          </span>
          {!showOptions && !state.hasAnswered && (
            <button
              onClick={() => setShowOptions(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Show Options
            </button>
          )}
          {state.hasAnswered && (
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
              {state.currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">{currentQuestion.text}</h2>
        {showOptions && (
          <div className="space-y-2">
            {shuffledOptions.map((option, index) => (
              <button
                key={index}
                className={`w-full p-4 text-left rounded-md border ${
                  state.hasAnswered
                    ? option === currentQuestion.correctAnswer
                      ? 'bg-green-100 border-green-500'
                      : option === state.selectedAnswer
                      ? 'bg-red-100 border-red-500'
                      : 'border-gray-200'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleAnswerSelect(option)}
                disabled={state.hasAnswered}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {state.hasAnswered && currentQuestion.explanation && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-700">{currentQuestion.explanation}</p>
        </div>
      )}
    </div>
  );
}