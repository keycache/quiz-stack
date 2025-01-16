import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import FileUpload from './components/FileUpload';
import QuizConfig from './components/QuizConfig';
import Quiz from './components/Quiz';
import Dashboard from './components/Dashboard';
import { getAllQuestionSets, getAllQuizAttempts, getAllQuestionStats } from './utils/storage';

type View = 'upload' | 'config' | 'quiz' | 'dashboard';

function App() {
  const [view, setView] = useState<View>('upload');
  const [selectedSetId, setSelectedSetId] = useState<string>('');
  const [questionCount, setQuestionCount] = useState<number>(10);

  const questionSets = getAllQuestionSets();
  const attempts = getAllQuizAttempts();
  const stats = getAllQuestionStats();

  const handleStartQuiz = (setId: string, count: number) => {
    setSelectedSetId(setId);
    setQuestionCount(count);
    setView('quiz');
  };

  const selectedSet = questionSets.find(set => set.id === selectedSetId);
  const quizQuestions = selectedSet
    ? [...selectedSet.questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, questionCount)
    : [];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">QuizStack</h1>
            </div>
            <nav className="flex gap-4">
              <button
                onClick={() => setView('upload')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  view === 'upload' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Upload
              </button>
              <button
                onClick={() => setView('config')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  view === 'config' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Start Quiz
              </button>
              <button
                onClick={() => setView('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  view === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Dashboard
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'upload' && <FileUpload />}
        {view === 'config' && (
          <QuizConfig
            questionSets={questionSets}
            onStartQuiz={handleStartQuiz}
          />
        )}
        {view === 'quiz' && selectedSet && (
          <Quiz
            questions={quizQuestions}
            onComplete={() => setView('dashboard')}
            questionSetId={selectedSetId}
          />
        )}
        {view === 'dashboard' && (
          <Dashboard
            attempts={attempts}
            stats={stats}
          />
        )}
      </main>
    </div>
  );
}

export default App;