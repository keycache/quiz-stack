import React, { useState } from 'react';
import { Brain, Menu, X, Sun, Moon } from 'lucide-react';
import FileUpload from './components/FileUpload';
import QuizConfig from './components/QuizConfig';
import Quiz from './components/Quiz';
import Dashboard from './components/Dashboard';
import { getAllQuestionSets, getAllQuizAttempts, getAllQuestionStats } from './utils/storage';
import { useTheme } from './context/ThemeContext';

type View = 'upload' | 'config' | 'quiz' | 'dashboard';

function App() {
  const [view, setView] = useState<View>('upload');
  const [selectedSetId, setSelectedSetId] = useState<string>('');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">QuizStack</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Theme toggle button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Desktop navigation */}
              <nav className="hidden lg:block">
                <div className="flex gap-4">
                  <button
                    onClick={() => setView('upload')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      view === 'upload' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    Upload
                  </button>
                  <button
                    onClick={() => setView('config')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      view === 'config'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    Start Quiz
                  </button>
                  <button
                    onClick={() => setView('dashboard')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      view === 'dashboard'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    Dashboard
                  </button>
                </div>
              </nav>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-700 mt-2">
              <button
                onClick={() => {
                  setView('upload');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  view === 'upload'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Upload
              </button>
              <button
                onClick={() => {
                  setView('config');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  view === 'config'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Start Quiz
              </button>
              <button
                onClick={() => {
                  setView('dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  view === 'dashboard'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Dashboard
              </button>
            </div>
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
            questionSets={questionSets}
          />
        )}
      </main>
    </div>
  );
}

export default App;