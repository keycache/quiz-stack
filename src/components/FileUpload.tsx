import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { QuestionSet } from '../types';
import { saveQuestionSet } from '../utils/storage';

export default function FileUpload() {
  const validateQuestionSet = (data: any): data is QuestionSet => {
    return (
      data &&
      typeof data.id === 'string' &&
      typeof data.name === 'string' &&
      Array.isArray(data.questions) &&
      data.questions.every((q: any) =>
        q.id &&
        typeof q.text === 'string' &&
        Array.isArray(q.options) &&
        typeof q.correctAnswer === 'string' &&
        typeof q.explanation === 'string'
      )
    );
  };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (validateQuestionSet(data)) {
          saveQuestionSet(data);
          alert('Question set uploaded successfully!');
        } else {
          alert('Invalid question set format');
        }
      } catch (error) {
        alert('Error parsing JSON file');
      }
    };
    reader.readAsText(file);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">JSON files only</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".json"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
}