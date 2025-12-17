import React from 'react';
import { Priority, Category } from '../types';

interface BadgeProps {
  type: 'priority' | 'category' | 'confidence';
  value: string | number;
}

export const Badge: React.FC<BadgeProps> = ({ type, value }) => {
  if (type === 'priority') {
    const v = value as Priority;
    let styles = "bg-gray-100 text-gray-600";
    
    if (v === 'Urgent') styles = "bg-red-100 text-red-700 border border-red-200";
    if (v === 'High') styles = "bg-orange-50 text-orange-700 border border-orange-100";
    if (v === 'Medium') styles = "bg-blue-50 text-blue-700 border border-blue-100";
    if (v === 'Low') styles = "bg-gray-50 text-gray-600 border border-gray-100";

    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles}`}>
        {v}
      </span>
    );
  }

  if (type === 'category') {
    const v = value as Category;
    const styles = "bg-gray-100 text-gray-700 border border-gray-200";
    return (
      <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${styles}`}>
        {v}
      </span>
    );
  }

  if (type === 'confidence') {
    const v = (value as number) * 100;
    let colorClass = "text-green-600";
    if (v < 70) colorClass = "text-yellow-600";
    if (v < 50) colorClass = "text-red-600";

    return (
      <span className={`text-xs font-semibold ${colorClass}`} title="AI Confidence Score">
        {v.toFixed(0)}% AI
      </span>
    );
  }

  return null;
};