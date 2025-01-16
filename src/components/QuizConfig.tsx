import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { QuestionSet } from '../types';

interface QuizConfigProps {
  questionSets: QuestionSet[];
  onStartQuiz: (setId: string, questionCount: number) => void;
}

export default function QuizConfig({ questionSets, onStartQuiz }: QuizConfigProps) {
  const [selectedSet, setSelectedSet] = useState('');
  const [questionCount, setQuestionCount] = useState(10);

  const selectedQuestionSet = questionSets.find(set => set.id === selectedSet);
  const maxQuestions = selectedQuestionSet?.questions.length || 0;

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Configure Quiz</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Question Set
        </label>
        <select
          className="w-full p-2 border rounded-md"
          value={selectedSet}
          onChange={(e) => setSelectedSet(e.target.value)}
        >
          <option value="">Select a question set</option>
          {questionSets.map(set => (
            <option key={set.id} value={set.id}>
              {set.name} ({set.questions.length} questions)
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Number of Questions
        </label>
        <input
          type="number"
          min="1"
          max={maxQuestions}
          value={questionCount}
          onChange={(e) => setQuestionCount(Math.min(maxQuestions, Math.max(1, parseInt(e.target.value))))}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <button
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
        disabled={!selectedSet}
        onClick={() => onStartQuiz(selectedSet, questionCount)}
      >
        <Play className="w-4 h-4" />
        Start Quiz
      </button>
    </div>
  );
}