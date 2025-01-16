import React from 'react';
import { BarChart, Clock, CheckCircle, XCircle } from 'lucide-react';
import { QuizAttempt, QuestionStats } from '../types';

interface DashboardProps {
  attempts: QuizAttempt[];
  stats: QuestionStats[];
}

export default function Dashboard({ attempts, stats }: DashboardProps) {
  const totalAttempts = attempts.length;
  const averageScore = attempts.reduce((acc, curr) => 
    acc + (curr.score / curr.totalQuestions) * 100, 0) / totalAttempts || 0;
  
  const totalQuestions = stats.reduce((acc, curr) => acc + curr.attempts, 0);
  const averageSuccessRate = stats.reduce((acc, curr) => 
    acc + curr.successRate, 0) / stats.length || 0;

  const totalTimeSpent = attempts.reduce((acc, curr) => acc + curr.timeSpent, 0);
  const timeSpentHours = Math.floor(totalTimeSpent / (1000 * 60 * 60));
  const timeSpentMinutes = Math.floor((totalTimeSpent % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Progress Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <BarChart className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold">Average Score</h3>
          </div>
          <p className="text-2xl font-bold">{averageScore.toFixed(1)}%</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">Total Questions</h3>
          </div>
          <p className="text-2xl font-bold">{totalQuestions}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold">Success Rate</h3>
          </div>
          <p className="text-2xl font-bold">{averageSuccessRate.toFixed(1)}%</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold">Time Spent</h3>
          </div>
          <p className="text-2xl font-bold">
            {timeSpentHours}h {timeSpentMinutes}m
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-semibold mb-4">Recent Attempts</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Score</th>
                <th className="text-left py-2">Questions</th>
                <th className="text-left py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {attempts.slice(-5).reverse().map((attempt, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">
                    {new Date(attempt.date).toLocaleDateString()}
                  </td>
                  <td className="py-2">
                    {((attempt.score / attempt.totalQuestions) * 100).toFixed(1)}%
                  </td>
                  <td className="py-2">
                    {attempt.score}/{attempt.totalQuestions}
                  </td>
                  <td className="py-2">
                    {Math.floor(attempt.timeSpent / 60000)}m
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}