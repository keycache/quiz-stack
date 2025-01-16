import React, { useState, useMemo } from 'react';
import { BarChart, Clock, CheckCircle, XCircle, Filter } from 'lucide-react';
import { QuizAttempt, QuestionStats, QuestionSet } from '../types';

interface DashboardProps {
  attempts?: QuizAttempt[];
  stats?: QuestionStats[];
  questionSets?: QuestionSet[];
}

export default function Dashboard({ attempts = [], stats = [], questionSets = [] }: DashboardProps) {
  const [selectedSetId, setSelectedSetId] = useState<string>('');

  const filteredAttempts = useMemo(() => {
    if (!selectedSetId) return attempts;
    return attempts.filter(attempt => attempt.questionSetId === selectedSetId);
  }, [attempts, selectedSetId]);

  const filteredStats = useMemo(() => {
    if (!selectedSetId) return stats;
    return stats.filter(stat => stat.questionSetId === selectedSetId);
  }, [stats, selectedSetId]);

  const totalAttempts = filteredAttempts.length;
  const averageScore = totalAttempts > 0 
    ? filteredAttempts.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions) * 100, 0) / totalAttempts 
    : 0;
  
  const totalQuestions = filteredStats.reduce((acc, curr) => acc + curr.attempts, 0);
  const averageSuccessRate = filteredStats.length > 0
    ? filteredStats.reduce((acc, curr) => acc + curr.successRate, 0) / filteredStats.length
    : 0;

  const totalTimeSpent = filteredAttempts.reduce((acc, curr) => acc + curr.timeSpent, 0);
  const timeSpentHours = Math.floor(totalTimeSpent / (1000 * 60 * 60));
  const timeSpentMinutes = Math.floor((totalTimeSpent % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Progress Dashboard</h2>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <select
            value={selectedSetId}
            onChange={(e) => setSelectedSetId(e.target.value)}
            className="p-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
          >
            <option value="">All Question Sets</option>
            {questionSets.map(set => (
              <option key={set.id} value={set.id}>{set.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
          <div className="flex items-center gap-2 mb-2">
            <BarChart className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Average Score</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{averageScore.toFixed(1)}%</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Total Questions</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalQuestions}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Success Rate</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{averageSuccessRate.toFixed(1)}%</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-purple-500 dark:text-purple-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Time Spent</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {timeSpentHours}h {timeSpentMinutes}m
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Recent Attempts</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-2 text-gray-900 dark:text-white">Date</th>
                <th className="text-left py-2 text-gray-900 dark:text-white">Question Set</th>
                <th className="text-left py-2 text-gray-900 dark:text-white">Score</th>
                <th className="text-left py-2 text-gray-900 dark:text-white">Questions</th>
                <th className="text-left py-2 text-gray-900 dark:text-white">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttempts.slice(-5).reverse().map((attempt, index) => {
                const questionSet = questionSets.find(set => set.id === attempt.questionSetId);
                return (
                  <tr key={index} className="border-b dark:border-gray-700">
                    <td className="py-2 text-gray-900 dark:text-white">
                      {new Date(attempt.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 text-gray-900 dark:text-white">
                      {questionSet?.name || 'Unknown Set'}
                    </td>
                    <td className="py-2 text-gray-900 dark:text-white">
                      {((attempt.score / attempt.totalQuestions) * 100).toFixed(1)}%
                    </td>
                    <td className="py-2 text-gray-900 dark:text-white">
                      {attempt.score}/{attempt.totalQuestions}
                    </td>
                    <td className="py-2 text-gray-900 dark:text-white">
                      {Math.floor(attempt.timeSpent / 60000)}m
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}