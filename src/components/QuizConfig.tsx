import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { QuestionSet } from '../types';
import { useTheme } from '../context/ThemeContext';

interface QuizConfigProps {
  questionSets: QuestionSet[];
  onStartQuiz: (setId: string, questionCount: number) => void;
}

export default function QuizConfig({ questionSets, onStartQuiz }: QuizConfigProps) {
  const [selectedSet, setSelectedSet] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const { theme } = useTheme();

  const selectedQuestionSet = questionSets.find(set => set.id === selectedSet);
  const maxQuestions = selectedQuestionSet?.questions.length || 0;

  const selectStyle = {
    backgroundColor: theme === 'dark' ? '#374151' : 'white',
    '--tw-bg-opacity': '1',
    color: theme === 'dark' ? 'white' : '#111827',
  } as React.CSSProperties;

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Configure Quiz</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Question Set
        </label>
        <select
          style={selectStyle}
          className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
          value={selectedSet}
          onChange={(e) => setSelectedSet(e.target.value)}
        >
          <option value="" style={selectStyle}>Select a question set</option>
          {questionSets.map(set => (
            <option key={set.id} value={set.id} style={selectStyle}>
              {set.name} ({set.questions.length} questions)
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Number of Questions
        </label>
        <input
          type="number"
          min="1"
          max={maxQuestions}
          value={questionCount}
          onChange={(e) => setQuestionCount(Math.min(maxQuestions, Math.max(1, parseInt(e.target.value))))}
          style={selectStyle}
          className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
        />
      </div>

      <button
        className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors duration-200"
        disabled={!selectedSet}
        onClick={() => onStartQuiz(selectedSet, questionCount)}
      >
        <Play className="w-4 h-4" />
        Start Quiz
      </button>
    </div>
  );
}